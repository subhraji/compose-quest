# Implementation Roadmap

## Status legend
✅ done in this build · 🔜 next · 🧭 later

## Milestone 0 — Foundation & vision *(this build)* ✅

- ✅ Design docs (PRD, personas, learning experience, roadmap, AI mentor, visual system, wireframes, design system, architecture, this roadmap)
- ✅ Next.js + TS + Tailwind + Framer Motion scaffold; design tokens & component layer
- ✅ Full 13-stage roadmap data model (~55 topics) — all navigable
- ✅ Visual roadmap journey with progress, unlocking, XP, summit
- ✅ Landing page (hero with live counter, features, how-it-works, CTA)
- ✅ Lesson experience: 4-way explanation tabs, visual metaphor, annotated code, playground, common mistakes, quiz, completion + nav
- ✅ 3 flagship lessons fully authored (What is Compose, Column, remember/mutableStateOf)
- ✅ AI mentor "Quest" — context-aware, provider-agnostic, free Gemini default, offline fallback
- ✅ Interactive playground — Compose-subset parser + live interactive preview
- ✅ Visual learning system (interactive metaphors)
- ✅ Local progress persistence (zustand + localStorage)
- ✅ Production build verified (59 routes) + runtime smoke test

## Milestone 1 — Accounts & full core content 🔜

1. **Auth + cloud progress**: NextAuth/Clerk/Supabase; migrate zustand store to per-user Postgres; sync XP/completions.
2. **Author all of Stages 1–4** (Fundamentals, Layouts, Modifiers, State) to the flagship standard using the existing `Lesson` shape.
3. **Streaming AI** responses for instant feel; rate limiting + abuse protection on `/api/mentor`.
4. **Expand playground subset**: more modifiers (`weight`, `clip` shapes), `LazyColumn` items, basic theming.
5. **Analytics**: PostHog funnel (activation → lesson complete → stage unlock); D1/D7 retention.

## Milestone 2 — Depth & delight 🧭

1. Author Stages 5–8 (Lists, Navigation, Side Effects, Architecture).
2. More visual metaphors (hoisting toys, MVVM restaurant, ViewModel manager — animated/interactive).
3. AI: proactive nudges, on-demand quiz generation, parser-aware code debugging.
4. Achievements & shareable badges; streaks.
5. Move content to a CMS (Sanity/Contentlayer) — same content contract, editor-friendly.

## Milestone 3 — Completeness & polish 🧭

1. Author Stages 9–13 (Networking, Storage, Animations, Performance, Advanced).
2. Optional **backend Kotlin/Compose compiler** service for authentic preview (swap-in behind the existing playground UI).
3. Accessibility audit (screen-reader pass, reduced-motion, full keyboard).
4. i18n groundwork.
5. Performance pass + image/asset CDN.

## Future expansion (post-MVP, intentionally deferred)

- Project-based learning / capstones
- Multiple tracks (Compose Multiplatform, KMP, Wear/TV)
- Career paths
- Social features (cohorts, leaderboards, sharing)

## How to extend content (the key leverage point)

Every lesson is just data conforming to `Lesson` in `src/data/types.ts`. To turn a "coming soon" topic into a full lesson:

1. Open `src/data/roadmap.ts`, find the `stub(...)` for the topic.
2. Replace it with a full `Lesson` object: fill `beginner`, `analogy`, `visual`, `example`, `playground`, `mistakes`, `quiz`, `aiContext`, and set `authored: true`.
3. That's it — the lesson page, playground, mentor context, and roadmap badge all update automatically.

No component changes are needed to author the remaining ~50 lessons — the platform is built to scale by content, not code.

## Getting started (developer)

```bash
cp .env.example .env        # optional: add a free GEMINI_API_KEY
npm install
npm run dev                 # http://localhost:3000
```
The app runs fully without any API key (the AI mentor uses a friendly fallback).
