"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, PartyPopper } from "lucide-react";
import type { QuizQuestion } from "@/data/types";

export function Quiz({ questions, onComplete }: { questions: QuizQuestion[]; onComplete?: () => void }) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);

  const q = questions[i];

  const choose = (idx: number) => {
    if (picked !== null) return;
    setPicked(idx);
    if (idx === q.answer) setCorrect((c) => c + 1);
  };
  const nextQ = () => {
    if (i + 1 < questions.length) {
      setI(i + 1);
      setPicked(null);
    } else {
      setDone(true);
      onComplete?.();
    }
  };

  if (done) {
    return (
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="card p-8 text-center">
        <PartyPopper className="mx-auto h-10 w-10 text-spark-500" />
        <h3 className="mt-3 font-display text-2xl font-bold">
          {correct}/{questions.length} correct!
        </h3>
        <p className="mt-1 text-ink/70">
          {correct === questions.length ? "Perfect! You've got this. 🎉" : "Nice work — review the explanations and you'll nail it."}
        </p>
      </motion.div>
    );
  }

  return (
    <div className="card p-6">
      <div className="mb-4 flex items-center justify-between">
        <span className="chip bg-spark-400/15 text-spark-600">🧠 Quick quiz</span>
        <span className="text-xs font-semibold text-ink-muted">
          {i + 1} / {questions.length}
        </span>
      </div>
      <h3 className="mb-4 font-display text-lg font-bold">{q.q}</h3>
      <div className="grid gap-2">
        {q.options.map((opt, idx) => {
          const isAnswer = idx === q.answer;
          const isPicked = picked === idx;
          let cls = "border-quest-100 hover:border-quest-300 hover:bg-quest-50";
          if (picked !== null) {
            if (isAnswer) cls = "border-mint-500 bg-mint-400/10";
            else if (isPicked) cls = "border-coral-500 bg-coral-400/10";
            else cls = "border-quest-100 opacity-60";
          }
          return (
            <button
              key={idx}
              onClick={() => choose(idx)}
              className={`flex items-center justify-between rounded-2xl border-2 px-4 py-3 text-left text-sm font-medium transition ${cls}`}
            >
              {opt}
              {picked !== null && isAnswer && <Check className="h-4 w-4 text-mint-500" />}
              {isPicked && !isAnswer && <X className="h-4 w-4 text-coral-500" />}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {picked !== null && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="mt-4 overflow-hidden"
          >
            <div className="rounded-2xl bg-quest-50 p-4 text-sm text-ink/80">{q.explain}</div>
            <button onClick={nextQ} className="btn-primary mt-3 w-full py-2.5 text-sm">
              {i + 1 < questions.length ? "Next question →" : "Finish quiz 🎉"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
