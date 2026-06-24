import type { Lesson } from "../types";

// ════════════════════════════════════════════════════════════
//  PERFORMANCE — fewer wasted redraws
// ════════════════════════════════════════════════════════════

export const lessonStability: Lesson = {
  id: "stability",
  slug: "stability",
  title: "Stability",
  emoji: "🧱",
  estMinutes: 10,
  authored: true,
  objective: "Help Compose know what hasn't changed.",
  beginner:
    "Compose skips re-running a Composable when its inputs are **stable** and unchanged. A type is **stable** if Compose can trust that equal instances stay equal — e.g. primitives, `String`, and `data class`es made of stable, read-only (`val`) properties. **Unstable** inputs (mutable classes, `var` properties, `List`/`Map` interfaces) force needless recompositions because Compose can't be sure they didn't change.",
  child:
    "Stability is labeling boxes 🧱 so Compose knows which ones didn't change. If a box is clearly marked 'unchanged', Compose skips it instead of opening it up again.",
  analogy:
    "Think of a teacher grading homework. If a student writes neatly and signs each page (stable), the teacher trusts unchanged pages and skips re-reading them. Messy, unsigned pages (unstable) have to be re-checked every time.",
  visual: {
    metaphor: "generic",
    title: "Trust what hasn't changed",
    caption: "Stable inputs let Compose skip recomposition; unstable ones force it to re-run.",
  },
  example: {
    code: `// ✅ stable: immutable data class of stable types
data class User(val id: Int, val name: String)

// ⚠️ unstable: mutable property + List interface
class Cart {
    var items: List<String> = emptyList()
}`,
    explain:
      "User is stable — all val, all stable types — so a Composable taking a User can be skipped when it hasn't changed. Cart is unstable (a var and a List interface), so Compose can't safely skip Composables that read it.",
  },
  mistakes: [
    {
      wrong: `data class Settings(var darkMode: Boolean)  // ⚠️ var → unstable`,
      right: `data class Settings(val darkMode: Boolean)  // ✅ val → stable`,
      note: "Prefer immutable (val) properties in classes you pass to Composables so Compose can treat them as stable and skip work.",
    },
  ],
  quiz: [
    {
      q: "What does it mean for a type to be 'stable' in Compose?",
      options: [
        "It never crashes",
        "Compose can trust that equal instances stay equal, so it can skip recomposition",
        "It loads from the network",
        "It uses less storage",
      ],
      answer: 1,
      explain: "Stability lets Compose skip re-running Composables whose stable inputs haven't changed.",
    },
    {
      q: "Which is most likely UNSTABLE?",
      options: [
        "An Int",
        "A String",
        "A class with a mutable var property",
        "A data class of vals",
      ],
      answer: 2,
      explain: "Mutable properties make a class unstable because its contents can change unnoticed.",
    },
  ],
  aiContext:
    "The learner is learning Stability. Use the 'labeled boxes' and 'teacher trusting signed homework' analogies. Key: stable = primitives/String/immutable data classes of vals; unstable = mutable classes, var props, List/Map interfaces. Stability enables skipping. They know recomposition.",
};

