# Technical Architecture

## Stack (MVP — as built)

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 14 (App Router)** + TypeScript | SSG for fast lessons, built-in API routes for the AI proxy, great DX, easy Vercel deploy. |
| Styling | **Tailwind CSS** + custom token layer | Rapid, consistent, themeable design system. |
| Animation | **Framer Motion** | Declarative, high-quality micro-interactions. |
| Icons | **lucide-react** | Friendly, consistent. |
| State (client) | **Zustand** + `persist` | Tiny, simple progress/XP store, localStorage-backed. |
| AI | **Provider-agnostic** (`src/lib/ai.ts`) | Free Gemini default; Groq/OpenAI/Anthropic swappable; offline fallback. |
| Content | **Typed TS data** (`src/data`) | Source of truth; trivially portable to a CMS/DB later. |

## Project structure

```
src/
  app/
    layout.tsx              # root + header + fonts
    page.tsx                # landing
    roadmap/page.tsx        # visual journey
    lesson/[slug]/page.tsx  # SSG lesson route (generateStaticParams)
    api/mentor/route.ts     # AI proxy (keeps keys server-side)
  components/                # SiteHeader, RoadmapJourney, LessonView,
                             # AiMentor, Playground, ComposePreview,
                             # VisualMetaphor, Quiz, CodeBlock
  data/
    types.ts                # Lesson / Stage / VisualSpec content contract
    roadmap.ts              # the full 13-stage roadmap + flagship lessons
  lib/
    ai.ts                   # provider-agnostic mentor + fallback
    composeParser.ts        # tiny Compose-subset parser (playground engine)
    progress.ts             # zustand store, unlock + progress selectors
    utils.ts                # cn()
docs/                       # these 10 design documents
```

## Data flow

```
roadmap.ts ──► RoadmapJourney / LessonView (render content)
            └► MentorContext ──► /api/mentor ──► lib/ai.chat() ──► provider
progress.ts (zustand+persist) ──► header, roadmap unlock, completion, XP
Playground ──► composeParser.parseCompose() ──► ComposePreview (live render)
```

## The playground engine (honest design)

**Constraint:** real Jetpack Compose (Kotlin) cannot compile or render in a browser without a backend Kotlin compiler. For the MVP we chose a **simulated visual preview**:

- `src/lib/composeParser.ts` — a small, forgiving tokenizer + recursive-descent parser for the *teaching subset*: `Text`, `Button`, `Column`, `Row`, `Box`, `Spacer`, `Image`, `Icon`, `Card/Surface`; named args (`text`, `fontSize`, `color`, `fontWeight`, `modifier`, `onClick`); `Modifier` chains (`padding`, `size`, `background`, `border`, `offset`, `fillMax*`…); and **real interactivity** via `remember { mutableStateOf(n) }` + `onClick { x++ }` + string interpolation (`"$x"`).
- `src/components/ComposePreview.tsx` — renders the parse tree to live React/HTML, maps `dp/sp` → px and `Color.*`/`Color(0x…)` → CSS, and wires button clicks to state so counters genuinely work.
- Friendly errors instead of stack traces ("I couldn't find any Composables to draw…").

This delivers the *instant, visual, experiment-driven* feeling the brief demands, honestly scoped. **Upgrade path:** swap `ComposePreview` for a backend route that compiles Kotlin/Compose (e.g. Compose-for-Web / a hosted Kotlin compiler) — the lesson content and editor stay unchanged.

## AI architecture

- Client builds `MentorContext` from the current lesson + completed lessons (from the progress store).
- `POST /api/mentor` runs server-side (keys never reach the browser), builds the system prompt, calls the configured provider, returns `{ reply }`.
- `AI_PROVIDER` env selects the backend; missing key → on-brand fallback. Verified to build and run with **no** key set.

## Future-scalable architecture (M1+)

```
                ┌──────────────┐
  Next.js  ───► │  API routes  │ ──► AI provider (Gemini/Groq/Claude/OpenAI)
  (Vercel)      │  (edge/node) │ ──► Auth (NextAuth/Clerk/Supabase Auth)
                └──────┬───────┘
                       │
                 ┌─────▼──────┐     ┌───────────────┐
                 │  Postgres  │     │  Content: MDX  │
                 │ (Supabase/ │     │  or Sanity CMS │
                 │  Neon)     │     │  (replaces     │
                 │  progress, │     │   data/*.ts)   │
                 │  XP, users │     └───────────────┘
                 └────────────┘
```

| Concern | MVP | Scale plan |
|---|---|---|
| Auth | none (local) | NextAuth / Clerk / Supabase Auth |
| Progress/XP | localStorage (zustand persist) | Postgres (Supabase/Neon) per-user |
| Content | typed TS | CMS (Sanity/Contentlayer/MDX) — same `Lesson` shape |
| AI | server route, sync | streaming, rate-limit, caching, usage metering |
| Deploy | Vercel | Vercel + managed Postgres; CDN for assets |
| Analytics | — | PostHog / Vercel Analytics (funnel: activation→completion) |
| Playground | simulated | optional backend Kotlin compiler service |

## Security & cost

- API keys are server-only (`/api/mentor`); never shipped to client.
- Short max-token budgets keep AI cost minimal; free tier covers MVP.
- Next 14 pinned to a patched release; `.env` git-ignored.
