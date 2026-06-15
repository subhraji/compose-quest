"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Lock, Play, Star } from "lucide-react";
import { ROADMAP } from "@/data/roadmap";
import { useProgress, useStageUnlocked } from "@/lib/progress";
import { cn } from "@/lib/utils";

export function RoadmapJourney() {
  const completed = useProgress((s) => s.completed);
  const stageUnlocked = useStageUnlocked();

  return (
    <div className="relative mx-auto max-w-3xl">
      {ROADMAP.map((stage, si) => {
        const unlocked = stageUnlocked(si);
        const doneCount = stage.lessons.filter((l) => completed[l.id]).length;
        const stageDone = doneCount === stage.lessons.length;

        return (
          <div key={stage.id} className="relative">
            {/* connector line */}
            {si > 0 && <div className="absolute left-8 -top-6 h-6 w-1 -translate-x-1/2 rounded bg-quest-100" />}

            {/* stage header */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              className="mb-4 flex items-center gap-4"
            >
              <div
                className={cn(
                  "grid h-16 w-16 shrink-0 place-items-center rounded-3xl text-2xl shadow-float bg-gradient-to-br",
                  stage.gradient,
                  !unlocked && "opacity-50 grayscale"
                )}
              >
                {stageDone ? <Star className="h-7 w-7 fill-white text-white" /> : stage.emoji}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="font-display text-xl font-extrabold">{stage.title}</h2>
                  {stageDone && <span className="chip bg-mint-400/15 text-mint-600">complete ✓</span>}
                  {!unlocked && (
                    <span className="chip bg-ink/5 text-ink-muted">
                      <Lock className="h-3 w-3" /> locked
                    </span>
                  )}
                </div>
                <p className="text-sm text-ink/60">{stage.blurb}</p>
                <div className="mt-1.5 flex items-center gap-2">
                  <div className="h-1.5 w-40 overflow-hidden rounded-full bg-quest-100">
                    <div
                      className="h-full rounded-full bg-quest-gradient transition-all"
                      style={{ width: `${(doneCount / stage.lessons.length) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-ink-muted">
                    {doneCount}/{stage.lessons.length}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* lesson nodes */}
            <div className="ml-8 mb-8 space-y-2 border-l-2 border-dashed border-quest-100 pl-8">
              {stage.lessons.map((lesson, li) => {
                const isDone = !!completed[lesson.id];
                const cardInner = (
                  <motion.div
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: li * 0.03 }}
                    whileHover={unlocked ? { x: 4 } : undefined}
                    className={cn(
                      "group relative flex items-center gap-3 rounded-2xl border bg-white p-3 pr-4 transition",
                      unlocked ? "border-quest-100 hover:border-quest-300 hover:shadow-soft cursor-pointer" : "border-quest-50 opacity-60",
                      isDone && "border-mint-400/40 bg-mint-400/5"
                    )}
                  >
                    {/* node dot on the line */}
                    <span
                      className={cn(
                        "absolute -left-[42px] grid h-6 w-6 place-items-center rounded-full ring-4 ring-cloud",
                        isDone ? "bg-mint-500 text-white" : unlocked ? "bg-quest-500 text-white" : "bg-quest-100 text-quest-300"
                      )}
                    >
                      {isDone ? <Check className="h-3.5 w-3.5" /> : unlocked ? <Play className="h-3 w-3 fill-current" /> : <Lock className="h-3 w-3" />}
                    </span>

                    <span className="text-2xl">{lesson.emoji}</span>
                    <div className="flex-1">
                      <p className="font-semibold leading-tight">{lesson.title}</p>
                      <p className="text-xs text-ink/55">{lesson.objective}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="chip bg-quest-50 text-quest-600">{lesson.estMinutes} min</span>
                      {lesson.authored && (
                        <span className="text-[10px] font-bold uppercase tracking-wide text-spark-500">★ full lesson</span>
                      )}
                    </div>
                  </motion.div>
                );

                return unlocked ? (
                  <Link key={lesson.id} href={`/lesson/${lesson.slug}`}>
                    {cardInner}
                  </Link>
                ) : (
                  <div key={lesson.id} title="Finish the previous stage to unlock">
                    {cardInner}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* finish flag */}
      <div className="flex flex-col items-center pt-2 text-center">
        <div className="grid h-16 w-16 place-items-center rounded-3xl bg-spark-gradient text-3xl shadow-float">🏆</div>
        <p className="mt-2 font-display text-lg font-bold">Compose Master</p>
        <p className="text-sm text-ink/60">Complete every stage to reach the summit.</p>
      </div>
    </div>
  );
}
