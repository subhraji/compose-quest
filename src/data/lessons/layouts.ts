import type { Lesson } from "../types";

// ════════════════════════════════════════════════════════════
//  LAYOUTS — arranging things on screen
//  (Column lives in roadmap.ts as the flagship layout lesson.)
// ════════════════════════════════════════════════════════════

export const lessonRow: Lesson = {
  id: "row",
  slug: "row",
  title: "Row — side by side",
  emoji: "➡️",
  estMinutes: 8,
  authored: true,
  objective: "Use Row to arrange elements left-to-right.",
  beginner:
    "A **Row** places its children **next to each other**, from left to right. You write your Composables inside its `{ }` block and they line up horizontally in the order you write them. Row is the horizontal twin of **Column** — same idea, different direction.",
  child:
    "A Row is like people standing in a line holding hands 🤝. The first person is on the left, the next stands to their right, and so on — everyone side by side.",
  analogy:
    "Think of books standing upright on a shelf. Each book sits to the right of the previous one. A Row lines up your buttons, icons, and text the same way.",
  visual: {
    metaphor: "stack",
    title: "Left to right",
    caption:
      "Children of a Row line up horizontally, in the exact order you write them in code.",
  },
  example: {
    code: `@Composable
fun Toolbar() {
    Row {
        Icon()
        Text("Inbox")
        Text("Sent")
    }
}`,
    explain:
      "All three children are inside the Row's braces, so they sit beside each other from left to right — icon first, then the two labels.",
  },
  playground: `@Composable
fun Toolbar() {
    Row {
        Text("Home")
        Text("Search")
        Text("Profile")
    }
}`,
  mistakes: [
    {
      wrong: `Column {        // ❌ stacks vertically
    Text("A")
    Text("B")
}`,
      right: `Row {           // ✅ places side by side
    Text("A")
    Text("B")
}`,
      note: "Column goes top-to-bottom; Row goes left-to-right. Pick the one that matches the direction you want.",
    },
  ],
  quiz: [
    {
      q: "How does a Row arrange its children?",
      options: ["Top to bottom", "Left to right", "In a grid", "Diagonally"],
      answer: 1,
      explain: "A Row lays children out horizontally, left to right, in code order.",
    },
    {
      q: "Which layout would you use for a toolbar of side-by-side icons?",
      options: ["Column", "Row", "Spacer", "Text"],
      answer: 1,
      explain: "Side-by-side means horizontal, which is exactly what Row does.",
    },
  ],
  aiContext:
    "The learner is learning Row. Use the 'people holding hands in a line' and 'books on a shelf' analogies. Contrast directly with Column (vertical), which they already know. They know Column, Text, Button, Icon, Image.",
};

export const lessonBox: Lesson = {
  id: "box",
  slug: "box",
  title: "Box — stacking on top",
  emoji: "🃏",
  estMinutes: 8,
  authored: true,
  objective: "Use Box to overlap elements like layers.",
  beginner:
    "A **Box** lets its children **overlap**, stacking on top of one another like layers. The first child is on the bottom, later children sit on top. You use `contentAlignment` to position children within the Box (e.g. centered, or in a corner). It's perfect for badges, overlays, and text on top of an image.",
  child:
    "A Box is like stacking transparent sheets 🃏 on top of each other. You can see through them, and each new sheet lays over the one below — so things can sit right on top of each other.",
  analogy:
    "Think of a poster with a 'SALE!' sticker slapped on the corner. The poster is the bottom layer, the sticker sits on top. A Box overlaps things exactly like that.",
  visual: {
    metaphor: "generic",
    title: "Layers on top of each other",
    caption:
      "A Box overlaps its children. Use contentAlignment to place them (center, corners, etc.).",
  },
  example: {
    code: `@Composable
fun Avatar() {
    Box {
        Image(modifier = Modifier.size(80.dp))
        Text("3")   // a little badge on top
    }
}`,
    explain:
      "The Image is drawn first (bottom layer) and the Text is drawn on top of it. Both share the same space instead of stacking vertically.",
  },
  playground: `@Composable
fun Avatar() {
    Box {
        Image(modifier = Modifier.size(80.dp))
        Text("NEW")
    }
}`,
  mistakes: [
    {
      wrong: `Column {        // ❌ badge ends up below the image
    Image()
    Text("3")
}`,
      right: `Box {           // ✅ badge overlaps the image
    Image()
    Text("3")
}`,
      note: "Column and Row never overlap their children — they place them apart. Only Box lets children share the same space.",
    },
  ],
  quiz: [
    {
      q: "What makes Box different from Column and Row?",
      options: [
        "It can only hold one child",
        "It overlaps its children in the same space",
        "It scrolls automatically",
        "It only works with images",
      ],
      answer: 1,
      explain: "Box stacks children on top of each other (layers), while Column/Row place them apart.",
    },
    {
      q: "Which Box parameter positions children inside it?",
      options: ["fontWeight", "contentAlignment", "onClick", "remember"],
      answer: 1,
      explain: "contentAlignment decides where children sit inside the Box (center, corners, etc.).",
    },
  ],
  aiContext:
    "The learner is learning Box. Use the 'transparent sheets' and 'sticker on a poster' analogies. Emphasize overlap vs. Column/Row's separate placement, and mention contentAlignment for positioning. They know Column, Row, Text, Image.",
};

