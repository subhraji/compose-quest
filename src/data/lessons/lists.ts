import type { Lesson } from "../types";

// ════════════════════════════════════════════════════════════
//  LISTS — scrollable collections
// ════════════════════════════════════════════════════════════

export const lessonLazyColumn: Lesson = {
  id: "lazycolumn",
  slug: "lazycolumn",
  title: "LazyColumn",
  emoji: "📋",
  estMinutes: 10,
  authored: true,
  objective: "Show a scrolling vertical list efficiently.",
  beginner:
    "**`LazyColumn`** is a vertically scrolling list that only builds the items currently **on screen** — as you scroll, items that leave the top are recycled for ones entering the bottom. This makes it efficient for long (even huge) lists. Inside its `{ }` you use `item { }` for a single row and `items(list) { ... }` to render many.",
  child:
    "A LazyColumn is a magic scroll 📋 that only draws the lines you can actually see. The rest aren't built until you scroll to them, so it stays fast even with thousands of items.",
  analogy:
    "Think of a vending machine that only stocks the snacks in the window. As you rotate the wheel, it loads the next ones into view. It never holds the entire warehouse at once — just what you're looking at.",
  visual: {
    metaphor: "generic",
    title: "Only builds what's visible",
    caption: "LazyColumn renders on-screen items and recycles them as you scroll.",
  },
  example: {
    code: `@Composable
fun Names() {
    LazyColumn {
        item {
            Text("Header")
        }
        items(listOf("Ada", "Alan", "Grace")) { name ->
            Text(name)
        }
    }
}`,
    explain:
      "item { } adds one fixed row (the header); items(list) { } loops over the data and emits a Text per name. Only the rows you can see are actually built.",
  },
  playground: `@Composable
fun Names() {
    Column {
        Text("Ada Lovelace")
        Text("Alan Turing")
        Text("Grace Hopper")
        Text("Edsger Dijkstra")
    }
}`,
  mistakes: [
    {
      wrong: `Column(Modifier.verticalScroll(...)) {
    // ❌ builds ALL items at once — slow for long lists
}`,
      right: `LazyColumn {
    items(bigList) { Text(it) }   // ✅ only visible items built
}`,
      note: "A scrollable Column builds every child immediately. For long lists use LazyColumn so off-screen items aren't created until needed.",
    },
    {
      wrong: `LazyColumn {
    Text("hi")        // ❌ children must be item/items
}`,
      right: `LazyColumn {
    item { Text("hi") }   // ✅ wrap in item { }
}`,
      note: "Inside a LazyColumn, content must go through item { } or items(...) { }, not directly.",
    },
  ],
  quiz: [
    {
      q: "Why is LazyColumn efficient for long lists?",
      options: [
        "It loads everything instantly",
        "It only builds the items currently visible and recycles them",
        "It removes the list from memory",
        "It uses less color",
      ],
      answer: 1,
      explain: "LazyColumn composes only on-screen items, recycling them as you scroll.",
    },
    {
      q: "How do you render a list of data inside a LazyColumn?",
      options: [
        "Put Text directly inside",
        "Use items(list) { ... }",
        "Use a Row",
        "Use Modifier.list()",
      ],
      answer: 1,
      explain: "items(list) { element -> ... } emits content for each entry in the data.",
    },
  ],
  aiContext:
    "The learner is learning LazyColumn. Use the 'magic scroll' and 'vending machine window' analogies. Key API: item { } and items(list) { }; contrast with a plain scrollable Column. The live preview can't scroll, so the playground shows a plain Column stand-in. They know Column, Text, state.",
};

