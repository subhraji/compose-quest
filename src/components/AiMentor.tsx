"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, GraduationCap } from "lucide-react";
import type { MentorContext, MentorMessage } from "@/lib/ai";

const QUICK_PROMPTS = [
  "Explain this simply",
  "Explain like I'm 10",
  "Give a real-world example",
  "Why do we need this?",
  "Show a visual analogy",
  "Give me practice questions",
];

interface AiMentorProps {
  context: MentorContext;
  /** external trigger, e.g. "help me fix this code: ..." from the playground */
  injected?: string;
  onConsumed?: () => void;
}

export function AiMentor({ context, injected, onConsumed }: AiMentorProps) {
  const [messages, setMessages] = useState<MentorMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    const userMsg: MentorMessage = { role: "user", content: trimmed };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ context, messages: history }),
      });
      const data = await res.json();
      setMessages([...history, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages([
        ...history,
        { role: "assistant", content: "I had a little hiccup — try again in a moment! 🙂" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (injected) {
      send(injected);
      onConsumed?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [injected]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="card flex h-[560px] flex-col overflow-hidden">
      {/* header */}
      <div className="flex items-center gap-3 border-b border-black/[0.06] px-4 py-3 dark:border-white/[0.08]">
        <span
          className="grid h-9 w-9 place-items-center rounded-xl text-white shadow-lg shadow-violet-500/30"
          style={{ backgroundImage: "var(--brand)" }}
        >
          <GraduationCap className="h-5 w-5" strokeWidth={1.5} />
        </span>
        <div>
          <p className="font-display font-semibold leading-tight">Quest · your AI tutor</p>
          <p className="text-xs text-ink/45 dark:text-cloud/45">Knows you're on “{context.topicTitle}”</p>
        </div>
      </div>

      {/* messages */}
      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.length === 0 && (
          <div className="rounded-xl bg-black/[0.03] p-4 text-sm text-ink/75 dark:bg-white/[0.04] dark:text-cloud/75">
            👋 Hi! I'm <b>Quest</b>. I already know you're learning <b>{context.topicTitle}</b>. Ask me
            anything — or tap a question below to start.
          </div>
        )}
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "text-white shadow-md shadow-violet-500/20"
                    : "bg-black/[0.03] text-ink/85 border border-black/[0.06] dark:bg-white/[0.04] dark:text-cloud/85 dark:border-white/[0.08]"
                }`}
                style={m.role === "user" ? { backgroundImage: "var(--brand)" } : undefined}
              >
                {m.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {loading && (
          <div className="flex justify-start">
            <div className="flex gap-1 rounded-2xl border border-black/[0.06] bg-black/[0.03] px-4 py-3 dark:border-white/[0.08] dark:bg-white/[0.04]">
              {[0, 1, 2].map((d) => (
                <motion.span
                  key={d}
                  className="h-2 w-2 rounded-full bg-ink/40 dark:bg-cloud/40"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8, delay: d * 0.15 }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* quick prompts */}
      <div className="flex flex-wrap gap-1.5 border-t border-black/[0.06] px-3 py-2 dark:border-white/[0.08]">
        {QUICK_PROMPTS.map((p) => (
          <button
            key={p}
            onClick={() => send(p)}
            disabled={loading}
            className="chip border border-black/[0.06] text-ink/60 transition-colors hover:bg-black/[0.04] disabled:opacity-50 dark:border-white/[0.08] dark:text-cloud/60 dark:hover:bg-white/[0.06]"
          >
            <Sparkles className="h-3 w-3" strokeWidth={1.5} /> {p}
          </button>
        ))}
      </div>

      {/* input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex items-center gap-2 border-t border-black/[0.06] p-3 dark:border-white/[0.08]"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Quest anything about this lesson…"
          className="flex-1 rounded-xl border border-black/10 bg-transparent px-4 py-2.5 text-sm outline-none transition-colors focus:border-ink/30 dark:border-white/15 dark:focus:border-white/30"
        />
        <button type="submit" disabled={loading} className="btn-primary h-11 w-11 p-0">
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
