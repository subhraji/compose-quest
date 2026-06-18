"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Flame } from "lucide-react";
import { useOverallProgress, useProgress } from "@/lib/progress";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  const { percent, done, total } = useOverallProgress();
  const xp = useProgress((s) => s.xp);
  const pathname = usePathname();
  const onRoadmap = pathname === "/roadmap";
  const onLesson = pathname?.startsWith("/lesson") ?? false;

  return (
    <header className="sticky top-0 z-40 border-b border-black/[0.06] bg-white/80 backdrop-blur-xl dark:border-white/[0.08] dark:bg-ink/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="group flex items-center gap-2">
          <span
            className="grid h-8 w-8 place-items-center rounded-xl text-white shadow-lg shadow-violet-500/30 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
            style={{ backgroundImage: "var(--brand)" }}
          >
            <Compass className="h-4.5 w-4.5" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            Compose<span className="text-gradient">Quest</span>
          </span>
        </Link>

        <nav className="flex items-center gap-2 sm:gap-3">
          {!onRoadmap && (
            <Link
              href="/roadmap"
              className="hidden rounded-full px-3 py-2 text-sm font-medium text-ink/60 transition-colors hover:text-ink dark:text-cloud/60 dark:hover:text-cloud sm:block"
            >
              Roadmap
            </Link>
          )}

          {/* Header progress pill — hidden on roadmap, which shows its own larger bar */}
          {!onRoadmap && (
            <div className="hidden items-center gap-2 rounded-full border border-black/[0.06] px-3 py-1.5 dark:border-white/[0.08] sm:flex">
              <div className="h-1.5 w-20 overflow-hidden rounded-full bg-black/[0.06] dark:bg-white/10">
                <div
                  className="h-full rounded-full bg-ink transition-all duration-700 dark:bg-white"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <span className="text-xs font-semibold text-ink/60 dark:text-cloud/60">
                {done}/{total}
              </span>
            </div>
          )}

          <span className="chip border border-black/[0.06] text-ink/70 dark:border-white/[0.08] dark:text-cloud/70">
            <Flame className="h-3.5 w-3.5 text-spark-500" /> {xp} XP
          </span>

          <ThemeToggle />

          {/* Continue is the home-page entry CTA only — redundant on roadmap (same page) and lesson pages (which have their own nav). */}
          {!onRoadmap && !onLesson && (
            <Link href="/roadmap" className="btn-primary px-4 py-2 text-sm">
              Continue
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
