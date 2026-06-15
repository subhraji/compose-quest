// ── Compose Quest content model ──────────────────────────────
// Every lesson is authored against this shape so the UI can render
// a consistent, beginner-first experience for any topic.

export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number; // index into options
  explain: string; // why the answer is right (friendly tone)
}

export interface CommonMistake {
  wrong: string; // the buggy / confusing snippet or idea
  right: string; // the corrected version
  note: string; // plain-language why
}

/** A visual metaphor rendered by the VisualMetaphor component. */
export interface VisualSpec {
  /** picks which illustration the component draws */
  metaphor:
    | "memory-box" // state
    | "lego" // recomposition
    | "rooms" // navigation
    | "manager" // viewmodel
    | "toys" // state hoisting
    | "restaurant" // mvvm
    | "stack" // column
    | "blueprint" // composable functions
    | "generic";
  title: string;
  caption: string;
}

export interface CodeExample {
  code: string;
  explain: string;
}

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  emoji: string;
  estMinutes: number;
  /** Always present — drives the roadmap card + page header. */
  objective: string;
  /** True when every teaching section below is filled in. */
  authored: boolean;

  beginner?: string; // clear beginner explanation
  child?: string; // "explain like I'm 10"
  analogy?: string; // real-world analogy
  visual?: VisualSpec; // visual explanation concept
  example?: CodeExample; // interactive example (read-only, annotated)
  playground?: string; // starter code the learner can edit + preview
  mistakes?: CommonMistake[];
  quiz?: QuizQuestion[];
  aiContext?: string; // hidden system context handed to the AI mentor
}

export interface Stage {
  id: string;
  title: string;
  emoji: string;
  blurb: string;
  /** tailwind gradient classes for the stage node */
  gradient: string;
  lessons: Lesson[];
}
