# Roadmap Structure

The roadmap is the spine of Compose Quest: a single, visual, beginner→advanced journey. 13 stages, ~55 topics. Source of truth: `src/data/roadmap.ts`.

## Visual model

A vertical **winding path**. Each **stage** is a large gradient node with an emoji and a per-stage progress bar; its **lessons** hang off a dashed connector as node-dots that show state (✓ done · ▶ available · 🔒 locked). The path ends at a **🏆 Compose Master** summit flag.

## Stages & topics

### 1. 🌱 Compose Fundamentals
Your first steps and the pieces you'll use everywhere.
- What is Jetpack Compose? *(flagship, fully authored)*
- Composable Functions · Text · Button · Image · Icon · Material Design Basics

### 2. 📐 Layouts
Arranging things on screen.
- Column *(flagship, fully authored)*
- Row · Box · Spacer · Alignment · Arrangement

### 3. 🛠️ Modifiers
The chain that styles and positions everything.
- Padding · Size · Background · Border · Clickable · Weight · Offset

### 4. 🧠 State Management
Give the app memory so it can react. *(the big one)*
- remember & mutableStateOf *(flagship, fully authored)*
- State · State Hoisting · Recomposition

### 5. 📜 Lists
Scrollable collections, efficiently.
- LazyColumn · LazyRow · Grid Layouts

### 6. 🧭 Navigation
Moving between screens.
- NavHost · Routes · Passing Arguments

### 7. 🌀 Side Effects
Running code at the right moment.
- LaunchedEffect · SideEffect · DisposableEffect · rememberCoroutineScope

### 8. 🏛️ Architecture
Keeping big apps clean.
- ViewModel · StateFlow · SharedFlow · MVVM

### 9. 🌐 Networking
Talking to the internet.
- Retrofit · API Integration

### 10. 💾 Local Storage
Saving data on the device.
- Room Database · DataStore

### 11. 🎬 Animations
Making the UI feel alive.
- AnimatedVisibility · animate*AsState · Transitions · Gesture Animations

### 12. ⚡ Performance
Fast, smooth, fewer wasted redraws.
- Stability · Recomposition Optimization · Best Practices

### 13. 🚀 Advanced Compose
Build anything.
- Custom Layouts · Canvas · Custom Components · Design Systems

## Per-topic content contract

Every topic is authored against one shape (`Lesson` in `src/data/types.ts`) so the experience is consistent and the roadmap is trivially extendable:

| Field | Purpose |
|---|---|
| `objective` | The one capability the learner gains. |
| `beginner` | Clear plain-language explanation. |
| `child` | "Explain like I'm 10" version. |
| `analogy` | A real-world analogy. |
| `visual` | An interactive metaphor (`VisualSpec`). |
| `example` | Annotated, read-only code with an explanation. |
| `playground` | Starter code the learner edits + previews live. |
| `mistakes` | Common pitfalls as ✗/✓ pairs + plain-language note. |
| `quiz` | Quick check; every answer is explained. |
| `aiContext` | Hidden teaching notes handed to the AI mentor. |
| `authored` | `true` once all of the above are filled. |

## Unlock logic

`useStageUnlocked(i)` → Stage 0 is always open; Stage *i* unlocks when **every** lesson in Stage *i-1* is complete. The roadmap still renders locked stages (greyed) so learners can see the whole adventure ahead — motivation, not a wall.

## Why this order

The sequence guarantees each stage depends only on earlier ones. Notably, **State** comes only after the learner can comfortably *create* (Fundamentals) and *arrange* (Layouts) UI and *style* it (Modifiers) — so the hardest beginner concept lands on solid ground and gets the deepest treatment.