export const lessonSpacer: Lesson = {
  id: "spacer",
  slug: "spacer",
  title: "Spacer",
  emoji: "↔️",
  estMinutes: 6,
  authored: true,
  objective: "Add empty space between elements.",
  beginner:
    "A **Spacer** is an empty, invisible Composable whose only job is to **take up space**. You give it a size with a modifier — `Modifier.height(16.dp)` inside a Column, or `Modifier.width(16.dp)` inside a Row — to push neighbouring elements apart. It draws nothing; it just reserves room.",
  child:
    "A Spacer is an invisible cushion 🛋️. You can't see it, but it sits between two things and gently pushes them apart so they're not squished together.",
  analogy:
    "It's like leaving an empty seat between you and a stranger at the cinema. Nothing is in that seat, but the gap keeps a comfortable distance.",
  visual: {
    metaphor: "generic",
    title: "Invisible space",
    caption:
      "A Spacer draws nothing — it just reserves width or height to separate its neighbours.",
  },
  example: {
    code: `@Composable
fun Stats() {
    Row {
        Text("Wins: 12")
        Spacer(modifier = Modifier.width(24.dp))
        Text("Losses: 3")
    }
}`,
    explain:
      "The Spacer sits between the two Texts and reserves 24dp of horizontal space, pushing them apart cleanly.",
  },
  playground: `@Composable
fun Stats() {
    Column {
        Text("Top")
        Spacer(modifier = Modifier.height(40.dp))
        Text("Bottom")
    }
}`,
  mistakes: [
    {
      wrong: `Spacer()        // ❌ no size — reserves nothing`,
      right: `Spacer(modifier = Modifier.height(16.dp))  // ✅ reserves 16dp`,
      note: "A Spacer with no size takes up no room. Always give it a width or height.",
    },
    {
      wrong: `Row {
    Spacer(modifier = Modifier.height(16.dp))  // ❌ height in a Row does nothing horizontally
}`,
      right: `Row {
    Spacer(modifier = Modifier.width(16.dp))   // ✅ width separates items in a Row
}`,
      note: "In a Row use width to push items apart; in a Column use height.",
    },
  ],
  quiz: [
    {
      q: "What does a Spacer draw on screen?",
      options: ["A line", "A box", "Nothing — it's invisible", "An icon"],
      answer: 2,
      explain: "A Spacer draws nothing; it only reserves space to separate other elements.",
    },
    {
      q: "Inside a Column, which modifier makes a Spacer separate items?",
      options: ["Modifier.width", "Modifier.height", "Modifier.background", "Modifier.clickable"],
      answer: 1,
      explain: "A Column stacks vertically, so height creates the vertical gap.",
    },
  ],
  aiContext:
    "The learner is learning Spacer. Use the 'invisible cushion' and 'empty cinema seat' analogies. Key point: width separates items in a Row, height in a Column. They know Column, Row, and basic modifiers like size.",
};

