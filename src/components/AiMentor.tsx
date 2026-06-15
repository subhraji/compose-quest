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
      <div className="flex items-center gap-3 border-b border-quest-50 bg-quest-gradient px-4 py-3 text-white">
        <span className="grid h-9 w-9 place-items-center rounded-2xl bg-white/20">
          <GraduationCap className="h-5 w-5" />
        </span>
        <div>
          <p className="font-display font-bold leading-tight">Quest · your AI tutor</p>
          <p className="text-xs text-white/80">Knows you're on “{context.topicTitle}”</p>
        </div>
      </div>

      {/* messages */}
      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.length === 0 && (
          <div className="rounded-2xl bg-quest-50 p-4 text-sm text-ink/75">
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
                    ? "bg-quest-gradient text-white"
                    : "bg-cloud text-ink/85 border border-quest-50"
                }`}
              >
                {m.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {loading && (
          <div className="flex justify-start">
            <div className="flex gap-1 rounded-2xl border border-quest-50 bg-cloud px-4 py-3">
              {[0, 1, 2].map((d) => (
                <motion.span
                  key={d}
                  className="h-2 w-2 rounded-full bg-quest-400"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8, delay: d * 0.15 }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* quick prompts */}
      <div className="flex flex-wrap gap-1.5 border-t border-quest-50 px-3 py-2">
        {QUICK_PROMPTS.map((p) => (
          <button
            key={p}
            onClick={() => send(p)}
            disabled={loading}
            className="chip border border-quest-100 bg-white text-quest-700 hover:bg-quest-50 disabled:opacity-50"
          >
            <Sparkles className="h-3 w-3" /> {p}
          </button>
        ))}
      </div>

      {/* input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex items-center gap-2 border-t border-quest-50 p-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Quest anything about this lesson…"
          className="flex-1 rounded-2xl border border-quest-100 bg-white px-4 py-2.5 text-sm outline-none focus:border-quest-300 focus:ring-4 focus:ring-quest-100"
        />
        <button type="submit" disabled={loading} className="btn-primary h-11 w-11 p-0">
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
