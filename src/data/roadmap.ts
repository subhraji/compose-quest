import type { Stage, Lesson } from "./types";

// ── helper: quick stub for lessons not yet fully authored ──────
// They still have an objective + child explanation so the whole
// roadmap is navigable and useful from day one.
function stub(
  id: string,
  title: string,
  emoji: string,
  objective: string,
  child: string,
  estMinutes = 8
): Lesson {
  return {
    id,
    slug: id,
    title,
    emoji,
    estMinutes,
    objective,
    authored: false,
    child,
    aiContext: `The learner is on the lesson "${title}". Objective: ${objective}. Keep explanations beginner-first and friendly.`,
  };
}

// ════════════════════════════════════════════════════════════
//  FLAGSHIP LESSONS — fully authored with every section
// ════════════════════════════════════════════════════════════

const whatIsCompose: Lesson = {
  id: "what-is-compose",
  slug: "what-is-compose",
  title: "What is Jetpack Compose?",
  emoji: "✨",
  estMinutes: 6,
  authored: true,
  objective:
    "Understand what Jetpack Compose is and why it makes building Android screens easier.",
  beginner:
    "Jetpack Compose is Android's modern way to build app screens using **Kotlin code** instead of XML layout files. You *describe* what the screen should look like, and Compose draws it for you. When your data changes, you don't manually update the screen — you just describe the new look, and Compose figures out what to redraw. This idea is called **declarative UI**.",
  child:
    "Imagine you have a magic drawing board. Instead of moving every crayon yourself, you just say *“draw a red circle here and a blue square there.”* If you change your mind and say *“make the circle green,”* the board instantly fixes it for you. Jetpack Compose is that magic board for phone apps!",
  analogy:
    "Think of ordering food at a restaurant. The old way (XML) is like going into the kitchen and cooking the meal yourself, step by step. Compose is like telling the waiter *“I want a cheese pizza”* — you describe what you want, and the kitchen makes it appear. If you change your order, you just say the new order; you don't re-cook everything.",
  visual: {
    metaphor: "blueprint",
    title: "Describe, don't draw",
    caption:
      "You write a blueprint (your Composable). Compose reads it and builds the real UI — and rebuilds only what changed.",
  },
  example: {
    code: `@Composable
fun Greeting() {
    Text(text = "Hello, Compose!")
}`,
    explain:
      "The @Composable annotation marks a function that describes UI. This one says “show some text that reads Hello, Compose!”. Notice we never told it *how* to draw letters — we just described what we wanted.",
  },
  playground: `@Composable
fun Greeting() {
    Text(text = "Hello, Compose!")
}`,
  mistakes: [
    {
      wrong: `fun Greeting() {        // ❌ missing annotation
    Text("Hi")
}`,
      right: `@Composable             // ✅ tells Compose this draws UI
fun Greeting() {
    Text("Hi")
}`,
      note: "Without @Composable, the function is just normal code and can't show any UI.",
    },
  ],
  quiz: [
    {
      q: "What style of UI does Jetpack Compose use?",
      options: ["Imperative (do every step yourself)", "Declarative (describe the result)", "XML files only", "JavaScript"],
      answer: 1,
      explain:
        "Compose is declarative — you describe what the screen should look like, and Compose handles the drawing and updating.",
    },
    {
      q: "What does the @Composable annotation do?",
      options: [
        "Makes the app run faster",
        "Marks a function as one that describes UI",
        "Connects to the internet",
        "Saves data to a database",
      ],
      answer: 1,
      explain:
        "@Composable tells Compose that this function builds a piece of the user interface.",
    },
  ],
  aiContext:
    "The learner is taking their very first Compose lesson. They likely have little/no Android experience. Use the 'magic drawing board' and 'restaurant order' analogies. Reinforce the word 'declarative' gently. Never assume prior knowledge.",
};

