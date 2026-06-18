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
            {si > 0 && <div className="absolute left-8 -top-6 h-6 w-px -translate-x-1/2 bg-black/[0.1] dark:bg-white/15" />}

            {/* stage header */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              className="mb-4 flex items-center gap-4"
            >
              <div
                className={cn(
                  "grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-2xl",
                  stageDone || unlocked
                    ? "bg-ink text-white dark:bg-white dark:text-ink"
                    : "border border-black/[0.08] text-ink/30 dark:border-white/[0.1] dark:text-cloud/30"
                )}
              >
                {stageDone ? <Star className="h-6 w-6 fill-current" /> : stage.emoji}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="font-display text-xl font-bold tracking-tight">{stage.title}</h2>
                  {stageDone && <span className="chip bg-mint-500/10 text-mint-600 dark:text-mint-400">complete</span>}
                  {!unlocked && (
                    <span className="chip border border-black/[0.06] text-ink/45 dark:border-white/[0.08] dark:text-cloud/45">
                      <Lock className="h-3 w-3" /> locked
                    </span>
                  )}
                </div>
                <p className="text-sm text-ink/55 dark:text-cloud/55">{stage.blurb}</p>
                <div className="mt-1.5 flex items-center gap-2">
                  <div className="h-1.5 w-40 overflow-hidden rounded-full bg-black/[0.06] dark:bg-white/10">
                    <div
                      className="h-full rounded-full bg-ink transition-all dark:bg-white"
                      style={{ width: `${(doneCount / stage.lessons.length) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-ink/40 dark:text-cloud/40">
                    {doneCount}/{stage.lessons.length}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* lesson nodes */}
            <div className="ml-8 mb-8 space-y-2 border-l border-black/[0.08] pl-8 dark:border-white/[0.1]">
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
                      "group relative flex items-center gap-3 rounded-xl border p-3 pr-4 transition",
                      unlocked
                        ? "border-black/[0.06] bg-white hover:border-ink/20 dark:border-white/[0.08] dark:bg-white/[0.02] dark:hover:border-white/25 cursor-pointer"
                        : "border-black/[0.04] opacity-50 dark:border-white/[0.05]",
                      isDone && "border-mint-500/30 bg-mint-500/[0.04]"
                    )}
                  >
                    {/* node dot on the line */}
                    <span
                      className={cn(
                        "absolute -left-[41px] grid h-6 w-6 place-items-center rounded-full ring-4 ring-white dark:ring-ink",
                        isDone ? "bg-mint-500 text-white" : unlocked ? "bg-ink text-white dark:bg-white dark:text-ink" : "bg-black/[0.08] text-ink/30 dark:bg-white/10 dark:text-cloud/30"
                      )}
                    >
                      {isDone ? <Check className="h-3.5 w-3.5" /> : unlocked ? <Play className="h-3 w-3 fill-current" /> : <Lock className="h-3 w-3" />}
                    </span>

                    <span className="text-2xl">{lesson.emoji}</span>
                    <div className="flex-1">
                      <p className="font-semibold leading-tight">{lesson.title}</p>
                      <p className="text-xs text-ink/50 dark:text-cloud/50">{lesson.objective}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="chip border border-black/[0.06] text-ink/45 dark:border-white/[0.08] dark:text-cloud/45">{lesson.estMinutes} min</span>
                      {lesson.authored && (
                        <span className="text-[10px] font-semibold uppercase tracking-wide text-ink/40 dark:text-cloud/40">full lesson</span>
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
        <div className="grid h-14 w-14 place-items-center rounded-2xl border border-black/[0.08] text-3xl dark:border-white/[0.1]">🏆</div>
        <p className="mt-2 font-display text-lg font-semibold">Compose Master</p>
        <p className="text-sm text-ink/55 dark:text-cloud/55">Complete every stage to reach the summit.</p>
      </div>
    </div>
  );
}
