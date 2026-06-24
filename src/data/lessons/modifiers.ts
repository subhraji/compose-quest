import type { Lesson } from "../types";

// ════════════════════════════════════════════════════════════
//  MODIFIERS — the chain that styles & positions everything
// ════════════════════════════════════════════════════════════

export const lessonPadding: Lesson = {
  id: "padding",
  slug: "padding",
  title: "Padding",
  emoji: "📦",
  estMinutes: 7,
  authored: true,
  objective: "Add inner spacing around content.",
  beginner:
    "**`Modifier.padding(...)`** adds empty space **around** an element's content, pushing it away from its edges. You pass a dp value: `padding(16.dp)` for all sides, or named sides like `padding(horizontal = 12.dp, vertical = 8.dp)`. Padding is part of the **Modifier chain** — the order you chain things matters.",
  child:
    "Padding is a soft pillow 📦 inside a box. It keeps the stuff inside from squishing right up against the walls, giving it room to breathe.",
  analogy:
    "Think of the white border around a framed photo (the mat). It separates the picture from the frame so things don't feel cramped. Padding is that breathing room.",
  visual: {
    metaphor: "generic",
    title: "Breathing room inside",
    caption: "Padding adds space between an element's edge and its content.",
  },
  example: {
    code: `@Composable
fun Tag() {
    Text(
        "Hello",
        modifier = Modifier
            .background(Color.Yellow)
            .padding(16.dp)
    )
}`,
    explain:
      "The background paints first, then 16dp of padding pushes the text inward — so the yellow extends beyond the letters on every side.",
  },
  playground: `@Composable
fun Tag() {
    Text(
        "Tap me",
        modifier = Modifier
            .background(Color.Yellow)
            .padding(20.dp)
    )
}`,
  mistakes: [
    {
      wrong: `Modifier
    .padding(16.dp)
    .background(Color.Yellow)  // ❌ background skips the padded area`,
      right: `Modifier
    .background(Color.Yellow)
    .padding(16.dp)            // ✅ color fills behind the padding`,
      note: "Modifier order matters. Put background BEFORE padding so the color fills the whole area including the padded space.",
    },
  ],
  quiz: [
    {
      q: "What does Modifier.padding do?",
      options: [
        "Adds space outside the element only",
        "Adds space around the content, inside the element",
        "Changes the text color",
        "Makes the element clickable",
      ],
      answer: 1,
      explain: "Padding reserves space around the content, pushing it in from the element's edges.",
    },
    {
      q: "Why does Modifier order matter for padding + background?",
      options: [
        "It doesn't matter",
        "Each modifier wraps the previous, so order changes what the color covers",
        "Padding can only be first",
        "Background ignores padding always",
      ],
      answer: 1,
      explain: "Modifiers apply in order; background before padding fills the padded area, after it doesn't.",
    },
  ],
  aiContext:
    "The learner is learning Modifier.padding. Use the 'pillow inside a box' and 'photo mat' analogies. Emphasize that Modifier chains apply in order — background-then-padding vs padding-then-background differ. They know basic layouts and that modifiers exist.",
};