const lessonColumn: Lesson = {
  id: "column",
  slug: "column",
  title: "Column — stacking things vertically",
  emoji: "📚",
  estMinutes: 9,
  authored: true,
  objective: "Use Column to arrange UI elements top-to-bottom.",
  beginner:
    "A **Column** places its children one **below** the other, from top to bottom. You put your Composables inside its `{ }` block and they stack in the order you write them. Column is one of the three building blocks of Compose layouts (the others are **Row** and **Box**).",
  child:
    "A Column is like a stack of pancakes 🥞. The first pancake you make goes on the bottom, the next sits on top of it, and so on — each new thing goes underneath the one before, neatly in a vertical pile.",
  analogy:
    "Think of a vending machine where snacks are stacked in a vertical slot. Each item sits directly above the next. A Column stacks your buttons, text, and images the same way.",
  visual: {
    metaphor: "stack",
    title: "Top to bottom",
    caption:
      "Children of a Column line up vertically, in the exact order you write them in code.",
  },
  example: {
    code: `@Composable
fun Profile() {
    Column {
        Text("Ada Lovelace")
        Text("Mathematician")
        Text("First programmer")
    }
}`,
    explain:
      "All three Text elements are inside the Column's braces, so they appear stacked: name on top, then title, then description — exactly the order written.",
  },
  playground: `@Composable
fun Profile() {
    Column {
        Text("Ada Lovelace")
        Text("Mathematician")
        Text("First programmer")
    }
}`,
  mistakes: [
    {
      wrong: `Column
    Text("A")   // ❌ no braces`,
      right: `Column {
    Text("A")   // ✅ children go inside { }
}`,
      note: "A Column's children must live inside its { } block, otherwise they aren't part of the column.",
    },
    {
      wrong: `Row {            // ❌ Row stacks side-by-side
    Text("Line 1")
    Text("Line 2")
}`,
      right: `Column {         // ✅ Column stacks top-to-bottom
    Text("Line 1")
    Text("Line 2")
}`,
      note: "If you wanted items above/below each other, use Column. Row places them left-to-right.",
    },
  ],
  quiz: [
    {
      q: "How does a Column arrange its children?",
      options: ["Left to right", "Top to bottom", "In a circle", "Randomly"],
      answer: 1,
      explain: "A Column stacks children vertically, top to bottom, in code order.",
    },
    {
      q: "Where do a Column's children go?",
      options: ["After the word Column", "Inside its { } braces", "In a separate file", "Inside Text()"],
      answer: 1,
      explain: "Children must be written inside the Column's { } block.",
    },
  ],
  aiContext:
    "The learner is learning Column. Use the 'stack of pancakes' and 'vending machine' analogies. Contrast with Row (horizontal) when helpful. They have just learned basic Composables and Text.",
};

const lessonRemember: Lesson = {
  id: "remember-mutablestateof",
  slug: "remember-mutablestateof",
  title: "remember & mutableStateOf — giving your UI memory",
  emoji: "🧠",
  estMinutes: 12,
  authored: true,
  objective:
    "Store changing values so the UI updates automatically when they change.",
  beginner:
    "By default, a Composable forgets everything each time it redraws. **`mutableStateOf`** creates a value that Compose *watches* — when it changes, Compose redraws the parts that use it. **`remember`** tells Compose to *keep* that value across redraws instead of recreating it. Together: `var count by remember { mutableStateOf(0) }` makes a number the UI remembers and reacts to.",
  child:
    "Imagine a little memory box 📦 with a number written on a card inside. Every time you press a button, you change the card to a bigger number, and a magic window on the box instantly shows the new number. `remember` is the box that keeps the card safe; `mutableStateOf` is the magic that updates the window whenever the card changes.",
  analogy:
    "It's like a scoreboard at a basketball game. The score is stored somewhere (remember = the scoreboard keeps it), and the moment a team scores, the displayed number flips to the new value (mutableStateOf = it reacts to change). Nobody repaints the whole stadium — only the number changes.",
  visual: {
    metaphor: "memory-box",
    title: "State = a memory box the UI watches",
    caption:
      "remember keeps the box. mutableStateOf makes the UI redraw whenever what's inside the box changes.",
  },
  example: {
    code: `@Composable
fun Counter() {
    var count by remember { mutableStateOf(0) }
    Button(onClick = { count++ }) {
        Text("Clicked $count times")
    }
}`,
    explain:
      "count starts at 0 and lives in a remembered state box. Tapping the button does count++, which changes the box. Compose notices and redraws the Button's text with the new number — automatically.",
  },
  playground: `@Composable
fun Counter() {
    var count by remember { mutableStateOf(0) }
    Button(onClick = { count++ }) {
        Text("Clicked $count times")
    }
}`,
  mistakes: [
    {
      wrong: `var count = mutableStateOf(0)   // ❌ no remember
// resets to 0 on every redraw`,
      right: `var count by remember { mutableStateOf(0) }  // ✅ survives redraws`,
      note: "Without remember, the state is recreated on each recomposition, so it never seems to change.",
    },
    {
      wrong: `var count = 0          // ❌ plain variable
Button(onClick = { count++ }) { Text("$count") }
// number never updates on screen`,
      right: `var count by remember { mutableStateOf(0) }  // ✅ UI reacts`,
      note: "A normal variable isn't watched by Compose, so changing it won't redraw the UI.",
    },
  ],
  quiz: [
    {
      q: "What does mutableStateOf do?",
      options: [
        "Saves data to the internet",
        "Creates a value Compose watches and redraws when it changes",
        "Makes the app start faster",
        "Deletes old screens",
      ],
      answer: 1,
      explain:
        "mutableStateOf creates observable state — when it changes, Compose recomposes the parts that read it.",
    },
    {
      q: "Why do we wrap state in remember?",
      options: [
        "To make it look nicer",
        "So the value survives across recompositions instead of resetting",
        "To connect to a database",
        "It's optional and does nothing",
      ],
      answer: 1,
      explain:
        "remember keeps the same state value across redraws; without it the value resets every recomposition.",
    },
  ],
  aiContext:
    "The learner is learning state with remember + mutableStateOf — often the trickiest beginner topic. Lean heavily on the 'memory box with a magic window' and 'scoreboard' metaphors. Emphasize: mutableStateOf = reacts to change; remember = survives redraws. They already know Composables, Text, Button, Column.",
};