export const lessonLazyRow: Lesson = {
  id: "lazyrow",
  slug: "lazyrow",
  title: "LazyRow",
  emoji: "🎞️",
  estMinutes: 8,
  authored: true,
  objective: "Show a scrolling horizontal list.",
  beginner:
    "**`LazyRow`** is the horizontal sibling of LazyColumn: a left-to-right scrolling list that only builds visible items. It uses the same `item { }` / `items(list) { }` API. It's perfect for carousels, story reels, and horizontal chip rows.",
  child:
    "A LazyRow is a film strip 🎞️ you swipe sideways. Only the frames in front of you are drawn; swipe and the next ones appear.",
  analogy:
    "Think of a conveyor belt of sushi plates. You only see the plates passing in front of you; the rest are still down the line. Swipe to bring more into view.",
  visual: {
    metaphor: "generic",
    title: "Horizontal scrolling, built lazily",
    caption: "LazyRow scrolls left-to-right and only builds the items in view.",
  },
  example: {
    code: `@Composable
fun Chips() {
    LazyRow {
        items(listOf("All", "News", "Sports", "Tech")) { label ->
            Text(label)
        }
    }
}`,
    explain:
      "items(...) emits a Text per label, laid out horizontally. As the user swipes, off-screen chips are built only when they scroll into view.",
  },
  playground: `@Composable
fun Chips() {
    Row {
        Text("All")
        Text("News")
        Text("Sports")
        Text("Tech")
    }
}`,
  mistakes: [
    {
      wrong: `LazyColumn { items(tags) { Text(it) } }  // ❌ scrolls vertically`,
      right: `LazyRow { items(tags) { Text(it) } }     // ✅ scrolls horizontally`,
      note: "Use LazyRow for horizontal carousels; LazyColumn for vertical lists. Same API, different direction.",
    },
  ],
  quiz: [
    {
      q: "How does a LazyRow scroll?",
      options: ["Top to bottom", "Left to right", "Diagonally", "It doesn't scroll"],
      answer: 1,
      explain: "LazyRow is the horizontal counterpart to LazyColumn — it scrolls left-to-right.",
    },
    {
      q: "What's a good use for a LazyRow?",
      options: [
        "A long settings page",
        "A horizontal carousel of cards or chips",
        "A single button",
        "A full-screen background",
      ],
      answer: 1,
      explain: "Horizontal, lazily-built lists are ideal for carousels, reels, and chip rows.",
    },
  ],
  aiContext:
    "The learner is learning LazyRow. Use the 'film strip' and 'sushi conveyor belt' analogies. Same item/items API as LazyColumn but horizontal. Preview can't scroll, so the playground uses a plain Row. They just learned LazyColumn.",
};

export const lessonGrids: Lesson = {
  id: "grids",
  slug: "grids",
  title: "Grid Layouts",
  emoji: "🔳",
  estMinutes: 9,
  authored: true,
  objective: "Arrange items in a grid.",
  beginner:
    "For grids, Compose offers **`LazyVerticalGrid`** (and `LazyHorizontalGrid`). You tell it how many columns with `columns = GridCells.Fixed(3)` (exactly 3 columns) or `GridCells.Adaptive(80.dp)` (as many ~80dp columns as fit). Like the lazy lists, it only builds visible cells, so it scales to large photo galleries and dashboards.",
  child:
    "A grid is like a chocolate box 🔳 — neat rows and columns of little squares. You decide how many squares fit across, and the rest wrap onto the next row.",
  analogy:
    "Think of egg cartons or a calendar. Items sit in a tidy matrix of rows and columns. A grid lays your photos or icons out in exactly that orderly pattern.",
  visual: {
    metaphor: "generic",
    title: "Rows and columns of cells",
    caption: "LazyVerticalGrid with GridCells.Fixed(n) or Adaptive(minSize) wraps items into a grid.",
  },
  example: {
    code: `@Composable
fun Gallery() {
    LazyVerticalGrid(
        columns = GridCells.Fixed(2)
    ) {
        items(photos) { photo ->
            Image()
        }
    }
}`,
    explain:
      "columns = GridCells.Fixed(2) makes a 2-column grid; items(...) fills it row by row. Adaptive(120.dp) would instead fit as many ~120dp columns as the screen allows.",
  },
  mistakes: [
    {
      wrong: `LazyColumn {
    Row { Image(); Image() }   // ❌ manual grid is fiddly & not lazy per cell
}`,
      right: `LazyVerticalGrid(columns = GridCells.Fixed(2)) {
    items(photos) { Image() }  // ✅ real grid, lazily built
}`,
      note: "Hand-rolling rows inside a column works for tiny cases but doesn't scale. Use a grid for real grids.",
    },
  ],
  quiz: [
    {
      q: "How do you make a fixed 3-column grid?",
      options: [
        "GridCells.Adaptive(3)",
        "columns = GridCells.Fixed(3)",
        "Row(3)",
        "Modifier.grid(3)",
      ],
      answer: 1,
      explain: "GridCells.Fixed(3) requests exactly three columns.",
    },
    {
      q: "What does GridCells.Adaptive(80.dp) do?",
      options: [
        "Always makes 80 columns",
        "Fits as many ~80dp-wide columns as the space allows",
        "Sets the row height",
        "Disables scrolling",
      ],
      answer: 1,
      explain: "Adaptive fits as many columns of at least that size as will fit, adapting to screen width.",
    },
  ],
  aiContext:
    "The learner is learning Grid Layouts. Use the 'chocolate box' and 'egg carton' analogies. Key API: LazyVerticalGrid with GridCells.Fixed(n) vs Adaptive(minSize). The live preview can't render grids, so there's no playground — rely on the example. They know LazyColumn and LazyRow.",
};

export const listLessons = {
  lessonLazyColumn,
  lessonLazyRow,
  lessonGrids,
};
