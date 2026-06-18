"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { VisualSpec } from "@/data/types";

// Each metaphor is a small, friendly, *interactive* illustration.
// The goal: make an abstract Compose idea click instantly.

function MemoryBox() {
  const [n, setN] = useState(3);
  return (
    <div className="flex flex-col items-center gap-3">
      <motion.div
        className="relative grid h-28 w-28 place-items-center rounded-3xl bg-gradient-to-br from-quest-400 to-purple-500 text-white shadow-float"
        animate={{ rotate: [0, -2, 2, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
      >
        <span className="absolute top-2 text-[10px] font-bold uppercase tracking-widest opacity-80">state</span>
        <motion.span key={n} className="text-4xl font-black" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          {n}
        </motion.span>
      </motion.div>
      <button onClick={() => setN((x) => x + 1)} className="btn-primary px-4 py-2 text-sm">
        Change the box → UI redraws
      </button>
      <p className="text-xs text-ink/45 dark:text-cloud/45">The number updates the moment the box changes.</p>
    </div>
  );
}

function Lego() {
  const [built, setBuilt] = useState(3);
  const colors = ["#f43f5e", "#f59e0b", "#10b981", "#6366f1", "#d946ef"];
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex h-28 flex-col-reverse items-center justify-start gap-1">
        {Array.from({ length: built }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="h-5 w-20 rounded-md"
            style={{ background: colors[i % colors.length] }}
          />
        ))}
      </div>
      <div className="flex gap-2">
        <button onClick={() => setBuilt((b) => Math.min(5, b + 1))} className="btn-primary px-3 py-1.5 text-xs">
          Recompose (add brick)
        </button>
        <button onClick={() => setBuilt(3)} className="btn-ghost px-3 py-1.5 text-xs">
          Reset
        </button>
      </div>
      <p className="text-xs text-ink/45 dark:text-cloud/45">Only the new brick is added — the rest stay put.</p>
    </div>
  );
}

function Rooms() {
  const [room, setRoom] = useState(0);
  const rooms = [
    { name: "Home", emoji: "🏠", bg: "from-quest-400 to-quest-600" },
    { name: "Profile", emoji: "👤", bg: "from-pink-400 to-coral-500" },
    { name: "Settings", emoji: "⚙️", bg: "from-mint-400 to-quest-400" },
  ];
  const r = rooms[room];
  return (
    <div className="flex flex-col items-center gap-3">
      <motion.div
        key={room}
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className={`grid h-28 w-40 place-items-center rounded-3xl bg-gradient-to-br ${r.bg} text-white shadow-float`}
      >
        <span className="text-4xl">{r.emoji}</span>
        <span className="font-bold">{r.name}</span>
      </motion.div>
      <div className="flex gap-2">
        {rooms.map((rm, i) => (
          <button
            key={i}
            onClick={() => setRoom(i)}
            className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${i === room ? "bg-ink text-white dark:bg-white dark:text-ink" : "bg-black/[0.05] text-ink/60 dark:bg-white/10 dark:text-cloud/60"}`}
          >
            {rm.name}
          </button>
        ))}
      </div>
      <p className="text-xs text-ink/45 dark:text-cloud/45">Navigation = walking between rooms (screens).</p>
    </div>
  );
}

function Stack() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex flex-col gap-1.5">
        {["Name", "Title", "Bio"].map((t, i) => (
          <motion.div
            key={t}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.15 }}
            className="w-44 rounded-xl border border-black/[0.06] bg-white px-4 py-2.5 text-center text-sm font-semibold text-ink/70 dark:border-white/10 dark:bg-white/[0.06] dark:text-cloud/80"
          >
            {t}
          </motion.div>
        ))}
      </div>
      <p className="text-xs text-ink/45 dark:text-cloud/45">A Column stacks children top → bottom.</p>
    </div>
  );
}

function Generic({ emoji }: { emoji: string }) {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ repeat: Infinity, duration: 4 }}
      className="grid h-28 w-28 place-items-center rounded-3xl border border-black/[0.06] bg-white text-5xl dark:border-white/[0.1] dark:bg-white/[0.04]"
    >
      {emoji}
    </motion.div>
  );
}

const EMOJI: Record<string, string> = {
  manager: "👔",
  toys: "🧸",
  restaurant: "🍽️",
  blueprint: "📐",
  generic: "✨",
};

export function VisualMetaphor({ spec }: { spec: VisualSpec }) {
  let body: React.ReactNode;
  switch (spec.metaphor) {
    case "memory-box": body = <MemoryBox />; break;
    case "lego": body = <Lego />; break;
    case "rooms": body = <Rooms />; break;
    case "stack": body = <Stack />; break;
    default: body = <Generic emoji={EMOJI[spec.metaphor] ?? "✨"} />;
  }
  return (
    <div className="card overflow-hidden p-6">
      <div className="mb-1 flex items-center gap-2">
        <span className="chip border border-black/[0.06] text-ink/55 dark:border-white/[0.08] dark:text-cloud/55">Visual idea</span>
        <h3 className="font-display text-lg font-semibold">{spec.title}</h3>
      </div>
      <p className="mb-5 text-sm text-ink/55 dark:text-cloud/55">{spec.caption}</p>
      <div className="rounded-xl bg-black/[0.03] p-6 dark:bg-white/[0.04]">{body}</div>
    </div>
  );
}
