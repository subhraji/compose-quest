import type { Lesson } from "../types";

// ════════════════════════════════════════════════════════════
//  SIDE EFFECTS — running code at the right moment
// ════════════════════════════════════════════════════════════

export const lessonLaunchedEffect: Lesson = {
  id: "launchedeffect",
  slug: "launchedeffect",
  title: "LaunchedEffect",
  emoji: "🚀",
  estMinutes: 10,
  authored: true,
  objective: "Run a task when a Composable enters the screen.",
  beginner:
    "**`LaunchedEffect(key)`** runs a **coroutine** when a Composable first appears, perfect for one-time work like fetching data or starting a timer. It takes one or more **keys**: while the key stays the same it won't restart, but if a key changes the effect cancels and re-runs. Use `LaunchedEffect(Unit)` for 'run once when shown'.",
  child:
    "LaunchedEffect is starting a timer the moment you walk into a room 🚀. As soon as the screen appears, it kicks off the job — and if you leave, the job is cancelled automatically.",
  analogy:
    "Think of motion-sensor lights. The instant you step into the hallway they switch on (the effect runs); leave, and they switch off (the coroutine is cancelled). It reacts to entering, not to every blink.",
  visual: {
    metaphor: "generic",
    title: "Run when the screen appears",
    caption: "LaunchedEffect launches a coroutine on entry; changing its key restarts it.",
  },
  example: {
    code: `@Composable
fun Profile(userId: String) {
    var name by remember { mutableStateOf("") }
    LaunchedEffect(userId) {
        // runs when shown, and again if userId changes
        name = fetchUserName(userId)
    }
    Text(name)
}`,
    explain:
      "When Profile appears, LaunchedEffect fetches the name. Because userId is the key, switching to a different user cancels the old fetch and starts a new one.",
  },
  mistakes: [
    {
      wrong: `@Composable
fun Profile() {
    name = fetchUserName()  // ❌ runs on every recomposition`,
      right: `LaunchedEffect(Unit) { name = fetchUserName() }  // ✅ runs once`,
      note: "Don't start coroutines or fetches directly in the body — that runs on every recomposition. Wrap them in LaunchedEffect.",
    },
  ],
  quiz: [
    {
      q: "When does LaunchedEffect run its block?",
      options: [
        "On every recomposition",
        "When the Composable enters, and again when a key changes",
        "Only when the app closes",
        "Never automatically",
      ],
      answer: 1,
      explain: "It launches a coroutine on first appearance and restarts only if a key changes.",
    },
    {
      q: "What does LaunchedEffect(Unit) signify?",
      options: [
        "Run on every frame",
        "Run once when the Composable first appears",
        "Disable the effect",
        "Run on a background thread forever",
      ],
      answer: 1,
      explain: "A constant key like Unit means the effect runs a single time on entry.",
    },
  ],
  aiContext:
    "The learner is learning LaunchedEffect. Use the 'timer when you enter a room' and 'motion-sensor lights' analogies. Key ideas: runs a coroutine on entry, keyed restart, LaunchedEffect(Unit) = once. No live preview in this stage. They know state, recomposition, and that Composables can re-run often.",
};

