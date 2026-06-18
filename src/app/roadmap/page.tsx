"use client";

import { RoadmapJourney } from "@/components/RoadmapJourney";
import { useOverallProgress, useProgress } from "@/lib/progress";
import { RotateCcw } from "lucide-react";

export default function RoadmapPage() {
  const { done, total, percent } = useOverallProgress();
  const reset = useProgress((s) => s.reset);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-12 text-center">
        <span className="chip border border-quest-300/40 bg-quest-50/60 text-quest-700 dark:border-quest-400/30 dark:bg-quest-500/10 dark:text-quest-300">Your journey</span>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">The Compose <span className="text-gradient">Roadmap</span></h1>
        <p className="mx-auto mt-3 max-w-xl text-ink/55 dark:text-cloud/55">
          Follow the path from the very first idea to advanced Compose. Each stage unlocks the next —
          finish lessons to climb toward Compose Master.
        </p>

        {/* overall progress */}
        <div className="mx-auto mt-6 flex max-w-md items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-black/[0.06] dark:bg-white/10">
            <div className="h-full rounded-full bg-ink transition-all duration-700 dark:bg-white" style={{ width: `${percent}%` }} />
          </div>
          <span className="text-sm font-semibold text-ink/60 dark:text-cloud/60">
            {done}/{total} · {percent}%
          </span>
        </div>
        {done > 0 && (
          <button onClick={reset} className="mx-auto mt-3 flex items-center gap-1 text-xs text-ink/40 transition-colors hover:text-coral-500 dark:text-cloud/40">
            <RotateCcw className="h-3 w-3" /> reset progress
          </button>
        )}
      </div>

      <RoadmapJourney />
    </div>
  );
}
