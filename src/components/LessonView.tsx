"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, BookOpen, Baby, Lightbulb, CheckCircle2,
  AlertTriangle, Code2, Construction,
} from "lucide-react";
import type { Lesson, Stage } from "@/data/types";
import { CodeBlock } from "./CodeBlock";
import { Playground } from "./Playground";
import { VisualMetaphor } from "./VisualMetaphor";
import { Quiz } from "./Quiz";
import { AiMentor } from "./AiMentor";
import { useProgress } from "@/lib/progress";
import { allLessons } from "@/data/roadmap";
import type { MentorContext } from "@/lib/ai";

const TABS = [
  { key: "beginner", label: "Explain it", icon: BookOpen },
  { key: "child", label: "Like I'm 10", icon: Baby },
  { key: "analogy", label: "Real-world", icon: Lightbulb },
] as const;

export function LessonView({
  lesson,
  stage,
  prevSlug,
  nextSlug,
}: {
  lesson: Lesson;
  stage: Stage;
  prevSlug: string | null;
  nextSlug: string | null;
}) {
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("beginner");
  const [injected, setInjected] = useState<string | undefined>();
  const complete = useProgress((s) => s.complete);
  const isComplete = useProgress((s) => !!s.completed[lesson.id]);
  const completedMap = useProgress((s) => s.completed);

  const mentorContext: MentorContext = useMemo(() => {
    const completedTitles = allLessons()
      .filter((l) => completedMap[l.id])
      .map((l) => l.title);
    return {
      topicTitle: lesson.title,
      stageTitle: stage.title,
      objective: lesson.objective,
      childExplanation: lesson.child,
      aiContext: lesson.aiContext,
      completedLessons: completedTitles,
    };
  }, [lesson, stage, completedMap]);

  const tabContent: Record<string, string | undefined> = {
    beginner: lesson.beginner,
    child: lesson.child,
    analogy: lesson.analogy,
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* breadcrumb */}
      <div className="mb-5 flex items-center gap-2 text-sm text-ink/45 dark:text-cloud/45">
        <Link href="/roadmap" className="transition-colors hover:text-ink dark:hover:text-cloud">Roadmap</Link>
        <span>/</span>
        <span>{stage.title}</span>
      </div>

      {/* header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{lesson.emoji}</span>
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{lesson.title}</h1>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="chip border border-black/[0.06] text-ink/55 dark:border-white/[0.08] dark:text-cloud/55">{lesson.objective}</span>
          <span className="chip border border-black/[0.06] text-ink/45 dark:border-white/[0.08] dark:text-cloud/45">{lesson.estMinutes} min</span>
          {isComplete && <span className="chip bg-mint-500/10 text-mint-600 dark:text-mint-400">Completed</span>}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* ── main column ── */}
        <div className="space-y-8">
          {!lesson.authored ? (
            <div className="card p-8 text-center">
              <Construction className="mx-auto h-9 w-9 text-ink/40 dark:text-cloud/40" strokeWidth={1.5} />
              <h2 className="mt-3 font-display text-xl font-semibold">Full lesson coming soon</h2>
              <p className="mx-auto mt-2 max-w-md text-ink/55 dark:text-cloud/55">
                Here's the quick idea while the full interactive lesson is being authored:
              </p>
              <p className="note-accent mx-auto mt-4 max-w-md text-ink/80 dark:text-cloud/80">{lesson.child}</p>
              <p className="mt-4 text-sm text-ink/45 dark:text-cloud/45">
                Meanwhile, your AI tutor on the right already knows this topic — ask it anything! →
              </p>
            </div>
          ) : (
            <>
              {/* explanation tabs */}
              <div className="card overflow-hidden">
                <div className="flex border-b border-black/[0.06] dark:border-white/[0.08]">
                  {TABS.map((t) => (
                    <button
                      key={t.key}
                      onClick={() => setTab(t.key)}
                      className={`flex flex-1 items-center justify-center gap-2 py-3 text-sm font-medium transition ${
                        tab === t.key
                          ? "bg-black/[0.04] text-ink dark:bg-white/[0.06] dark:text-cloud"
                          : "text-ink/45 hover:bg-black/[0.02] dark:text-cloud/45 dark:hover:bg-white/[0.03]"
                      }`}
                    >
                      <t.icon className="h-4 w-4" strokeWidth={1.5} /> {t.label}
                    </button>
                  ))}
                </div>
                <motion.div key={tab} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="prose-lesson p-6">
                  <p dangerouslySetInnerHTML={{ __html: mdLite(tabContent[tab] ?? "") }} />
                </motion.div>
              </div>

              {/* visual metaphor */}
              {lesson.visual && <VisualMetaphor spec={lesson.visual} />}

              {/* annotated example */}
              {lesson.example && (
                <div className="card p-6">
                  <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-semibold">
                    <Code2 className="h-5 w-5 text-quest-500" strokeWidth={1.75} /> See it in code
                  </h2>
                  <CodeBlock code={lesson.example.code} />
                  <p className="note-accent mt-3 text-sm text-ink/80 dark:text-cloud/80">{lesson.example.explain}</p>
                </div>
              )}

              {/* playground */}
              {lesson.playground && (
                <div>
                  <h2 className="mb-3 font-display text-lg font-semibold">Your turn — play with it</h2>
                  <Playground
                    starter={lesson.playground}
                    onAskAi={(code) => setInjected(`Here is my code, can you help me understand or fix it?\n\n${code}`)}
                  />
                </div>
              )}

              {/* common mistakes */}
              {lesson.mistakes && lesson.mistakes.length > 0 && (
                <div className="card p-6">
                  <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold">
                    <AlertTriangle className="h-5 w-5 text-coral-500" strokeWidth={1.5} /> Watch out for these
                  </h2>
                  <div className="space-y-4">
                    {lesson.mistakes.map((mk, i) => (
                      <div key={i} className="grid gap-3 sm:grid-cols-2">
                        <div>
                          <span className="chip bg-coral-500/10 text-coral-500 dark:text-coral-400">✗ Avoid</span>
                          <CodeBlock code={mk.wrong} className="mt-1.5 text-xs" />
                        </div>
                        <div>
                          <span className="chip bg-mint-500/10 text-mint-600 dark:text-mint-400">✓ Do this</span>
                          <CodeBlock code={mk.right} className="mt-1.5 text-xs" />
                        </div>
                        <p className="sm:col-span-2 text-sm text-ink/65 dark:text-cloud/65">{mk.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* quiz */}
              {lesson.quiz && lesson.quiz.length > 0 && (
                <Quiz questions={lesson.quiz} onComplete={() => complete(lesson.id)} />
              )}
            </>
          )}

          {/* complete + nav */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-black/[0.06] pt-6 dark:border-white/[0.08]">
            {prevSlug ? (
              <Link href={`/lesson/${prevSlug}`} className="btn-ghost">
                <ArrowLeft className="h-4 w-4" /> Previous
              </Link>
            ) : <span />}

            <button
              onClick={() => complete(lesson.id)}
              className={`btn px-6 py-3 ${isComplete ? "bg-mint-500 text-white" : "btn-primary"}`}
            >
              <CheckCircle2 className="h-5 w-5" />
              {isComplete ? "Completed!" : "Mark complete (+20 XP)"}
            </button>

            {nextSlug ? (
              <Link href={`/lesson/${nextSlug}`} className="btn-primary">
                Next <ArrowRight className="h-4 w-4" />
              </Link>
            ) : <span />}
          </div>
        </div>

        {/* ── AI mentor sidebar ── */}
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <AiMentor context={mentorContext} injected={injected} onConsumed={() => setInjected(undefined)} />
        </aside>
      </div>
    </div>
  );
}

// minimal markdown: **bold** and `code`
function mdLite(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`(.+?)`/g, "<code>$1</code>");
}
