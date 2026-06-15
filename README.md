# 🧭 Compose Quest

> **Learn Jetpack Compose Like an Adventure**

The most beginner-friendly Jetpack Compose learning platform — a visual, interactive, AI-guided journey from your very first Composable to advanced UI. Not docs. Not a course site. An adventure.

![stack](https://img.shields.io/badge/Next.js-14-black) ![ts](https://img.shields.io/badge/TypeScript-blue) ![tailwind](https://img.shields.io/badge/Tailwind-38bdf8) ![motion](https://img.shields.io/badge/Framer_Motion-ff69b4)

## ✨ What's inside

- **Visual roadmap** — 13 stages, ~55 topics, beginner → advanced, with progress, unlocking & XP.
- **Lesson experience** — every concept explained 4 ways (plain · *like I'm 10* · analogy · interactive visual), an annotated code example, a live playground, common mistakes, and a quick quiz.
- **AI mentor "Quest"** — a friendly tutor that already knows your current lesson and progress. Free by default (Google Gemini), swappable, with a graceful offline fallback.
- **Interactive playground** — edit real Compose code and watch a live, *interactive* preview update instantly (buttons & state genuinely work).
- **Visual learning system** — abstract ideas as things you can touch: state = memory box, recomposition = LEGO, navigation = rooms…

## 🚀 Quick start

```bash
cp .env.example .env     # optional — add a free GEMINI_API_KEY for the full tutor
npm install
npm run dev              # → http://localhost:3000
```

> The app runs **fully without any API key** — the AI mentor falls back to friendly canned guidance.

### Enable the free AI tutor (optional)

1. Get a free key at <https://aistudio.google.com/app/apikey>.
2. Put it in `.env`: `GEMINI_API_KEY=your_key` (provider defaults to `gemini`).
3. Restart `npm run dev`.

Swap providers anytime with `AI_PROVIDER=gemini|groq|openai|anthropic` (see `.env.example`).

## 🧱 Tech

Next.js 14 (App Router) · TypeScript · Tailwind · Framer Motion · Zustand · provider-agnostic AI.

## 🗺️ Project layout

```
src/app        landing · /roadmap · /lesson/[slug] · /api/mentor
src/components  RoadmapJourney · LessonView · AiMentor · Playground ·
               ComposePreview · VisualMetaphor · Quiz · CodeBlock · SiteHeader
src/data       types.ts (content contract) · roadmap.ts (all content)
src/lib        ai.ts · composeParser.ts · progress.ts · utils.ts
docs/          10 design & product documents (PRD → implementation roadmap)
```

## ➕ Add a full lesson (no code changes)

Every lesson is data conforming to `Lesson` in `src/data/types.ts`. In `src/data/roadmap.ts`, replace a topic's `stub(...)` with a full `Lesson` (fill `beginner`, `visual`, `example`, `playground`, `mistakes`, `quiz`, `aiContext`, set `authored: true`). The page, playground, mentor, and roadmap badge update automatically.

## ⚠️ Honest note on the playground

Real Jetpack Compose (Kotlin) can't compile/render in a browser without a backend Kotlin compiler. The MVP uses a **simulated visual preview** — a small parser (`src/lib/composeParser.ts`) that renders the Compose *teaching subset* live, including working state/interactivity. It's honestly scoped and swappable for a real compiler backend later. See `docs/09-technical-architecture.md`.

## 📚 Docs

See [`docs/`](./docs) — PRD, personas, learning experience, roadmap structure, AI mentor, visual learning system, wireframes, design system, technical architecture, and implementation roadmap.
