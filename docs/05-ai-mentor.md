# The AI Mentor — "Quest"

## Concept

Every lesson ships with **Quest**, a warm, playful AI tutor that behaves like a patient friend who happens to know Compose — *not* a documentation bot. Quest is always present (right sidebar on desktop) and **already knows the context**, so the learner never has to explain where they are.

## What Quest automatically knows (context injection)

On every lesson, the client builds a `MentorContext` and sends it with each message:

```ts
{
  topicTitle:        "remember & mutableStateOf",
  stageTitle:        "State Management",
  objective:         "Store changing values so the UI updates…",
  childExplanation:  "Imagine a little memory box 📦 …",
  aiContext:         "<hidden teaching notes for this exact lesson>",
  completedLessons:  ["What is Jetpack Compose?", "Column", …]
}
```

This becomes a **system prompt** (`buildSystemPrompt` in `src/lib/ai.ts`) that locks Quest's persona and feeds it the lesson's teaching notes and the learner's history — so answers are tailored without the learner ever repeating themselves.

## Persona & rules (the system prompt enforces)

- Assume a **complete beginner**; never assume prior knowledge.
- Explain so **a 10-year-old** could grasp the core idea.
- Lean on **everyday analogies** (toys, LEGO, rooms, boxes, restaurants).
- **Never sound like docs.** Be encouraging and human.
- Keep answers **short and focused** (2–5 short paragraphs).
- When showing code, keep it **minimal** and explain every new piece.
- If the learner is wrong/stuck, **rebuild confidence** kindly.
- A few emojis for warmth — not a parade.

## One-tap prompts

The mentor surfaces quick chips that map directly to the brief's required questions:

`Explain this simply` · `Explain like I'm 10` · `Give a real-world example` · `Why do we need this?` · `Show a visual analogy` · `Give me practice questions`

Plus a **"Fix my code"** handoff: the playground's *Ask AI* button injects the learner's current code into the chat with a help request.

## Conversation UX

- Branded header reminds the learner Quest knows their current topic.
- Animated typing indicator (three bouncing dots) during generation.
- User vs. assistant bubbles; assistant text preserves line breaks.
- Empty state greets the learner by topic and invites a one-tap question.
- Errors degrade to a friendly "little hiccup — try again" message.

## Provider strategy (free by default, zero lock-in)

The mentor is **provider-agnostic** behind a single `chat()` function:

| Provider | Cost | Notes |
|---|---|---|
| **Google Gemini** *(default)* | **Free tier** | `gemini-2.0-flash`; set `GEMINI_API_KEY`. |
| Groq | Free tier | Very fast Llama models; OpenAI-compatible. |
| OpenAI | Paid | `gpt-4o-mini` etc. |
| Anthropic | Paid | Claude models. |

Switch with one env var: `AI_PROVIDER=gemini|groq|openai|anthropic`.

**Graceful offline fallback:** if no key is configured, `fallbackReply()` returns friendly, on-brand canned guidance (e.g. the "magic drawing board" analogy) so the app is **fully usable out of the box** and never shows a broken mentor. The app is built and verified to run with no key set.

## Safety & quality

- The system prompt constrains scope to Compose teaching and a kind tone.
- Teaching notes (`aiContext`) steer the model toward the *intended* metaphors so AI answers reinforce (not contradict) the lesson.
- Short max-token budget keeps answers digestible and costs near-zero.

## Future

- **Streaming** responses for instant feel.
- **Proactive nudges** ("want me to explain recomposition with the LEGO picture?").
- **Quiz generation** on demand tied to the current lesson.
- **Code-aware debugging** that runs the same parser the playground uses to pinpoint issues.
