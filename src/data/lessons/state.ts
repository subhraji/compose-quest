import type { Lesson } from "../types";

// ════════════════════════════════════════════════════════════
//  STATE MANAGEMENT
//  (remember & mutableStateOf is the flagship lesson in roadmap.ts.)
// ════════════════════════════════════════════════════════════

export const lessonState: Lesson = {
  id: "state",
  slug: "state",
  title: "State",
  emoji: "💡",
  estMinutes: 9,
  authored: true,
  objective: "Understand what state is and why UI depends on it.",
  beginner:
    "**State** is any value that can **change over time** and that your UI cares about — a counter, whether a switch is on, the text in a field, a loading flag. In Compose, the UI is a *function of state*: describe what the screen should look like for the current state, and when the state changes, Compose redraws to match. You don't manually update widgets — you change the state and the UI follows.",
  child:
    "State is what your app remembers right now 💡 — like the score in a game. When the score changes, the scoreboard changes too, all by itself.",
  analogy:
    "Think of a thermostat display. The temperature is the state; the number on the screen always shows whatever that state currently is. Change the temperature and the display updates — you never repaint the digits yourself.",
  visual: {
    metaphor: "memory-box",
    title: "UI = a picture of the current state",
    caption: "When state changes, Compose redraws the parts that depend on it.",
  },
  example: {
    code: `@Composable
fun Toggle() {
    var isOn by remember { mutableStateOf(0) }
    Column {
        Text("Switch is: $isOn")
        Button(onClick = { isOn = 1 }) {
            Text("Turn on")
        }
    }
}`,
    explain:
      "isOn is state. The Text describes the screen for the current value; tapping the button changes the state, and Compose redraws the Text automatically.",
  },
  playground: `@Composable
fun Toggle() {
    var count by remember { mutableStateOf(0) }
    Column {
        Text("State value: $count")
        Button(onClick = { count++ }) {
            Text("Change state")
        }
    }
}`,
  mistakes: [
    {
      wrong: `// updating a widget directly
label.text = "new"   // ❌ not how Compose works`,
      right: `var label by remember { mutableStateOf(0) }  // ✅ change state, UI follows`,
      note: "In Compose you don't poke widgets directly. You change state, and the UI re-renders from it.",
    },
  ],
  quiz: [
    {
      q: "What is 'state' in Compose?",
      options: [
        "The app's file size",
        "A value that can change and that the UI depends on",
        "A type of layout",
        "The app's color theme",
      ],
      answer: 1,
      explain: "State is changeable data the UI reads; when it changes, the UI updates.",
    },
    {
      q: "In Compose, how does the screen update when data changes?",
      options: [
        "You manually edit each widget",
        "You change the state and Compose redraws from it",
        "You restart the app",
        "It never updates",
      ],
      answer: 1,
      explain: "UI is a function of state — change the state and Compose recomposes the affected UI.",
    },
  ],
  aiContext:
    "The learner is learning the concept of State (building on remember/mutableStateOf). Use the 'scoreboard' and 'thermostat display' analogies. Core idea: UI = function of state; change state, UI follows. They already know remember + mutableStateOf, Column, Button, Text.",
};