export const lessonAlignment: Lesson = {
  id: "alignment",
  slug: "alignment",
  title: "Alignment",
  emoji: "🎯",
  estMinutes: 8,
  authored: true,
  objective: "Position children (start, center, end).",
  beginner:
    "**Alignment** controls where children sit along the *cross axis* — the direction opposite to how a layout stacks. In a **Column** (stacks vertically) you set `horizontalAlignment` to push children left, center, or right. In a **Row** (stacks horizontally) you set `verticalAlignment` to push them top, center, or bottom. Inside a **Box** you use `contentAlignment`.",
  child:
    "Alignment is deciding whether your things hug the **left** wall, sit in the **middle**, or line up on the **right** 🎯 — like choosing where to tape a poster on a wall.",
  analogy:
    "Think of arranging photos on a fridge. You can push them all to the left edge, center them neatly, or shove them to the right. Alignment is that left/center/right choice.",
  visual: {
    metaphor: "generic",
    title: "Where children sit across the layout",
    caption:
      "Column → horizontalAlignment (left/center/right). Row → verticalAlignment (top/center/bottom).",
  },
  example: {
    code: `@Composable
fun Centered() {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text("I'm centered")
        Text("So am I")
    }
}`,
    explain:
      "Because the Column's horizontalAlignment is CenterHorizontally, every child is centered left-to-right instead of hugging the start edge.",
  },
  mistakes: [
    {
      wrong: `Column(verticalAlignment = ...)   // ❌ Column has no verticalAlignment`,
      right: `Column(horizontalAlignment = Alignment.CenterHorizontally)  // ✅`,
      note: "Column controls the horizontal placement of its children (the cross axis); Row controls the vertical placement. Don't mix them up.",
    },
  ],
  quiz: [
    {
      q: "Which property centers children left-to-right in a Column?",
      options: ["verticalArrangement", "horizontalAlignment", "contentScale", "fontWeight"],
      answer: 1,
      explain: "A Column stacks vertically, so its cross axis is horizontal — set horizontalAlignment.",
    },
    {
      q: "Alignment controls position along which axis?",
      options: ["The main (stacking) axis", "The cross axis", "Both equally", "Neither"],
      answer: 1,
      explain: "Alignment positions children on the cross axis; spacing along the main axis is Arrangement's job.",
    },
  ],
  aiContext:
    "The learner is learning Alignment. Use the 'taping a poster left/center/right' analogy. Crucial pairing: Column→horizontalAlignment, Row→verticalAlignment, Box→contentAlignment. Distinguish Alignment (cross axis) from Arrangement (main axis), which is the next lesson. They know Column, Row, Box.",
};

export const lessonArrangement: Lesson = {
  id: "arrangement",
  slug: "arrangement",
  title: "Arrangement",
  emoji: "📊",
  estMinutes: 8,
  authored: true,
  objective: "Distribute space between children.",
  beginner:
    "**Arrangement** controls how children are spread out along the *main axis* — the direction a layout stacks. In a **Column** you set `verticalArrangement`; in a **Row** you set `horizontalArrangement`. Options like `Arrangement.SpaceBetween`, `SpaceAround`, `SpaceEvenly`, and `Center` decide how leftover space is shared between and around the children.",
  child:
    "Arrangement is how you spread your toys out on a shelf 📊 — bunched together in the middle, pushed to the ends, or spaced out evenly so each has the same gap.",
  analogy:
    "Think of seating guests on a long bench. You could squeeze them together at one end, center them, or spread them out so the gaps between everyone are equal. Arrangement is that spacing decision.",
  visual: {
    metaphor: "generic",
    title: "How leftover space is shared",
    caption:
      "Arrangement spreads children along the stacking axis: Center, SpaceBetween, SpaceAround, SpaceEvenly.",
  },
  example: {
    code: `@Composable
fun NavBar() {
    Row(
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Text("Home")
        Text("Search")
        Text("Profile")
    }
}`,
    explain:
      "SpaceBetween pushes the first child to the far left and the last to the far right, splitting the remaining space evenly between them — a classic nav bar.",
  },
  mistakes: [
    {
      wrong: `Row(verticalArrangement = ...)    // ❌ Row arranges horizontally`,
      right: `Row(horizontalArrangement = Arrangement.SpaceBetween)  // ✅`,
      note: "Arrangement follows the stacking direction: Row → horizontalArrangement, Column → verticalArrangement.",
    },
  ],
  quiz: [
    {
      q: "Arrangement controls spacing along which axis?",
      options: ["The cross axis", "The main (stacking) axis", "Diagonally", "It controls color"],
      answer: 1,
      explain: "Arrangement distributes children along the main axis; cross-axis position is Alignment.",
    },
    {
      q: "Which arrangement pushes the first and last child to the edges?",
      options: ["Arrangement.Center", "Arrangement.SpaceBetween", "Alignment.Start", "Arrangement.spacedBy"],
      answer: 1,
      explain: "SpaceBetween anchors the ends and splits the gap evenly between the middle items.",
    },
  ],
  aiContext:
    "The learner is learning Arrangement. Use the 'guests on a bench' analogy. Pairing: Column→verticalArrangement, Row→horizontalArrangement. Contrast with Alignment (cross axis) from the previous lesson. They know Column, Row, Box, Alignment.",
};

export const layoutLessons = {
  lessonRow,
  lessonBox,
  lessonSpacer,
  lessonAlignment,
  lessonArrangement,
};
