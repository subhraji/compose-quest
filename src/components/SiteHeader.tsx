"use client";

import Link from "next/link";
import { Compass, Flame, Sparkles } from "lucide-react";
import { useOverallProgress, useProgress } from "@/lib/progress";

export function SiteHeader() {
  const { percent, done, total } = useOverallProgress();
  const xp = useProgress((s) => s.xp);

  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-2xl bg-quest-gradient text-white shadow-soft">
            <Compass className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-extrabold tracking-tight">
            Compose<span className="text-quest-500">Quest</span>
          </span>
        </Link>

        <nav className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/roadmap"
            className="hidden rounded-xl px-3 py-2 text-sm font-semibold text-ink/70 hover:bg-quest-50 hover:text-quest-700 sm:block"
          >
            Roadmap
          </Link>

          <div className="hidden items-center gap-2 rounded-full bg-quest-50 px-3 py-1.5 sm:flex">
            <div className="h-2 w-24 overflow-hidden rounded-full bg-quest-100">
              <div
                className="h-full rounded-full bg-quest-gradient transition-all duration-700"
                style={{ width: `${percent}%` }}
              />
            </div>
            <span className="text-xs font-bold text-quest-700">
              {done}/{total}
            </span>
          </div>

          <span className="chip bg-spark-gradient text-white shadow-soft">
            <Flame className="h-3.5 w-3.5" /> {xp} XP
          </span>

          <Link href="/roadmap" className="btn-primary px-4 py-2 text-sm">
            <Sparkles className="h-4 w-4" /> Continue
          </Link>
        </nav>
      </div>
    </header>
  );
}
