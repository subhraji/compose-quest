# Compose Quest — Product Requirements Document

> **Tagline:** *Learn Jetpack Compose Like an Adventure*

## 1. Vision

Compose Quest is the most beginner-friendly Jetpack Compose learning platform in the world. It is **not** documentation, **not** a traditional course, and **not** a clone of the Android Developers site. It is an **interactive learning adventure** that takes a complete beginner — someone with zero Compose knowledge — and guides them, one rewarding step at a time, to advanced Compose mastery.

The north-star feeling: *"This is fun, I understand it, and I can't wait for the next step."*

## 2. Problem

Learning Jetpack Compose today is intimidating for beginners:

- Official docs are reference-oriented and assume Android/Kotlin fluency.
- Tutorials jump between topics with no sense of progression or "where am I?"
- Abstract concepts (state, recomposition, hoisting, MVVM) are explained in jargon.
- Beginners can read but rarely *do* — there's no instant feedback loop.
- There's no friendly mentor available the moment you get stuck.

## 3. Goals (MVP)

| # | Goal | Success signal |
|---|------|----------------|
| G1 | A complete beginner can start with zero knowledge and progress confidently | Lesson 1 → quiz pass without external help |
| G2 | Every concept is understandable by a 10-year-old | "Like I'm 10" tab + AI tutor rated clear |
| G3 | Learning feels like a guided journey, not a topic list | Visual roadmap with unlock/progress |
| G4 | Learners *do*, not just read | Live playground on every authored topic |
| G5 | Help is always one tap away | Context-aware AI mentor on every lesson |
| G6 | It feels premium, playful, alive | Motion, gradients, micro-interactions |

## 4. Non-Goals (explicitly out of MVP scope)

- ❌ Project-based learning / capstone projects
- ❌ Multiple learning tracks (KMP, Compose Multiplatform, etc.)
- ❌ Career paths / job prep
- ❌ Advanced social features (forums, following, feeds)
- ❌ Real on-device Kotlin compilation (see Architecture: simulated preview for MVP)

These are tracked in the future-expansion backlog (doc 10) but must not bloat the MVP.

## 5. Target users

See `02-personas.md`. Primary: **the absolute beginner.** Secondary: the rusty returner and the curious cross-platform dev.

## 6. Core features (MVP)

1. **Visual Roadmap** — a winding journey of 13 stages, beginner → advanced. Stages unlock as you complete the previous one. Always shows where you are, what's done, what's next, and distance to mastery.
2. **Lesson Experience** — every topic delivers: learning objective, beginner explanation, "explain like I'm 10", real-world analogy, interactive visual metaphor, annotated code example, live playground, common mistakes, quick quiz, and an AI tutor pre-loaded with the topic.
3. **AI Mentor ("Quest")** — context-aware tutor that already knows the current stage, lesson, objective, and the learner's completed lessons. One-tap prompts (explain simply, like I'm 10, real-world example, why, visual analogy, practice questions, fix my code). Friendly teacher tone, never docs-speak. Provider-agnostic, free by default.
4. **Interactive Playground** — live editor + real-time simulated preview of the Compose teaching subset, with working interactivity (buttons, state), friendly error messages, and an "Ask AI" debug handoff.
5. **Visual Learning System** — animated, interactive metaphors for hard ideas (state = memory box, recomposition = LEGO, navigation = rooms, etc.).
6. **Progress & Rewards** — XP, per-stage and overall progress, completion checks, unlocking, and a "Compose Master" summit. Persisted locally (MVP) → account-based (next).

## 7. Content scope (MVP)

The **full 13-stage roadmap is present and navigable** with objectives + child-level explanations for every topic. **Three flagship lessons are fully authored** end-to-end as the gold standard and template:

- *What is Jetpack Compose?* (Fundamentals)
- *Column* (Layouts)
- *remember & mutableStateOf* (State)

Remaining lessons render a "full lesson coming soon" state **with the AI tutor fully functional**, so they're useful immediately and trivially upgradeable to full lessons by filling the same content shape (`src/data/types.ts`).

## 8. Key requirements

- **Beginner-first everywhere.** No assumed knowledge. Jargon is always introduced gently.
- **Four ways to learn each idea**: explain / like-I'm-10 / analogy / visual.
- **Instant feedback.** Playground updates live; quizzes explain every answer.
- **Always-available mentor.** Present on every lesson, contextual by default.
- **Delightful, never distracting.** Motion supports comprehension and reward.
- **Responsive.** Works great on laptop and tablet; usable on phone.

## 9. Metrics

- **Activation:** % of new visitors who complete Lesson 1.
- **Comprehension:** quiz first-try pass rate; "Like I'm 10" usage.
- **Engagement:** lessons completed per session; playground runs per lesson; mentor messages per lesson.
- **Progression:** stage unlock rate; D1/D7 return.
- **Delight:** qualitative "this was fun/clear" feedback.

## 10. Release plan

- **M0 (this build):** Roadmap, 3 flagship lessons, mentor, playground, visual system, design system, docs. Local progress.
- **M1:** Accounts + cloud progress; author 100% of fundamentals + layouts + modifiers + state.
- **M2:** Streaming mentor; richer playground subset; more visual metaphors.
- **M3:** Full roadmap authored; analytics dashboard; shareable achievements.
