// ── Provider-agnostic AI mentor ────────────────────────────
// One interface, swappable backends. Default = Google Gemini (free tier).
// If no key is configured, we fall back to friendly canned guidance so the
// app is fully usable out of the box.

export interface MentorMessage {
  role: "user" | "assistant";
  content: string;
}

export interface MentorContext {
  topicTitle: string;
  stageTitle: string;
  objective: string;
  childExplanation?: string;
  aiContext?: string;
  completedLessons: string[];
}

export function buildSystemPrompt(ctx: MentorContext): string {
  return `You are "Quest", a warm, playful Jetpack Compose tutor on a learning platform called Compose Quest.

YOUR STUDENT IS A COMPLETE BEGINNER. Always assume zero prior knowledge.

TONE & RULES:
- Explain things so clearly a 10-year-old could understand the core idea.
- Use friendly analogies and everyday metaphors (toys, LEGO, rooms, boxes, restaurants).
- NEVER sound like technical documentation. Be encouraging and human.
- Keep answers short and focused (2-5 short paragraphs max). Use simple words.
- When showing code, keep it minimal and explain every new piece.
- If the learner is stuck or wrong, be kind and rebuild their confidence.
- Use occasional emojis to feel friendly, but don't overdo it.

CURRENT LESSON CONTEXT (you already know all of this — don't ask the student to repeat it):
- Stage: ${ctx.stageTitle}
- Lesson: ${ctx.topicTitle}
- Learning objective: ${ctx.objective}
${ctx.childExplanation ? `- The "explain like I'm 10" version we already showed: ${ctx.childExplanation}` : ""}
${ctx.aiContext ? `- Teaching notes: ${ctx.aiContext}` : ""}
- Lessons the student has already completed: ${ctx.completedLessons.length ? ctx.completedLessons.join(", ") : "none yet (very new!)"}

Answer the student's question in that spirit.`;
}

type ChatArgs = { system: string; messages: MentorMessage[] };

async function callGemini({ system, messages }: ChatArgs): Promise<string> {
  const key = process.env.GEMINI_API_KEY!;
  const model = process.env.GEMINI_MODEL || "gemini-2.0-flash";
  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents,
        generationConfig: { temperature: 0.7, maxOutputTokens: 800 },
      }),
    }
  );
  const data = await res.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? fallbackReply(messages);
}

async function callOpenAICompatible(
  { system, messages }: ChatArgs,
  opts: { url: string; key: string; model: string }
): Promise<string> {
  const res = await fetch(opts.url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${opts.key}` },
    body: JSON.stringify({
      model: opts.model,
      temperature: 0.7,
      max_tokens: 800,
      messages: [{ role: "system", content: system }, ...messages],
    }),
  });
  const data = await res.json();
  return data?.choices?.[0]?.message?.content ?? fallbackReply(messages);
}

async function callAnthropic({ system, messages }: ChatArgs): Promise<string> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY!,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL || "claude-haiku-4-5-20251001",
      max_tokens: 800,
      system,
      messages,
    }),
  });
  const data = await res.json();
  return data?.content?.[0]?.text ?? fallbackReply(messages);
}

/** Friendly offline guidance when no provider key is set. */
export function fallbackReply(messages: MentorMessage[]): string {
  const last = messages[messages.length - 1]?.content.toLowerCase() ?? "";
  if (last.includes("10") || last.includes("simple") || last.includes("child")) {
    return "Think of it like a magic drawing board 🪄 — you tell it *what* you want to see, and it draws it for you. When something changes, it fixes only that part automatically. That's the heart of Compose!\n\n_(Tip: add a free Gemini API key in `.env` to unlock the full AI mentor.)_";
  }
  if (last.includes("example") || last.includes("real")) {
    return "A real-world example: a restaurant 🍽️. You (the code) tell the waiter what you want; the kitchen makes it appear. You never cook it yourself — you just describe the result. Compose works the same way: you describe the screen, Compose builds it.\n\n_(Add a free Gemini API key in `.env` for personalized answers.)_";
  }
  return "Great question! 🌟 I'm your Compose tutor. Once a free Gemini API key is added in `.env`, I can answer anything about this exact lesson — explain it simply, give analogies, or help fix your code. For now: try the Playground below and tweak the example to see what happens!";
}

export async function chat(args: ChatArgs): Promise<string> {
  const provider = (process.env.AI_PROVIDER || "gemini").toLowerCase();
  try {
    if (provider === "gemini" && process.env.GEMINI_API_KEY) return await callGemini(args);
    if (provider === "groq" && process.env.GROQ_API_KEY)
      return await callOpenAICompatible(args, {
        url: "https://api.groq.com/openai/v1/chat/completions",
        key: process.env.GROQ_API_KEY,
        model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
      });
    if (provider === "openai" && process.env.OPENAI_API_KEY)
      return await callOpenAICompatible(args, {
        url: "https://api.openai.com/v1/chat/completions",
        key: process.env.OPENAI_API_KEY,
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      });
    if (provider === "anthropic" && process.env.ANTHROPIC_API_KEY) return await callAnthropic(args);
  } catch (e) {
    console.error("AI provider error:", e);
  }
  return fallbackReply(args.messages);
}
