"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ROADMAP, allLessons } from "@/data/roadmap";

interface ProgressState {
  completed: Record<string, boolean>;
  xp: number;
  /** lessonId -> true */
  complete: (lessonId: string, xp?: number) => void;
  uncomplete: (lessonId: string) => void;
  isComplete: (lessonId: string) => boolean;
  reset: () => void;
}

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      completed: {},
      xp: 0,
      complete: (lessonId, xp = 20) =>
        set((s) =>
          s.completed[lessonId]
            ? s
            : { completed: { ...s.completed, [lessonId]: true }, xp: s.xp + xp }
        ),
      uncomplete: (lessonId) =>
        set((s) => {
          const next = { ...s.completed };
          delete next[lessonId];
          return { completed: next, xp: Math.max(0, s.xp - 20) };
        }),
      isComplete: (lessonId) => !!get().completed[lessonId],
      reset: () => set({ completed: {}, xp: 0 }),
    }),
    { name: "compose-quest-progress" }
  )
);

/** Stage is unlocked when the previous stage is fully complete (stage 0 always open). */
export function useStageUnlocked() {
  const completed = useProgress((s) => s.completed);
  return (stageIndex: number): boolean => {
    if (stageIndex <= 0) return true;
    const prev = ROADMAP[stageIndex - 1];
    return prev.lessons.every((l) => completed[l.id]);
  };
}

export function useOverallProgress() {
  const completed = useProgress((s) => s.completed);
  const lessons = allLessons();
  const done = lessons.filter((l) => completed[l.id]).length;
  return {
    done,
    total: lessons.length,
    percent: lessons.length ? Math.round((done / lessons.length) * 100) : 0,
  };
}
