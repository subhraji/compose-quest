"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, BookOpen, Baby, Lightbulb, CheckCircle2,
  AlertTriangle, Sparkles, Construction,
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
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* breadcrumb */}
      <div className="mb-4 flex items-center gap-2 text-sm text-ink-muted">
        <Link href="/roadmap" className="hover:text-quest-600">Roadmap</Link>
        <span>/</span>
        <span>{stage.emoji} {stage.title}</span>
      </div>

      {/* header */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-4xl">{lesson.emoji}</span>
            <h1 className="font-display text-3xl font-black sm:text-4xl">{lesson.title}</h1>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="chip bg-quest-50 text-quest-700">🎯 {lesson.objective}</span>
            <span className="chip bg-quest-50 text-quest-600">{lesson.estMinutes} min</span>
            {isComplete && <span className="chip bg-mint-400/15 text-mint-600">completed ✓</span>}
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* ── main column ── */}
        <div className="space-y-8">
          {!lesson.authored ? (
            <div className="card p-8 text-center">
              <Construction className="mx-auto h-10 w-10 text-spark-500" />
              <h2 className="mt-3 font-display text-xl font-bold">Full lesson coming soon</h2>
              <p className="mx-auto mt-2 max-w-md text-ink/65">
                Here's the quick idea while the full interactive lesson is being authored:
              </p>
              <p className="mx-auto mt-4 max-w-md rounded-2xl bg-quest-50 p-4 text-ink/80">{lesson.child}</p>
              <p className="mt-4 text-sm text-ink-muted">
                Meanwhile, your AI tutor on the right already knows this topic — ask it anything! →
              </p>
            </div>
          ) : (
            <>
              {/* explanation tabs */}
              <div className="card overflow-hidden">
                <div className="flex border-b border-quest-50">
                  {TABS.map((t) => (
                    <button
                      key={t.key}
                      onClick={() => setTab(t.key)}
                      className={`flex flex-1 items-center justify-center gap-2 py-3 text-sm font-semibold transition ${
                        tab === t.key ? "bg-quest-50 text-quest-700" : "text-ink/55 hover:bg-quest-50/50"
                      }`}
                    >
                      <t.icon className="h-4 w-4" /> {t.label}
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
                  <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-bold">
                    <Sparkles className="h-5 w-5 text-quest-500" /> See it in code
                  </h2>
                  <CodeBlock code={lesson.example.code} />
                  <p className="mt-3 rounded-2xl bg-quest-50 p-4 text-sm text-ink/80">{lesson.example.explain}</p>
                </div>
              )}

              {/* playground */}
              {lesson.playground && (
                <div>
                  <h2 className="mb-3 font-display text-lg font-bold">🛠️ Your turn — play with it</h2>
                  <Playground
                    starter={lesson.playground}
                    onAskAi={(code) => setInjected(`Here is my code, can you help me understand or fix it?\n\n${code}`)}
                  />
                </div>
              )}

              {/* common mistakes */}
              {lesson.mistakes && lesson.mistakes.length > 0 && (
                <div className="card p-6">
                  <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold">
                    <AlertTriangle className="h-5 w-5 text-coral-500" /> Watch out for these
                  </h2>
                  <div className="space-y-4">
                    {lesson.mistakes.map((mk, i) => (
                      <div key={i} className="grid gap-3 sm:grid-cols-2">
                        <div>
                          <span className="chip bg-coral-400/10 text-coral-500">✗ Avoid</span>
                          <CodeBlock code={mk.wrong} className="mt-1.5 text-xs" />
                        </div>
                        <div>
                          <span className="chip bg-mint-400/15 text-mint-600">✓ Do this</span>
                          <CodeBlock code={mk.right} className="mt-1.5 text-xs" />
                        </div>
                        <p className="sm:col-span-2 text-sm text-ink/70">💡 {mk.note}</p>
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
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-quest-100 pt-6">
            {prevSlug ? (
              <Link href={`/lesson/${prevSlug}`} className="btn-ghost">
                <ArrowLeft className="h-4 w-4" /> Previous
              </Link>
            ) : <span />}

            <button
              onClick={() => complete(lesson.id)}
              className={`btn ${isComplete ? "bg-mint-500 text-white px-5 py-3" : "btn-primary"}`}
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
