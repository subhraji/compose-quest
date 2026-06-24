import type { Lesson } from "../types";

// ════════════════════════════════════════════════════════════
//  ADVANCED COMPOSE — build anything
// ════════════════════════════════════════════════════════════

export const lessonCustomLayouts: Lesson = {
  id: "custom-layouts",
  slug: "custom-layouts",
  title: "Custom Layouts",
  emoji: "📐",
  estMinutes: 14,
  authored: true,
  objective: "Measure and place children yourself.",
  beginner:
    "When the built-in Row/Column/Box can't express what you need, the **`Layout`** composable lets you do it yourself. You get the children as **measurables**, call `measure(constraints)` on each to get **placeables**, decide the overall size, and then **place** each child at exact x/y coordinates. It's the same two-step every Compose layout uses under the hood: **measure**, then **place**.",
  child:
    "Custom layouts make you the architect 📐 who designs brand-new room shapes. Instead of using pre-made rooms, you decide exactly where every piece of furniture goes.",
  analogy:
    "Think of arranging furniture in an oddly-shaped room. First you check how big each piece is (measure), then you decide where each one sits (place). A custom Layout does precisely that for your children.",
  visual: {
    metaphor: "generic",
    title: "Measure, then place",
    caption: "The Layout composable hands you measurables; you measure and position each child.",
  },
  example: {
    code: `@Composable
fun StackUp(content: @Composable () -> Unit) {
    Layout(content = content) { measurables, constraints ->
        val placeables = measurables.map { it.measure(constraints) }
        val height = placeables.sumOf { it.height }
        layout(constraints.maxWidth, height) {
            var y = 0
            placeables.forEach { p ->
                p.placeRelative(x = 0, y = y)
                y += p.height
            }
        }
    }
}`,
    explain:
      "This re-implements a simple Column: measure every child, total their heights for the layout size, then place each one stacked below the previous. measure → size → place is the universal pattern.",
  },
  mistakes: [
    {
      wrong: `// placing a child without measuring it first  // ❌`,
      right: `val placeable = measurable.measure(constraints)  // ✅ measure, then place`,
      note: "You must measure each child (turning a measurable into a placeable) before you can place it. Measure first, place second.",
    },
  ],
  quiz: [
    {
      q: "What are the two phases of a custom Layout?",
      options: [
        "Fetch and parse",
        "Measure and place",
        "Compose and dispose",
        "Read and write",
      ],
      answer: 1,
      explain: "You measure each child, decide the size, then place each child at a position.",
    },
    {
      q: "What turns a measurable into something you can place?",
      options: [
        "Calling measure(constraints) to get a placeable",
        "Adding a Modifier",
        "remember { }",
        "collectAsState()",
      ],
      answer: 0,
      explain: "measure(constraints) produces a placeable, which you then position with place().",
    },
  ],
  aiContext:
    "The learner is learning Custom Layouts. Use the 'architect arranging furniture in an odd room' analogy. Key flow: Layout composable → measurables → measure(constraints) → placeables → layout(w,h) { place(...) }. Measure-then-place is universal. They know Row/Column/Box and modifiers. No live preview.",
};