export const lessonRecompositionOptimization: Lesson = {
  id: "recomposition-optimization",
  slug: "recomposition-optimization",
  title: "Recomposition Optimization",
  emoji: "🎯",
  estMinutes: 11,
  authored: true,
  objective: "Avoid unnecessary redraws.",
  beginner:
    "To keep Compose fast, **scope state reads narrowly** so only small Composables recompose, **hoist state** to the lowest common level, use **`key()`** in lists for stable identity, and **defer frequently-changing reads** (e.g. read an animating value with a lambda) so the read happens in a later phase. Use **Layout Inspector / recomposition counts** to find the hot spots before optimizing.",
  child:
    "This is only repainting the wall that got dirty 🎯, not the whole house. You find exactly what changed and redraw just that, leaving everything else untouched.",
  analogy:
    "Think of editing a document. A good editor only re-renders the paragraph you typed in, not the whole page. Recomposition optimization keeps Compose's 'redraw' as small and targeted as possible.",
  visual: {
    metaphor: "lego",
    title: "Redraw less, redraw smaller",
    caption: "Narrow state reads, hoist state, key() lists, defer hot reads — then measure.",
  },
  example: {
    code: `// ⚠️ reading count high up recomposes the whole Column
@Composable
fun Screen(count: Int) {
    Column {
        ExpensiveHeader()
        Text("Count: $count")  // pull the read into its own small Composable
    }
}

// ✅ isolate the changing read
@Composable
fun CountLabel(count: () -> Int) {
    Text("Count: \${count()}")   // deferred read; only this recomposes
}`,
    explain:
      "Reading fast-changing state in a big Composable recomposes everything inside it. Isolating the read in a small Composable (and even deferring it behind a lambda) limits recomposition to just that label.",
  },
  mistakes: [
    {
      wrong: `// reading an animating value directly at the top of a big Composable  // ❌`,
      right: `// isolate it in a small Composable, or read it via a lambda (deferred)  // ✅`,
      note: "Reading frequently-changing state high in the tree recomposes large subtrees. Push the read down or defer it.",
    },
  ],
  quiz: [
    {
      q: "A good first step before optimizing recomposition is to…",
      options: [
        "Guess which Composable is slow",
        "Measure with Layout Inspector / recomposition counts",
        "Delete all state",
        "Disable animations",
      ],
      answer: 1,
      explain: "Measure first to find the real hot spots instead of optimizing blindly.",
    },
    {
      q: "How does narrowing a state read help performance?",
      options: [
        "It changes the color",
        "Only the small Composable that reads the state recomposes, not a large subtree",
        "It removes the state",
        "It makes the app offline",
      ],
      answer: 1,
      explain: "Reading state in a small, focused Composable limits recomposition to that area.",
    },
  ],
  aiContext:
    "The learner is learning Recomposition Optimization. Use the 'repaint only the dirty wall' analogy. Techniques: narrow/defer state reads (lambda reads), hoist state, key() in lists, MEASURE first (Layout Inspector / recomposition counts). They know recomposition and stability.",
};

export const lessonBestPractices: Lesson = {
  id: "best-practices",
  slug: "best-practices",
  title: "Best Practices",
  emoji: "✅",
  estMinutes: 9,
  authored: true,
  objective: "Habits that keep Compose code clean and fast.",
  beginner:
    "A few habits keep Compose code healthy: keep Composables **small and focused**; make them **stateless** by hoisting state; pass a **`modifier: Modifier = Modifier`** parameter so callers can style them; never do **heavy work in the Composable body** (use ViewModel + effects); prefer **immutable, stable** data; and give list items **stable keys**. Small, pure, predictable Composables are easy to read, test, and fast by default.",
  child:
    "Best practices are good habits ✅ that keep your app speedy and tidy — like keeping your room clean so you can always find your toys and nothing trips you up.",
  analogy:
    "Think of cooking habits: clean as you go, prep ingredients first, taste as you cook. None is dramatic alone, but together they make a kitchen that runs smoothly. These Compose habits do the same for your code.",
  visual: {
    metaphor: "generic",
    title: "Small, stateless, predictable",
    caption: "Hoist state, accept a Modifier param, keep work out of the body, use stable data.",
  },
  example: {
    code: `// ✅ small, stateless, reusable, exposes a modifier
@Composable
fun PrimaryButton(
    text: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    Button(onClick = onClick, modifier = modifier) {
        Text(text)
    }
}`,
    explain:
      "PrimaryButton owns no state, takes its data and action as parameters, and accepts a modifier so callers can size/position it. That makes it reusable, testable, and easy to reason about.",
  },
  mistakes: [
    {
      wrong: `@Composable
fun Card() {
    val data = loadFromNetwork()  // ❌ heavy work in the body`,
      right: `// ✅ load in a ViewModel/effect; the Composable just renders state`,
      note: "Composables can re-run often. Keep network/database/heavy work out of the body — do it in a ViewModel or an effect.",
    },
  ],
  quiz: [
    {
      q: "Why expose a `modifier: Modifier = Modifier` parameter?",
      options: [
        "It's required to compile",
        "So callers can size, pad, and position your Composable",
        "To make text bold",
        "To store state",
      ],
      answer: 1,
      explain: "Accepting a modifier lets the caller customize layout/styling, making the component reusable.",
    },
    {
      q: "Where should heavy work (network, DB) go?",
      options: [
        "Directly in the Composable body",
        "In a ViewModel or an effect, not the Composable body",
        "In a Modifier",
        "In the Manifest",
      ],
      answer: 1,
      explain: "Composables re-run frequently, so heavy work belongs in a ViewModel or a keyed effect.",
    },
  ],
  aiContext:
    "The learner is learning Compose Best Practices. Use the 'good habits / clean kitchen' analogy. Habits: small stateless Composables, hoist state, accept modifier param, no heavy work in body, immutable/stable data, stable list keys. Synthesizes prior lessons (state hoisting, ViewModel, stability). No live preview.",
};

export const performanceLessons = {
  lessonStability,
  lessonRecompositionOptimization,
  lessonBestPractices,
};