export const lessonSideEffect: Lesson = {
  id: "sideeffect",
  slug: "sideeffect",
  title: "SideEffect",
  emoji: "📤",
  estMinutes: 8,
  authored: true,
  objective: "Sync Compose state to non-Compose code after each redraw.",
  beginner:
    "**`SideEffect { }`** runs **after every successful recomposition**. Its job is to publish Compose state to code that lives **outside** Compose — analytics, a logger, or an old Java/Android object that needs the latest value. It's not for coroutines (use LaunchedEffect for that); it's a small, synchronous 'tell the outside world what changed' hook.",
  child:
    "SideEffect is telling the outside world what just changed 📤. After Compose finishes drawing, it whispers the new value to something that isn't part of Compose, like a notebook where you log events.",
  analogy:
    "Think of a scoreboard operator who, after each play is drawn on the field, phones the result to the radio station. Compose draws, then SideEffect reports the latest state outward.",
  visual: {
    metaphor: "generic",
    title: "Publish state outward",
    caption: "SideEffect runs after each recomposition to share state with non-Compose code.",
  },
  example: {
    code: `@Composable
fun Screen(user: User) {
    SideEffect {
        // runs after each recomposition
        analytics.setCurrentUser(user.id)
    }
    Text(user.name)
}`,
    explain:
      "Every time Screen recomposes with a (possibly new) user, SideEffect pushes the current id to the analytics object — keeping that external system in sync with Compose state.",
  },
  mistakes: [
    {
      wrong: `SideEffect {
    delay(1000)   // ❌ no coroutines here
}`,
      right: `LaunchedEffect(Unit) { delay(1000) }  // ✅ coroutines belong here`,
      note: "SideEffect is synchronous and runs every recomposition. For suspending/async work use LaunchedEffect instead.",
    },
  ],
  quiz: [
    {
      q: "When does SideEffect run?",
      options: [
        "Before the first composition only",
        "After every successful recomposition",
        "Only when the app closes",
        "On a timer",
      ],
      answer: 1,
      explain: "SideEffect runs after each successful recomposition to publish state outward.",
    },
    {
      q: "What is SideEffect mainly for?",
      options: [
        "Launching coroutines",
        "Sharing Compose state with non-Compose code",
        "Drawing UI",
        "Storing data on disk",
      ],
      answer: 1,
      explain: "It syncs the latest state to external, non-Compose systems like analytics or loggers.",
    },
  ],
  aiContext:
    "The learner is learning SideEffect. Use the 'tell the outside world' and 'scoreboard operator phoning the radio' analogies. Key: runs after every recomposition, synchronous, for non-Compose code; NOT for coroutines (that's LaunchedEffect). They just learned LaunchedEffect.",
};

export const lessonDisposableEffect: Lesson = {
  id: "disposableeffect",
  slug: "disposableeffect",
  title: "DisposableEffect",
  emoji: "🧹",
  estMinutes: 9,
  authored: true,
  objective: "Clean up when a Composable leaves.",
  beginner:
    "**`DisposableEffect(key)`** is for effects that need **cleanup**. You set something up (register a listener, start observing) and return an **`onDispose { }`** block that tears it down when the Composable leaves the screen or the key changes. This prevents leaks — listeners that linger after their screen is gone.",
  child:
    "DisposableEffect is turning off the lights when you leave the room 🧹. You switch things on when you arrive, and it makes sure to switch them off when you go, so nothing's left running.",
  analogy:
    "Think of checking into a gym locker: you put your lock on when you arrive (setup) and you must take it off when you leave (onDispose). DisposableEffect guarantees the lock comes off so the locker is free again.",
  visual: {
    metaphor: "generic",
    title: "Set up, then clean up",
    caption: "DisposableEffect registers something and returns onDispose { } to tear it down.",
  },
  example: {
    code: `@Composable
fun LocationScreen() {
    DisposableEffect(Unit) {
        val listener = startLocationUpdates()
        onDispose {
            listener.stop()   // cleanup when leaving
        }
    }
    Text("Tracking location…")
}`,
    explain:
      "When the screen appears it starts location updates; the returned onDispose stops them when the screen leaves, so the listener doesn't keep running in the background.",
  },
  mistakes: [
    {
      wrong: `DisposableEffect(Unit) {
    startListening()
    // ❌ no onDispose — listener leaks`,
      right: `DisposableEffect(Unit) {
    val l = startListening()
    onDispose { l.stop() }   // ✅ cleaned up
}`,
      note: "A DisposableEffect must return an onDispose block. Forgetting it leaks the resource you set up.",
    },
  ],
  quiz: [
    {
      q: "What must a DisposableEffect return?",
      options: [
        "A Composable",
        "An onDispose { } cleanup block",
        "A color",
        "A coroutine",
      ],
      answer: 1,
      explain: "It returns onDispose { }, which runs when the Composable leaves or the key changes.",
    },
    {
      q: "When does the onDispose block run?",
      options: [
        "On every recomposition",
        "When the Composable leaves the screen or its key changes",
        "When the app starts",
        "Never",
      ],
      answer: 1,
      explain: "onDispose performs cleanup on departure or key change, preventing leaks.",
    },
  ],
  aiContext:
    "The learner is learning DisposableEffect. Use the 'turn off the lights when you leave' and 'gym locker lock' analogies. Key: setup + required onDispose { } cleanup, runs on leave/key change, prevents leaks. They know LaunchedEffect and SideEffect.",
};