export const lessonCanvas: Lesson = {
  id: "canvas",
  slug: "canvas",
  title: "Canvas",
  emoji: "🖌️",
  estMinutes: 12,
  authored: true,
  objective: "Draw shapes, lines, and art directly.",
  beginner:
    "The **`Canvas`** composable gives you a drawing surface. Inside its `onDraw` lambda you call functions like `drawCircle`, `drawLine`, `drawRect`, and `drawPath`, using `size` to know how big the area is. It's how you build custom charts, progress rings, signatures, and game graphics — anything the standard components don't provide.",
  child:
    "Canvas is a blank sheet 🖌️ where you paint whatever you imagine — circles, lines, shapes — instead of using ready-made pieces. You're the artist drawing from scratch.",
  analogy:
    "Think of an empty whiteboard with a set of markers. Nothing is pre-printed; you draw exactly the shapes and lines you want, wherever you want them. Canvas is that whiteboard for your app.",
  visual: {
    metaphor: "generic",
    title: "A surface you paint on",
    caption: "Inside Canvas's onDraw, call drawCircle/drawLine/drawRect/drawPath using size.",
  },
  example: {
    code: `@Composable
fun Donut() {
    Canvas(modifier = Modifier.size(120.dp)) {
        drawCircle(
            color = Color.Magenta,
            radius = size.minDimension / 2,
            style = Stroke(width = 24f)
        )
    }
}`,
    explain:
      "Inside onDraw, size tells you the canvas dimensions. drawCircle with a Stroke style paints a ring (a 'donut') rather than a filled disc — the basis of progress indicators.",
  },
  mistakes: [
    {
      wrong: `Canvas(Modifier.size(120.dp)) {}  // ❌ nothing drawn`,
      right: `Canvas(Modifier.size(120.dp)) { drawCircle(Color.Blue, radius = 40f) }  // ✅`,
      note: "An empty onDraw paints nothing. Call draw* functions inside it, and remember to give the Canvas a size.",
    },
  ],
  quiz: [
    {
      q: "What is the Canvas composable for?",
      options: [
        "Laying out text in a list",
        "Drawing custom shapes, lines, and graphics directly",
        "Making network calls",
        "Navigating between screens",
      ],
      answer: 1,
      explain: "Canvas gives you a low-level drawing surface for custom graphics.",
    },
    {
      q: "Inside Canvas's draw scope, what does `size` give you?",
      options: [
        "The font size",
        "The dimensions of the drawing area",
        "The number of children",
        "The screen brightness",
      ],
      answer: 1,
      explain: "size is the Canvas's width/height, used to scale and position your drawing.",
    },
  ],
  aiContext:
    "The learner is learning Canvas. Use the 'blank sheet / whiteboard with markers' analogy. Key: Canvas { } draw scope, drawCircle/drawLine/drawRect/drawPath, use size, Stroke vs fill. Good for charts/progress rings. They know modifiers and size. No live preview.",
};

export const lessonCustomComponents: Lesson = {
  id: "custom-components",
  slug: "custom-components",
  title: "Custom Components",
  emoji: "🧩",
  estMinutes: 10,
  authored: true,
  objective: "Package your own reusable widgets.",
  beginner:
    "A **custom component** is just a Composable you design to be **reused**. The recipe: expose the data and actions as **parameters**, accept a **`modifier: Modifier = Modifier`** (and apply it to the root), provide sensible **defaults**, optionally take a **content slot** (`content: @Composable () -> Unit`) so callers can pass their own children — like Compose's own Card and Scaffold do.",
  child:
    "Custom components are inventing your own LEGO piece 🧩 and snapping it in everywhere. Make it once, reuse it forever, instead of rebuilding the same thing each time.",
  analogy:
    "Think of a cookie cutter. Shape it once, then stamp out identical cookies all day. A custom component is your reusable cutter for a piece of UI you use again and again.",
  visual: {
    metaphor: "lego",
    title: "Your own reusable brick",
    caption: "Parameters for data/actions, a modifier param, defaults, and an optional content slot.",
  },
  example: {
    code: `@Composable
fun LabeledCard(
    title: String,
    modifier: Modifier = Modifier,
    content: @Composable () -> Unit
) {
    Card(modifier = modifier.padding(8.dp)) {
        Column {
            Text(title, fontWeight = FontWeight.Bold)
            content()   // caller fills the body
        }
    }
}

// reuse it
LabeledCard(title = "Profile") {
    Text("Ada Lovelace")
}`,
    explain:
      "LabeledCard takes a title, a modifier, and a content slot. Callers reuse it everywhere and drop whatever children they like into the slot — exactly how Compose's built-in containers are designed.",
  },
  mistakes: [
    {
      wrong: `@Composable
fun MyButton() {
    Button(onClick = { /* hard-coded */ }) { Text("Save") }  // ❌ not reusable`,
      right: `@Composable
fun MyButton(text: String, onClick: () -> Unit, modifier: Modifier = Modifier) { … }  // ✅`,
      note: "Hard-coding the label and action makes a component single-use. Expose them as parameters (plus a modifier) so it's truly reusable.",
    },
  ],
  quiz: [
    {
      q: "What makes a Composable a good reusable component?",
      options: [
        "Hard-coded text and colors",
        "Parameters for data/actions, a modifier param, defaults, and optional content slot",
        "Doing network calls inside it",
        "Being as large as possible",
      ],
      answer: 1,
      explain: "Parameterizing data/actions, accepting a modifier, and offering a content slot make it flexible and reusable.",
    },
    {
      q: "What is a 'content slot'?",
      options: [
        "A database column",
        "A content: @Composable () -> Unit parameter so callers pass their own children",
        "A navigation route",
        "A type of animation",
      ],
      answer: 1,
      explain: "A trailing @Composable content lambda lets callers supply the inner UI, like Card or Scaffold.",
    },
  ],
  aiContext:
    "The learner is learning Custom Components. Use the 'invent your own LEGO piece' and 'cookie cutter' analogies. Recipe: parameters for data/actions, modifier param applied to root, defaults, optional content slot (@Composable () -> Unit). Builds on best practices. They know modifiers, slots (Card/Button take content).",
};