export const lessonSize: Lesson = {
  id: "size",
  slug: "size",
  title: "Size (width / height)",
  emoji: "📏",
  estMinutes: 7,
  authored: true,
  objective: "Control how big an element is.",
  beginner:
    "Use modifiers to set an element's dimensions: **`Modifier.size(80.dp)`** for a square, or **`width(...)`** and **`height(...)`** separately. **`fillMaxWidth()`** stretches to the full available width, `fillMaxHeight()` to the full height, and `fillMaxSize()` to both. dp ('density-independent pixels') keeps sizes consistent across different screens.",
  child:
    "Size is telling something exactly how tall and wide to be 📏 — like saying 'be this big!' with your hands when describing the fish you caught.",
  analogy:
    "It's like ordering a pizza. You pick small, medium, or large (exact size), or you say 'as big as the whole table' (fillMaxSize). You're deciding how much room it takes.",
  visual: {
    metaphor: "generic",
    title: "Exact or fill",
    caption: "size/width/height set exact dp; fillMax* stretches to the space available.",
  },
  example: {
    code: `@Composable
fun Swatch() {
    Box(
        modifier = Modifier
            .size(100.dp)
            .background(Color.Blue)
    ) {}
}`,
    explain:
      "The Box has no children to size it, so size(100.dp) makes it a fixed 100×100 square, and background paints it blue.",
  },
  playground: `@Composable
fun Swatch() {
    Box(
        modifier = Modifier
            .size(120.dp)
            .background(Color.Magenta)
    ) {}
}`,
  mistakes: [
    {
      wrong: `Modifier.width(100)        // ❌ raw number`,
      right: `Modifier.width(100.dp)     // ✅ use dp`,
      note: "Sizes need a unit. Append .dp so Compose scales correctly on every screen density.",
    },
    {
      wrong: `Modifier.size(0.dp)        // ❌ zero size → invisible`,
      right: `Modifier.size(48.dp)       // ✅ give it real space`,
      note: "A zero (or unset) size can make an element invisible. Give it dimensions or content that has its own size.",
    },
  ],
  quiz: [
    {
      q: "What does Modifier.fillMaxWidth() do?",
      options: [
        "Sets a fixed width of 100dp",
        "Stretches the element to the full available width",
        "Centers the element",
        "Removes the width",
      ],
      answer: 1,
      explain: "fillMaxWidth makes the element as wide as the space its parent gives it.",
    },
    {
      q: "Why use dp instead of a plain number for sizes?",
      options: [
        "It looks nicer",
        "dp scales consistently across different screen densities",
        "Compose requires uppercase numbers",
        "There is no difference",
      ],
      answer: 1,
      explain: "dp (density-independent pixels) keeps your UI the same physical size on phones with different pixel densities.",
    },
  ],
  aiContext:
    "The learner is learning size/width/height/fillMax modifiers. Use the 'pizza size' analogy. Stress the .dp unit and fillMax* for stretching. They know layouts, padding, and background.",
};

export const lessonBackground: Lesson = {
  id: "background",
  slug: "background",
  title: "Background",
  emoji: "🎨",
  estMinutes: 7,
  authored: true,
  objective: "Paint a color or shape behind content.",
  beginner:
    "**`Modifier.background(Color.X)`** paints a color **behind** an element. You can pass a named color (`Color.Blue`), a custom one (`Color(0xFF6750A4)`), and even a `shape` (like `RoundedCornerShape(12.dp)`) to round the corners. Because it's a modifier, where it sits in the chain decides how much area it covers.",
  child:
    "Background is putting a colored sheet of paper 🎨 behind your thing, so it stands out instead of floating on plain white.",
  analogy:
    "It's like a highlighter behind text on a page — the words stay the same, but now there's a colored block making them pop.",
  visual: {
    metaphor: "generic",
    title: "Color behind content",
    caption: "background fills the element's area; combine with padding and shape for a card-like look.",
  },
  example: {
    code: `@Composable
fun Chip() {
    Text(
        "Sale",
        modifier = Modifier
            .background(Color.Green)
            .padding(horizontal = 12.dp, vertical = 6.dp)
    )
}`,
    explain:
      "background paints green across the element, then padding gives the text breathing room — together they form a little colored chip.",
  },
  playground: `@Composable
fun Chip() {
    Text(
        "Sale",
        modifier = Modifier
            .background(Color.Green)
            .padding(12.dp)
    )
}`,
  mistakes: [
    {
      wrong: `Modifier.background("blue")     // ❌ string`,
      right: `Modifier.background(Color.Blue) // ✅ Color value`,
      note: "background takes a Color value, not a text string. Use Color.Blue or Color(0xFF...).",
    },
  ],
  quiz: [
    {
      q: "What does Modifier.background do?",
      options: [
        "Sets the text color",
        "Paints a color (or shape) behind the element",
        "Adds a border",
        "Makes the element scrollable",
      ],
      answer: 1,
      explain: "background fills the area behind the content with a color or shape.",
    },
    {
      q: "How do you give a background rounded corners?",
      options: [
        "It's impossible",
        "Pass a shape like RoundedCornerShape(12.dp)",
        "Use fillMaxWidth()",
        "Add more padding",
      ],
      answer: 1,
      explain: "background accepts a shape argument; RoundedCornerShape rounds the painted area.",
    },
  ],
  aiContext:
    "The learner is learning Modifier.background. Use the 'colored sheet of paper' and 'highlighter' analogies. Mention Color values vs strings and passing a shape for rounded corners. They know size and padding, and that chain order matters.",
};

