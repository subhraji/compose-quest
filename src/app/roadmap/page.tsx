"use client";

import { RoadmapJourney } from "@/components/RoadmapJourney";
import { useOverallProgress, useProgress } from "@/lib/progress";
import { RotateCcw } from "lucide-react";

export default function RoadmapPage() {
  const { done, total, percent } = useOverallProgress();
  const reset = useProgress((s) => s.reset);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-10 text-center">
        <span className="chip bg-quest-50 text-quest-700">🧭 Your journey</span>
        <h1 className="mt-3 font-display text-4xl font-black sm:text-5xl">The Compose Roadmap</h1>
        <p className="mx-auto mt-3 max-w-xl text-ink/65">
          Follow the path from the very first idea to advanced Compose. Each stage unlocks the next —
          finish lessons to climb toward Compose Master. 🏆
        </p>

        {/* overall progress */}
        <div className="mx-auto mt-6 flex max-w-md items-center gap-3">
          <div className="h-3 flex-1 overflow-hidden rounded-full bg-quest-100">
            <div className="h-full rounded-full bg-quest-gradient transition-all duration-700" style={{ width: `${percent}%` }} />
          </div>
          <span className="text-sm font-bold text-quest-700">
            {done}/{total} · {percent}%
          </span>
        </div>
        {done > 0 && (
          <button onClick={reset} className="mx-auto mt-3 flex items-center gap-1 text-xs text-ink-muted hover:text-coral-500">
            <RotateCcw className="h-3 w-3" /> reset progress
          </button>
        )}
      </div>

      <RoadmapJourney />
    </div>
  );
}
