# Visual Learning System

## Why

Abstract Compose ideas are where beginners drown. The cure isn't more words — it's a **picture you can touch**. Every hard concept gets an **interactive metaphor** that carries the mental model so the prose can stay short. Goal: *deep understanding, not memorization.*

## The metaphor library

Implemented in `src/components/VisualMetaphor.tsx`, driven by `VisualSpec.metaphor`:

| Concept | Metaphor | What the learner sees / does |
|---|---|---|
| **State** | 🧠 **Memory box** | A box showing a number; tap "Change the box" and the displayed value updates instantly — *state changes → UI redraws.* |
| **Recomposition** | 🧱 **LEGO rebuild** | Tap "Recompose (add brick)" — a new brick appears while existing bricks stay put. *Only what changed is rebuilt.* |
| **Navigation** | 🚪 **Rooms** | Buttons switch between Home/Profile/Settings rooms with a slide animation. *Navigating = walking between screens.* |
| **Column** | 📚 **Stack** | Cards animate in, stacking top→bottom. *Children line up vertically, in code order.* |
| **ViewModel** | 👔 **Manager** | A manager figure holds the info so the screen stays simple. |
| **State Hoisting** | 🧸 **Shared toys** | Two children share one toy box a grown-up holds. *Lift state up to share it.* |
| **MVVM** | 🍽️ **Restaurant** | Waiter (UI) ↔ kitchen (ViewModel) ↔ pantry (data). |
| **Composable fn** | 📐 **Blueprint** | You write a blueprint; Compose builds the real thing. |

Each metaphor renders inside a labeled "🎨 Visual idea" card with a title and one-line caption, on a soft gradient surface. The interactive ones use Framer Motion so the *behavior* (not just the picture) teaches the idea.

## Design rules for metaphors

1. **Interactive beats static.** If the concept is about *change* (state, recomposition, navigation), the learner must be able to *trigger* the change and watch it.
2. **One idea per metaphor.** Don't overload. A metaphor that tries to show three things shows none.
3. **Everyday objects only.** Boxes, toys, rooms, LEGO, restaurants, pancakes — things a 10-year-old already understands.
4. **Consistent across the platform.** The same metaphor appears in the lesson card, the "Like I'm 10" copy, and the AI mentor's `aiContext` — so every channel reinforces the *same* picture.
5. **Friendly, soft, alive.** Rounded shapes, gradients, gentle motion. Never clinical.

## How a metaphor flows through the system

```
data/roadmap.ts  →  lesson.visual: { metaphor: "memory-box", title, caption }
                 →  lesson.child:   uses the SAME box image in words
                 →  lesson.aiContext: tells Quest to reuse the box metaphor
VisualMetaphor.tsx →  draws the interactive box
```

This single-source consistency is the system's superpower: text, picture, and AI all tell **one** story.

## Extending

To add a metaphor: add a case to `VisualMetaphor.tsx`, add its key to the `VisualSpec` union in `types.ts`, and reference it from a lesson's `visual` field. Keep it interactive where the concept involves change.
