# Wireframes

ASCII low-fidelity wireframes for the three core screens. These match what's built in `src/app`.

## Global header (all pages)

```
┌───────────────────────────────────────────────────────────────────────┐
│ ◳ ComposeQuest        Roadmap   [▓▓▓▓░░░ 4/55]   🔥 80 XP   ✨ Continue │
└───────────────────────────────────────────────────────────────────────┘
```
Sticky, blurred glass. Always shows overall progress + XP, so orientation is constant.

## 1. Landing (`/`)

```
┌───────────────────────────────────────────────────────────────────────┐
│  ✨ Learn Jetpack Compose like an adventure                             │
│                                              ┌───────────────────────┐  │
│  Build Android UI.                           │ ●●●  Counter.kt — live │  │
│  Feel like a kid again.        (gradient)    │                       │  │
│                                              │   You tapped          │  │
│  The most beginner-friendly way to learn     │   3 times             │  │
│  Jetpack Compose. Visual, interactive,       │   [ Tap me! ]  ← works│  │
│  AI-guided.                                  └───────────────────────┘  │
│  [ Start the quest → ] [ Try a free lesson ]       floating "tap →"     │
│  🌱 Zero experience   🆓 Free AI tutor                                  │
├───────────────────────────────────────────────────────────────────────┤
│  Not a docs site. An adventure.                                         │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐                           │
│  │ 🗺 Guided│ │ 🤖 AI   │ │ 🪄 Live │ │ 👁 Visual│   (hover-lift cards)   │
│  │ journey │ │ tutor   │ │ playgr. │ │ metaph. │                        │
│  └────────┘ └────────┘ └────────┘ └────────┘                           │
├───────────────────────────────────────────────────────────────────────┤
│  How every lesson works   (gradient panel)                             │
│  [1 pick up] [2 learn 4 ways] [3 try it] [4 prove it + XP]             │
├───────────────────────────────────────────────────────────────────────┤
│            🏆  Your Compose journey starts now.  [ Open the roadmap → ] │
└───────────────────────────────────────────────────────────────────────┘
```

## 2. Roadmap (`/roadmap`)

```
┌───────────────────────────────────────────────────────────────────────┐
│                 🧭 Your journey                                         │
│              The Compose Roadmap                                        │
│        [▓▓▓░░░░░░░░░░░░░░] 4/55 · 7%        reset progress              │
│                                                                         │
│   ╔════╗  Compose Fundamentals          complete ✓                     │
│   ║ 🌱 ║  Your first steps…             [▓▓▓▓▓▓▓] 7/7                   │
│   ╚════╝                                                                │
│     │   ✓── ✨ What is Jetpack Compose?      6 min  ★ full lesson       │
│     │   ✓── 🧩 Composable Functions          8 min                      │
│     │   ▶── 🔤 Text                           8 min                      │
│     ┊   ○── 🔘 Button …                                                 │
│   ╔════╗  Layouts                                                       │
│   ║ 📐 ║  Arrange things…                [▓▓░░░░░] 1/6                   │
│   ╚════╝                                                                │
│     │   ▶── 📚 Column                         9 min  ★ full lesson       │
│     ┊   🔒── ➡️ Row (locked until prev stage done)                       │
│        ⋮                                                                 │
│   ╔════╗  (locked stages shown greyed — the whole adventure is visible) │
│   ║🔒🚀║  Advanced Compose                                              │
│   ╚════╝                                                                 │
│              🏆  Compose Master                                          │
└───────────────────────────────────────────────────────────────────────┘
```
Node states: `✓` done · `▶` available · `🔒` locked. Stage node turns into a ★ when fully complete.

## 3. Lesson (`/lesson/[slug]`)

```
┌───────────────────────────────────────────────────────────────────────┐
│ Roadmap / 🧠 State Management                                           │
│ 🧠 remember & mutableStateOf — giving your UI memory                    │
│ 🎯 Store changing values…   12 min   [completed ✓]                      │
├──────────────────────────────────────────┬────────────────────────────┤
│ MAIN COLUMN                               │  AI MENTOR  (sticky)        │
│ ┌──────────────────────────────────────┐ │ ┌────────────────────────┐ │
│ │ [Explain it][Like I'm 10][Real-world]│ │ │ 🎓 Quest · your AI tutor│ │
│ │  …explanation text…                  │ │ │ knows you're on "…"     │ │
│ └──────────────────────────────────────┘ │ │                         │ │
│ ┌── 🎨 Visual idea ─────────────────────┐ │ │  👋 Hi! I'm Quest…      │ │
│ │  [ memory box: 3 ]                    │ │ │                         │ │
│ │  ( Change the box → UI redraws )      │ │ │  …chat bubbles…         │ │
│ └──────────────────────────────────────┘ │ │                         │ │
│ ✨ See it in code  [ annotated CodeBlock ]│ │ [Explain simply][Like 10]│ │
│ 🛠 Playground  ┌─editor─┬─live preview─┐  │ │ [Real example][Why?] …  │ │
│               │ code   │  [ Tap me! ] │  │ │ ┌─────────────────┐ ▶  │ │
│               └────────┴──────────────┘  │ │ │ Ask Quest…      │     │ │
│ ⚠ Watch out  ✗ wrong | ✓ right           │ └────────────────────────┘ │
│ 🧠 Quick quiz  ( ) ( ) (•) ( )            │                            │
│ [← Previous]  [✓ Mark complete +20 XP] [Next →]                        │
└──────────────────────────────────────────┴────────────────────────────┘
```

### Responsive
- **Desktop (≥1024px):** two columns; mentor sticky on the right.
- **Tablet/phone:** single column; mentor stacks below the lesson; playground editor/preview stack vertically.

### Non-authored lesson
Same header + a friendly "full lesson coming soon" card showing the child-level idea — **with the AI mentor fully live**, so the page is useful immediately.