export const lessonBorder: Lesson = {
  id: "border",
  slug: "border",
  title: "Border",
  emoji: "🔲",
  estMinutes: 6,
  authored: true,
  objective: "Draw an outline around an element.",
  beginner:
    "**`Modifier.border(width, color)`** draws an outline around an element, e.g. `border(2.dp, Color.Gray)`. You can also pass a `shape` so the outline follows rounded corners. Like all modifiers, its place in the chain matters — border before padding hugs the content tightly; after padding it sits further out.",
  child:
    "Border is drawing a frame around a picture 🖼️ — a thin line all the way around the edge so it looks finished.",
  analogy:
    "Think of the white lines painted around a parking space. Nothing inside changes, but the outline clearly marks the boundary. A border does that to your element.",
  visual: {
    metaphor: "generic",
    title: "An outline around the edge",
    caption: "border(width, color) traces the element's boundary; add a shape to round it.",
  },
  example: {
    code: `@Composable
fun Outlined() {
    Text(
        "Verified",
        modifier = Modifier
            .border(2.dp, Color.Green)
            .padding(8.dp)
    )
}`,
    explain:
      "border draws a 2dp green outline, and padding (after it) pushes the text inward so it doesn't touch the line.",
  },
  playground: `@Composable
fun Outlined() {
    Text(
        "Verified",
        modifier = Modifier
            .border(2.dp, Color.Green)
            .padding(8.dp)
    )
}`,
  mistakes: [
    {
      wrong: `Modifier
    .padding(8.dp)
    .border(2.dp, Color.Green)  // ❌ outline hugs content, padding outside it`,
      right: `Modifier
    .border(2.dp, Color.Green)
    .padding(8.dp)              // ✅ outline outside, text padded within`,
      note: "Order changes where the border lands. Usually border-then-padding looks best so the text has room inside the outline.",
    },
  ],
  quiz: [
    {
      q: "What two things does Modifier.border usually take?",
      options: [
        "A width and a color",
        "A font and a size",
        "An image and a shape",
        "An onClick and a state",
      ],
      answer: 0,
      explain: "border(width, color) — how thick the line is and what color it is.",
    },
    {
      q: "How can a border follow rounded corners?",
      options: [
        "It can't",
        "Pass a shape argument like RoundedCornerShape",
        "Set fillMaxSize()",
        "Increase the width",
      ],
      answer: 1,
      explain: "Passing a shape makes the border trace that shape instead of a plain rectangle.",
    },
  ],
  aiContext:
    "The learner is learning Modifier.border. Use the 'frame around a picture' and 'parking space lines' analogies. Reinforce chain order (border vs padding placement) and the optional shape. They know padding, background, and size.",
};