// ════════════════════════════════════════════════════════════
//  THE FULL ROADMAP — beginner → advanced
// ════════════════════════════════════════════════════════════

export const ROADMAP: Stage[] = [
  {
    id: "fundamentals",
    title: "Compose Fundamentals",
    emoji: "🌱",
    blurb: "Your very first steps. What Compose is and the basic pieces you'll use everywhere.",
    gradient: "from-mint-400 to-quest-400",
    lessons: [
      whatIsCompose,
      stub("composable-functions", "Composable Functions", "🧩", "Write reusable @Composable functions that describe UI.", "Little reusable LEGO pieces of screen you can snap together and reuse."),
      stub("text", "Text", "🔤", "Display and style text on screen.", "How to show words on the screen — and make them big, bold, or colorful."),
      stub("button", "Button", "🔘", "Add tappable buttons that run code on click.", "A button is a doorbell — press it and something happens."),
      stub("image", "Image", "🖼️", "Show pictures from resources or the internet.", "How to put a photo or drawing onto your screen."),
      stub("icon", "Icon", "⭐", "Use Material icons as small symbols.", "Tiny pictures like a heart or a star you can place anywhere."),
      stub("material-basics", "Material Design Basics", "🎨", "Understand Material theming: colors, shapes, typography.", "A box of matching crayons so your whole app looks neat and consistent."),
    ],
  },
  {
    id: "layouts",
    title: "Layouts",
    emoji: "📐",
    blurb: "Arrange things on the screen — stack them, line them up, and overlap them.",
    gradient: "from-quest-400 to-quest-600",
    lessons: [
      lessonColumn,
      stub("row", "Row — side by side", "➡️", "Use Row to arrange elements left-to-right.", "Like people standing in a line holding hands — items sit beside each other."),
      stub("box", "Box — stacking on top", "🃏", "Use Box to overlap elements like layers.", "Like stacking transparent sheets — things can sit on top of each other."),
      stub("spacer", "Spacer", "↔️", "Add empty space between elements.", "An invisible cushion that pushes things apart."),
      stub("alignment", "Alignment", "🎯", "Position children (start, center, end).", "Deciding whether things hug the left, sit in the middle, or go right."),
      stub("arrangement", "Arrangement", "📊", "Distribute space between children.", "How to spread items out evenly or bunch them together."),
    ],
  },
  {
    id: "modifiers",
    title: "Modifiers",
    emoji: "🛠️",
    blurb: "The magic chain that styles and positions everything — padding, size, color, and more.",
    gradient: "from-quest-500 to-purple-500",
    lessons: [
      stub("padding", "Padding", "📦", "Add inner spacing around content.", "A pillow of space inside a box so things don't touch the edges."),
      stub("size", "Size (width / height)", "📏", "Control how big an element is.", "Telling something exactly how tall and wide to be."),
      stub("background", "Background", "🎨", "Paint a color or shape behind content.", "Putting a colored sheet of paper behind your item."),
      stub("border", "Border", "🔲", "Draw an outline around an element.", "Drawing a frame around a picture."),
      stub("clickable", "Clickable", "👆", "Make any element respond to taps.", "Turning anything into a button you can press."),
      stub("weight", "Weight", "⚖️", "Share leftover space proportionally in Row/Column.", "Splitting a pizza so everyone gets a fair-sized slice."),
      stub("offset", "Offset", "↗️", "Nudge an element from its position.", "Scooting something a little to the side or up/down."),
    ],
  },
  {
    id: "state",
    title: "State Management",
    emoji: "🧠",
    blurb: "Give your app memory so it can change and react to the user. The big one!",
    gradient: "from-purple-500 to-pink-500",
    lessons: [
      lessonRemember,
      stub("state", "State", "💡", "Understand what state is and why UI depends on it.", "State is what your app currently remembers — like the score in a game."),
      stub("state-hoisting", "State Hoisting", "🪁", "Move state up so components can share it.", "Two kids sharing one toy box that a grown-up holds for them both."),
      stub("recomposition", "Recomposition", "🔁", "Understand how Compose redraws when state changes.", "Rebuilding only the LEGO bricks that changed, not the whole castle."),
    ],
  },
  {
    id: "lists",
    title: "Lists",
    emoji: "📜",
    blurb: "Show long, scrollable collections of items efficiently.",
    gradient: "from-pink-500 to-coral-500",
    lessons: [
      stub("lazycolumn", "LazyColumn", "📋", "Show a scrolling vertical list efficiently.", "A magic scroll that only shows the lines you can actually see."),
      stub("lazyrow", "LazyRow", "🎞️", "Show a scrolling horizontal list.", "A film strip you can swipe sideways."),
      stub("grids", "Grid Layouts", "🔳", "Arrange items in a grid.", "Like a chocolate box — rows and columns of little squares."),
    ],
  },
  {
    id: "navigation",
    title: "Navigation",
    emoji: "🧭",
    blurb: "Move between different screens in your app.",
    gradient: "from-coral-500 to-spark-500",
    lessons: [
      stub("navhost", "NavHost", "🚪", "Set up navigation between screens.", "A hallway with doors that lead to different rooms."),
      stub("routes", "Routes", "🗺️", "Name and reach each screen.", "Each room has an address so you know how to get there."),
      stub("nav-args", "Passing Arguments", "📨", "Send data when navigating.", "Carrying a note with you when you walk into the next room."),
    ],
  },
  {
    id: "side-effects",
    title: "Side Effects",
    emoji: "🌀",
    blurb: "Run code at the right moment — when a screen appears, leaves, or updates.",
    gradient: "from-spark-500 to-mint-400",
    lessons: [
      stub("launchedeffect", "LaunchedEffect", "🚀", "Run a task when a Composable enters the screen.", "Starting a timer the moment you walk into a room."),
      stub("sideeffect", "SideEffect", "📤", "Sync Compose state to non-Compose code after each redraw.", "Telling the outside world what just changed."),
      stub("disposableeffect", "DisposableEffect", "🧹", "Clean up when a Composable leaves.", "Turning off the lights when you leave the room."),
      stub("coroutinescope", "rememberCoroutineScope", "⏱️", "Launch coroutines tied to a Composable's life.", "A helper that does slow jobs in the background for you."),
    ],
  },
  {
    id: "architecture",
    title: "Architecture",
    emoji: "🏛️",
    blurb: "Organize your code so big apps stay clean and easy to change.",
    gradient: "from-mint-500 to-quest-500",
    lessons: [
      stub("viewmodel", "ViewModel", "👔", "Hold and manage screen data separate from UI.", "A manager who keeps all the important info so the screen stays simple.", 10),
      stub("stateflow", "StateFlow", "🌊", "Expose state that the UI observes over time.", "A river of updates the screen keeps watching."),
      stub("sharedflow", "SharedFlow", "📣", "Emit one-time events to the UI.", "A loudspeaker announcement everyone hears once."),
      stub("mvvm", "MVVM", "🍽️", "Connect View, ViewModel, and data cleanly.", "A restaurant: waiter (UI), kitchen (ViewModel), pantry (data)."),
    ],
  },
  {
    id: "networking",
    title: "Networking",
    emoji: "🌐",
    blurb: "Talk to the internet and load real data into your app.",
    gradient: "from-quest-500 to-blue-500",
    lessons: [
      stub("retrofit", "Retrofit", "📡", "Call web APIs to fetch data.", "A mail carrier who fetches packages from the internet for you.", 12),
      stub("api-integration", "API Integration", "🔌", "Show fetched data in your Compose UI.", "Putting the delivered package onto your screen."),
    ],
  },
  {
    id: "storage",
    title: "Local Storage",
    emoji: "💾",
    blurb: "Save data on the device so it's there next time.",
    gradient: "from-blue-500 to-quest-600",
    lessons: [
      stub("room", "Room Database", "🗄️", "Store structured data locally.", "A filing cabinet inside the phone that remembers things forever.", 12),
      stub("datastore", "DataStore", "🔑", "Save small key-value settings.", "A tiny notebook for small notes like 'dark mode = on'."),
    ],
  },
  {
    id: "animations",
    title: "Animations",
    emoji: "🎬",
    blurb: "Make your UI feel alive with smooth motion.",
    gradient: "from-pink-400 to-purple-500",
    lessons: [
      stub("animatedvisibility", "AnimatedVisibility", "👀", "Fade/slide things in and out.", "Making things appear and disappear smoothly instead of popping."),
      stub("animate-as-state", "animate*AsState", "🎢", "Smoothly animate a value when it changes.", "Sliding to a new number instead of jumping to it."),
      stub("transitions", "Transitions", "🦋", "Animate several values together.", "A caterpillar smoothly turning into a butterfly."),
      stub("gesture-animations", "Gesture Animations", "🤙", "React to drags and swipes with motion.", "Things that follow your finger as you move it."),
    ],
  },
  {
    id: "performance",
    title: "Performance",
    emoji: "⚡",
    blurb: "Make your app fast and smooth — fewer wasted redraws.",
    gradient: "from-spark-400 to-coral-500",
    lessons: [
      stub("stability", "Stability", "🧱", "Help Compose know what hasn't changed.", "Labeling boxes so Compose can skip the ones that didn't change."),
      stub("recomposition-optimization", "Recomposition Optimization", "🎯", "Avoid unnecessary redraws.", "Only repainting the wall that got dirty, not the whole house."),
      stub("best-practices", "Best Practices", "✅", "Habits that keep Compose code clean and fast.", "Good habits that keep your app speedy and tidy."),
    ],
  },
  {
    id: "advanced",
    title: "Advanced Compose",
    emoji: "🚀",
    blurb: "Build anything — custom layouts, drawing, and your own design system.",
    gradient: "from-purple-600 to-quest-700",
    lessons: [
      stub("custom-layouts", "Custom Layouts", "📐", "Measure and place children yourself.", "Becoming the architect who designs brand-new room shapes.", 14),
      stub("canvas", "Canvas", "🖌️", "Draw shapes, lines, and art directly.", "A blank canvas where you paint whatever you imagine.", 12),
      stub("custom-components", "Custom Components", "🧩", "Package your own reusable widgets.", "Inventing your own LEGO piece and sharing it everywhere."),
      stub("design-systems", "Design Systems", "🎨", "Build a consistent, themeable component library.", "Your own box of matching crayons for a whole brand."),
    ],
  },
];

// ── lookups ────────────────────────────────────────────────
export function allLessons(): Lesson[] {
  return ROADMAP.flatMap((s) => s.lessons);
}

export function findLesson(slug: string): { lesson: Lesson; stage: Stage; index: number } | null {
  for (const stage of ROADMAP) {
    const idx = stage.lessons.findIndex((l) => l.slug === slug);
    if (idx !== -1) return { lesson: stage.lessons[idx], stage, index: idx };
  }
  return null;
}

export function adjacentLessons(slug: string): { prev: Lesson | null; next: Lesson | null } {
  const flat = allLessons();
  const i = flat.findIndex((l) => l.slug === slug);
  return {
    prev: i > 0 ? flat[i - 1] : null,
    next: i >= 0 && i < flat.length - 1 ? flat[i + 1] : null,
  };
}

export function stageForLesson(slug: string): Stage | null {
  return ROADMAP.find((s) => s.lessons.some((l) => l.slug === slug)) ?? null;
}