export const lessonDesignSystems: Lesson = {
  id: "design-systems",
  slug: "design-systems",
  title: "Design Systems",
  emoji: "🎨",
  estMinutes: 12,
  authored: true,
  objective: "Build a consistent, themeable component library.",
  beginner:
    "A **design system** is a shared set of **colors, typography, shapes, and components** so an entire app looks and feels consistent. In Compose you define a **`MaterialTheme`** (or your own theme) holding those tokens, then your components read them via `MaterialTheme.colorScheme`, `.typography`, and `.shapes` instead of hard-coding values. Change a token in one place and the whole app updates — and theming (light/dark, brand variants) becomes trivial.",
  child:
    "A design system is your own box of matching crayons 🎨 for a whole brand. Everyone draws with the same colors and styles, so everything looks like it belongs together.",
  analogy:
    "Think of a LEGO set with a fixed palette and brick types. Because every piece comes from the same set, anything you build matches. A design system is that curated set for your app's UI.",
  visual: {
    metaphor: "generic",
    title: "One source of style truth",
    caption: "Theme tokens (color, type, shape) flow to every component; change once, update everywhere.",
  },
  example: {
    code: `@Composable
fun AppTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = brandColors,
        typography = brandType,
        shapes = brandShapes,
        content = content
    )
}

@Composable
fun Title(text: String) {
    Text(
        text,
        color = MaterialTheme.colorScheme.primary,        // read tokens
        style = MaterialTheme.typography.headlineSmall
    )
}`,
    explain:
      "AppTheme provides the brand's tokens once at the top. Components like Title read from MaterialTheme instead of hard-coding a hex color or font size, so a single token change re-themes the whole app.",
  },
  mistakes: [
    {
      wrong: `Text("Hi", color = Color(0xFF6750A4))  // ❌ hard-coded everywhere`,
      right: `Text("Hi", color = MaterialTheme.colorScheme.primary)  // ✅ token`,
      note: "Hard-coding colors and sizes scatters style across the app. Read theme tokens so you can restyle (and support dark mode) from one place.",
    },
  ],
  quiz: [
    {
      q: "What does a design system give an app?",
      options: [
        "Faster network calls",
        "Consistent, reusable colors, typography, shapes, and components",
        "A local database",
        "Automatic navigation",
      ],
      answer: 1,
      explain: "It's a shared, themeable set of design tokens and components for a consistent look.",
    },
    {
      q: "Why read MaterialTheme tokens instead of hard-coding values?",
      options: [
        "It compiles faster",
        "Changing a token updates the whole app and makes theming (e.g. dark mode) easy",
        "Hard-coding is impossible",
        "Tokens are required for layouts",
      ],
      answer: 1,
      explain: "Reading tokens centralizes style, so one change re-themes everything and supports variants like dark mode.",
    },
  ],
  aiContext:
    "The learner is learning Design Systems — the capstone lesson. Use the 'matching crayons' and 'curated LEGO set' analogies. Key: MaterialTheme tokens (colorScheme/typography/shapes), components read tokens vs hard-coding, enables theming/dark mode. Ties together Material Basics, custom components, best practices. No live preview.",
};

export const advancedLessons = {
  lessonCustomLayouts,
  lessonCanvas,
  lessonCustomComponents,
  lessonDesignSystems,
};