export const lessonClickable: Lesson = {
  id: "clickable",
  slug: "clickable",
  title: "Clickable",
  emoji: "👆",
  estMinutes: 7,
  authored: true,
  objective: "Make any element respond to taps.",
  beginner:
    "**`Modifier.clickable { ... }`** turns **any** Composable — not just a Button — into something tappable. The lambda runs when the user taps it. This is how you make a whole Card, Row, image, or piece of text respond to a press. You'll often combine it with state so a tap changes something on screen.",
  child:
    "Clickable turns anything into a button 👆. Tap a picture, a word, a whole card — and something happens, just like pressing a real button.",
  analogy:
    "It's like making any object in a room 'pressable.' Normally only the light switch does something when you touch it, but clickable lets you wire up the lamp, the poster, even the wall to react to a tap.",
  visual: {
    metaphor: "generic",
    title: "Anything can be tapped",
    caption: "clickable { } attaches a tap action to any element, not only Buttons.",
  },
  example: {
    code: `@Composable
fun LikeCard() {
    var likes by remember { mutableStateOf(0) }
    Card(
        modifier = Modifier.clickable { likes++ }
    ) {
        Text("❤️ $likes likes — tap me")
    }
}`,
    explain:
      "The Card isn't a Button, but clickable makes the whole card tappable. Each tap runs likes++, and because likes is state, the text updates instantly.",
  },
  mistakes: [
    {
      wrong: `Text("Tap")
// ❌ plain Text does nothing when tapped`,
      right: `Text("Tap", modifier = Modifier.clickable { /* ... */ })  // ✅ now it reacts`,
      note: "Composables aren't interactive by default. Add Modifier.clickable to make them respond to taps.",
    },
  ],
  quiz: [
    {
      q: "What does Modifier.clickable let you do?",
      options: [
        "Only style buttons",
        "Make any Composable respond to taps",
        "Change the text size",
        "Scroll a list",
      ],
      answer: 1,
      explain: "clickable adds a tap action to any element — cards, rows, text, images, anything.",
    },
    {
      q: "What usually goes inside the clickable { } lambda?",
      options: [
        "The element's color",
        "The code to run when it's tapped",
        "A list of children",
        "The element's size",
      ],
      answer: 1,
      explain: "The lambda is the action performed on tap — often updating some state.",
    },
  ],
  aiContext:
    "The learner is learning Modifier.clickable. Use the 'make anything a button' and 'wire up any object in a room' analogies. Tie it back to state (remember/mutableStateOf) since taps usually change state. They know Button, state, and basic modifiers.",
};

export const lessonWeight: Lesson = {
  id: "weight",
  slug: "weight",
  title: "Weight",
  emoji: "⚖️",
  estMinutes: 8,
  authored: true,
  objective: "Share leftover space proportionally in Row/Column.",
  beginner:
    "**`Modifier.weight(...)`** (used only inside a Row or Column) tells a child how much of the **leftover space** to take. A child with `weight(1f)` and another with `weight(2f)` split the remaining space 1:2. Weight is how you build flexible layouts — e.g. a sidebar that takes 1 share and content that takes 3.",
  child:
    "Weight is splitting a pizza fairly ⚖️. If one friend gets 1 slice's worth and another gets 2, weight makes sure they each get exactly their fair share of what's left.",
  analogy:
    "Imagine dividing a chocolate bar among kids by how hungry they are. One kid rated '1', another '3' — they get pieces in that ratio. Weight divides leftover space the same proportional way.",
  visual: {
    metaphor: "generic",
    title: "Fair shares of leftover space",
    caption: "weight(1f) vs weight(2f) splits remaining Row/Column space proportionally.",
  },
  example: {
    code: `@Composable
fun SplitBar() {
    Row {
        Text(
            "Left",
            modifier = Modifier.weight(1f)
        )
        Text(
            "Right (bigger)",
            modifier = Modifier.weight(2f)
        )
    }
}`,
    explain:
      "The Row's leftover width is split 1:2 — the right Text gets twice the space of the left one. Change the numbers to change the ratio.",
  },
  mistakes: [
    {
      wrong: `Box {
    Text("A", modifier = Modifier.weight(1f))  // ❌ weight needs Row/Column
}`,
      right: `Row {
    Text("A", modifier = Modifier.weight(1f))  // ✅ valid inside Row
}`,
      note: "weight only works inside a Row or Column — it has no meaning in a Box.",
    },
  ],
  quiz: [
    {
      q: "Where can Modifier.weight be used?",
      options: [
        "Anywhere",
        "Only inside a Row or Column",
        "Only inside a Box",
        "Only on Text",
      ],
      answer: 1,
      explain: "weight is a Row/Column scope modifier; it divides their leftover space.",
    },
    {
      q: "Two children have weight(1f) and weight(3f). How is leftover space split?",
      options: ["Equally", "1 to 3", "3 to 1", "It's ignored"],
      answer: 1,
      explain: "Space is shared proportionally to the weights, so 1:3.",
    },
  ],
  aiContext:
    "The learner is learning Modifier.weight. Use the 'splitting a pizza fairly' analogy. Key points: only valid in Row/Column, divides LEFTOVER space proportionally (weight(1f) vs weight(2f)). They know Row, Column, and size modifiers.",
};

