# Design System

A modern, playful, premium system inspired by Duolingo (delight/progress), Brilliant (interactive understanding), Stripe (polish), Linear (precision), and Apple (restraint). Implemented via Tailwind tokens in `tailwind.config.ts` and component classes in `globals.css`.

## Brand

- **Name:** Compose Quest — wordmark: `Compose` + `Quest` (Quest in brand indigo), with a compass glyph in a gradient tile.
- **Personality:** friendly, encouraging, alive — never clinical or intimidating.

## Color

| Token | Hex | Use |
|---|---|---|
| `quest-500` | `#6366f1` | Primary brand (indigo) |
| `quest-600/700` | `#4f46e5 / #4338ca` | Hover/active, headings accents |
| `spark-500` | `#f59e0b` | XP, achievements, attention-positive |
| `mint-500` | `#10b981` | Success / completed |
| `coral-500` | `#f43f5e` | Mistakes / warnings |
| `ink` | `#0f1226` | Primary text |
| `ink-muted` | `#6b7194` | Secondary text |
| `cloud` | `#f7f8fc` | App background |

**Gradients**
- `quest-gradient` — `135° indigo → violet → pink` (primary buttons, hero accents, mentor header).
- `spark-gradient` — `135° amber → orange` (XP, summit).
- `sky-gradient` — soft vertical wash for visual surfaces.
- Body has two fixed radial gradient glows for depth.

## Typography

- **Sans / Display:** Inter (`--font-sans`). Display weights up to 900 for big friendly headings.
- **Mono:** JetBrains Mono (`--font-mono`) for all code.
- Scale: hero `text-5xl/6xl` black; section `text-3xl/4xl` extrabold; body `text-base/lg`; meta `text-xs/sm`.

## Shape, depth, motion

- **Radii:** generous — cards `rounded-3xl` (2rem), buttons/chips `rounded-2xl`/full. Soft, toy-like.
- **Shadows:** `soft`, `float`, `glow` — all indigo-tinted, never harsh black.
- **Glass:** header and cards use `bg-white/70–90` + `backdrop-blur`.
- **Motion keyframes:** `float` (idle bob), `pop` (entrance), `shimmer`. Framer Motion for interactions.

## Components (class + component layer)

| Primitive | Where | Notes |
|---|---|---|
| `.btn-primary` | globals.css | Gradient, float shadow, tactile `active:scale`. |
| `.btn-ghost` | globals.css | White, indigo border, hover tint. |
| `.chip` | globals.css | Small rounded status/labels (XP, min, tags). |
| `.card` | globals.css | Glassy floating surface, the workhorse container. |
| `.code-surface` / `CodeBlock` | components | Dark code panel + tiny Kotlin highlighter (`.tok-*`). |
| `Playground` | components | Editor + live preview, run/reset/Ask-AI. |
| `VisualMetaphor` | components | Interactive concept illustrations. |
| `Quiz` | components | Choice cards, instant feedback, explanations. |
| `AiMentor` | components | Chat with quick-prompt chips + typing dots. |
| `RoadmapJourney` | components | Winding path, stage nodes, lesson dots. |

## Motion principles

1. **Reward, don't distract.** Motion confirms progress (completion, unlock, XP) and guides attention.
2. **Entrance, not noise.** Cards `whileInView` fade/slide once; idle elements bob gently.
3. **Tactile feedback.** Buttons scale on press; nodes nudge on hover.
4. **Respect comprehension.** Animations during learning (metaphors, preview) demonstrate the *idea*; decorative motion stays subtle.

## Iconography & illustration

- **Icons:** `lucide-react` — friendly, consistent stroke.
- **Emoji** as lightweight, universal illustration for stages/topics/metaphors (zero asset weight, instantly warm).

## Accessibility

- Focus-visible rings (`ring-quest-300`) on interactive elements.
- Color is never the *only* signal (icons + labels accompany state).
- Targets ≥ 40px; readable contrast for text on light surfaces.
- Smooth-scroll + reduced-motion friendly patterns (idle animations are subtle).

## Responsive breakpoints

Tailwind defaults. Key shifts: feature grid 1→2→4 cols; lesson layout 1→2 cols at `lg`; playground editor/preview 1→2 cols at `md`.