export const lessonCoroutineScope: Lesson = {
  id: "coroutinescope",
  slug: "coroutinescope",
  title: "rememberCoroutineScope",
  emoji: "⏱️",
  estMinutes: 9,
  authored: true,
  objective: "Launch coroutines tied to a Composable's life.",
  beginner:
    "**`rememberCoroutineScope()`** gives you a coroutine scope you can launch work from inside **event callbacks** (like onClick) — places where you can't call a suspend function directly. Unlike LaunchedEffect (which runs automatically on appearance), this scope lets **you** decide when to launch, e.g. 'when the user taps Save'. The scope is cancelled when the Composable leaves.",
  child:
    "rememberCoroutineScope is a helper that does slow jobs for you ⏱️ exactly when you ask. Press a button and it runs off to do the work in the background, then comes back with the result.",
  analogy:
    "Think of a personal assistant on standby. They don't act on their own — but the moment you say 'go fetch this' (a button tap), they run the errand. When you leave, the assistant clocks out (the scope cancels).",
  visual: {
    metaphor: "generic",
    title: "Launch work on demand",
    caption: "rememberCoroutineScope lets event handlers start coroutines you control.",
  },
  example: {
    code: `@Composable
fun SaveButton() {
    val scope = rememberCoroutineScope()
    Button(onClick = {
        scope.launch {
            saveToServer()   // a suspend function
        }
    }) {
        Text("Save")
    }
}`,
    explain:
      "onClick isn't a coroutine, so you can't call the suspend saveToServer() directly. scope.launch { } bridges that gap, running it when the button is tapped.",
  },
  mistakes: [
    {
      wrong: `Button(onClick = { saveToServer() })  // ❌ can't call suspend here`,
      right: `Button(onClick = { scope.launch { saveToServer() } })  // ✅`,
      note: "Suspend functions can't be called from a normal lambda. Use a remembered scope's launch to run them from callbacks.",
    },
    {
      wrong: `// using rememberCoroutineScope for run-on-appear logic`,
      right: `// use LaunchedEffect for run-on-appear; scope for event-driven work`,
      note: "If the work should run automatically when the screen shows, that's LaunchedEffect. rememberCoroutineScope is for user-triggered launches.",
    },
  ],
  quiz: [
    {
      q: "Why use rememberCoroutineScope?",
      options: [
        "To style buttons",
        "To launch coroutines from event callbacks like onClick",
        "To store data on disk",
        "To replace remember entirely",
      ],
      answer: 1,
      explain: "It provides a scope so non-coroutine callbacks can launch suspend work.",
    },
    {
      q: "How does it differ from LaunchedEffect?",
      options: [
        "It runs automatically on appearance",
        "You decide when to launch (e.g. on a tap); LaunchedEffect runs on appearance",
        "It can't be cancelled",
        "There's no difference",
      ],
      answer: 1,
      explain: "LaunchedEffect runs on entry/key-change; the remembered scope launches when you choose to.",
    },
  ],
  aiContext:
    "The learner is learning rememberCoroutineScope. Use the 'personal assistant on standby' analogy. Key contrast with LaunchedEffect: scope = launch on demand from callbacks (onClick); LaunchedEffect = auto on appearance. Scope cancels when the Composable leaves. They know LaunchedEffect, SideEffect, DisposableEffect.",
};

export const sideEffectLessons = {
  lessonLaunchedEffect,
  lessonSideEffect,
  lessonDisposableEffect,
  lessonCoroutineScope,
};