export const lessonOffset: Lesson = {
  id: "offset",
  slug: "offset",
  title: "Offset",
  emoji: "↗️",
  estMinutes: 6,
  authored: true,
  objective: "Nudge an element from its position.",
  beginner:
    "**`Modifier.offset(x, y)`** shifts an element from where it would normally sit, by a dp amount horizontally and vertically — e.g. `offset(x = 8.dp, y = (-4).dp)`. Unlike padding, offset **doesn't change the layout space** around the element; it just visually nudges it, so it can even overlap neighbours. Great for badges and subtle adjustments.",
  child:
    "Offset is scooting something a little to the side ↗️ — like nudging a sticker a bit to the right after you've already placed it, without moving anything else.",
  analogy:
    "Think of sliding a magnet on a fridge a couple of centimetres. The other magnets don't shuffle to make room — your magnet just moves and might overlap one. Offset nudges like that.",
  visual: {
    metaphor: "generic",
    title: "A visual nudge",
    caption: "offset shifts an element by x/y dp without reserving extra layout space.",
  },
  example: {
    code: `@Composable
fun Nudged() {
    Box(
        modifier = Modifier
            .offset(x = 20.dp, y = 10.dp)
            .size(60.dp)
            .background(Color.Cyan)
    ) {}
}`,
    explain:
      "The Box is drawn 20dp right and 10dp down from its normal spot. Its neighbours don't move to accommodate it — only its visual position changes.",
  },
  playground: `@Composable
fun Nudged() {
    Box(
        modifier = Modifier
            .offset(x = 24.dp, y = 8.dp)
            .size(60.dp)
            .background(Color.Cyan)
    ) {}
}`,
  mistakes: [
    {
      wrong: `Modifier.offset(20.dp)  // ❌ which axis?`,
      right: `Modifier.offset(x = 20.dp, y = 0.dp)  // ✅ name the axes`,
      note: "Name x and y so it's clear which direction you're nudging. Negative values move left/up.",
    },
    {
      wrong: `// using offset to add spacing between items`,
      right: `// use padding or Spacer for spacing; offset for visual nudges`,
      note: "offset doesn't reserve layout space, so it's the wrong tool for separating items — use padding or Spacer for that.",
    },
  ],
  quiz: [
    {
      q: "How is offset different from padding?",
      options: [
        "They're identical",
        "offset nudges visually without reserving space; padding reserves space",
        "padding only works on text",
        "offset changes color",
      ],
      answer: 1,
      explain: "padding pushes neighbours away by reserving space; offset just shifts the element visually.",
    },
    {
      q: "What does a negative offset value do?",
      options: ["Throws an error", "Moves the element left or up", "Doubles the size", "Nothing"],
      answer: 1,
      explain: "Negative x moves left, negative y moves up.",
    },
  ],
  aiContext:
    "The learner is learning Modifier.offset. Use the 'nudging a sticker' and 'sliding a fridge magnet' analogies. Key contrast: offset is visual-only and doesn't reserve space (unlike padding). They know padding, size, and Spacer.",
};

export const modifierLessons = {
  lessonPadding,
  lessonSize,
  lessonBackground,
  lessonBorder,
  lessonClickable,
  lessonWeight,
  lessonOffset,
};