export const lessonStateHoisting: Lesson = {
  id: "state-hoisting",
  slug: "state-hoisting",
  title: "State Hoisting",
  emoji: "🪁",
  estMinutes: 11,
  authored: true,
  objective: "Move state up so components can share it.",
  beginner:
    "**State hoisting** means moving state **out** of a Composable and up to its caller, then passing the value **down** as a parameter and changes **up** through a callback (`onValueChange`). This makes the child **stateless** — easy to reuse and test — while a single parent owns the truth. The pattern is: `value: T` in, `onValueChange: (T) -> Unit` out.",
  child:
    "State hoisting is like two kids sharing one toy box 🪁 that a grown-up holds. Neither kid keeps their own — the grown-up keeps it so both can use the same toys.",
  analogy:
    "Think of a TV remote. The TV doesn't store 'what channel you want' — the remote (parent) holds the decision and tells the TV (child) what to show. The child just displays what it's given and reports button presses back up.",
  visual: {
    metaphor: "memory-box",
    title: "State lives in the parent",
    caption: "Value flows down as a parameter; change events flow up through a callback.",
  },
  example: {
    code: `// Stateless child: owns nothing
@Composable
fun Counter(count: Int, onIncrement: () -> Unit) {
    Button(onClick = onIncrement) {
        Text("Count: $count")
    }
}

// Parent owns the state and shares it
@Composable
fun Screen() {
    var count by remember { mutableStateOf(0) }
    Counter(count = count, onIncrement = { count++ })
}`,
    explain:
      "Counter has no state of its own — it receives count and reports taps via onIncrement. The parent Screen owns the state, so it could share the same count with other components too.",
  },
  mistakes: [
    {
      wrong: `@Composable
fun Counter() {
    var count by remember { mutableStateOf(0) }  // ❌ trapped inside
}`,
      right: `@Composable
fun Counter(count: Int, onInc: () -> Unit) { }    // ✅ hoisted, reusable`,
      note: "If state lives inside the child, no one else can read or change it. Hoist it up so it can be shared and tested.",
    },
  ],
  quiz: [
    {
      q: "What does state hoisting mean?",
      options: [
        "Deleting all state",
        "Moving state up to the caller and passing value down + events up",
        "Storing state on a server",
        "Making state load faster",
      ],
      answer: 1,
      explain: "Hoisting lifts state to the parent; the child takes a value parameter and an onChange callback.",
    },
    {
      q: "What is the typical hoisting signature for a child?",
      options: [
        "value: T and onValueChange: (T) -> Unit",
        "Only a color parameter",
        "No parameters at all",
        "A database connection",
      ],
      answer: 0,
      explain: "Value flows down (value: T), change events flow up (onValueChange callback).",
    },
  ],
  aiContext:
    "The learner is learning State Hoisting. Use the 'shared toy box' and 'TV remote' analogies. Key pattern: value down as a parameter, events up via callback; child becomes stateless and reusable. They know state, remember/mutableStateOf, Composable parameters.",
};

export const lessonRecomposition: Lesson = {
  id: "recomposition",
  slug: "recomposition",
  title: "Recomposition",
  emoji: "🔁",
  estMinutes: 9,
  authored: true,
  objective: "Understand how Compose redraws when state changes.",
  beginner:
    "**Recomposition** is Compose re-running your Composable functions to update the UI when the state they read changes. Crucially, Compose is **smart**: it only re-runs the parts that actually read the changed state, skipping everything else. Because functions can re-run anytime (and out of order), your Composables should be free of side effects and not rely on how many times they run.",
  child:
    "Recomposition is rebuilding only the LEGO bricks that changed 🔁, not the whole castle. If one window changed color, you only swap that brick — the rest stays put.",
  analogy:
    "Imagine a smart whiteboard that only erases and redraws the word you changed, leaving the rest of the notes untouched. Compose redraws just the bits tied to the changed state.",
  visual: {
    metaphor: "lego",
    title: "Redraw only what changed",
    caption: "When state changes, Compose re-runs just the Composables that read it.",
  },
  example: {
    code: `@Composable
fun Counter() {
    var count by remember { mutableStateOf(0) }
    Column {
        Text("Header never changes")
        Text("Count: $count")   // only this recomposes
        Button(onClick = { count++ }) { Text("Add") }
    }
}`,
    explain:
      "Tapping the button changes count. Only the Text that reads count recomposes; the header Text doesn't need to re-run because it doesn't read any changed state.",
  },
  playground: `@Composable
fun Counter() {
    var count by remember { mutableStateOf(0) }
    Column {
        Text("I stay the same")
        Text("Count: $count")
        Button(onClick = { count++ }) { Text("Recompose me") }
    }
}`,
  mistakes: [
    {
      wrong: `var clicks = 0
@Composable
fun Bad() { clicks++  // ❌ side effect on every recomposition }`,
      right: `// keep Composables free of side effects; use state + effects APIs instead`,
      note: "Composables can re-run many times. Don't do work with side effects (counters, network calls) directly in the function body.",
    },
  ],
  quiz: [
    {
      q: "What triggers recomposition?",
      options: [
        "Closing the app",
        "A change to state that a Composable reads",
        "Scrolling only",
        "Nothing — UI never re-runs",
      ],
      answer: 1,
      explain: "When state read by a Composable changes, Compose recomposes that Composable.",
    },
    {
      q: "What's special about how Compose recomposes?",
      options: [
        "It redraws the whole screen every time",
        "It only re-runs the Composables that read the changed state",
        "It recompiles the app",
        "It clears all state",
      ],
      answer: 1,
      explain: "Compose skips unaffected Composables and only re-runs the ones depending on the change.",
    },
  ],
  aiContext:
    "The learner is learning Recomposition. Use the 'LEGO bricks that changed' and 'smart whiteboard' analogies. Key points: only state-reading Composables re-run; keep Composables side-effect free; they can run often/out of order. They know state, remember/mutableStateOf.",
};

export const stateLessons = {
  lessonState,
  lessonStateHoisting,
  lessonRecomposition,
};
