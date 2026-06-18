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
//  COMPOSE FUNDAMENTALS — fully authored beginner lessons
// ════════════════════════════════════════════════════════════

const lessonComposableFunctions: Lesson = {
  id: "composable-functions",
  slug: "composable-functions",
  title: "Composable Functions",
  emoji: "🧩",
  estMinutes: 8,
  authored: true,
  objective: "Write reusable @Composable functions that describe UI.",
  beginner:
    "A **Composable function** is just a normal Kotlin function marked with **`@Composable`** that describes a piece of UI. Because it's a function, you can **call it from other Composables**, give it **parameters** to make it flexible, and **reuse** it as many times as you want. You build a whole screen by combining lots of small Composables — like assembling something out of little pieces.",
  child:
    "Think of LEGO bricks 🧱. Each Composable is one little brick of screen — a button here, some text there. Once you've made a brick, you can snap it in anywhere, again and again, to build something big. You don't carve a new brick every time; you reuse the one you made.",
  analogy:
    "It's like a cookie cutter 🍪. You design the shape once, then stamp out as many cookies as you like. A Composable function is the cutter; every time you call it, you get another cookie (another piece of UI) — and you can change the sprinkles by passing it different parameters.",
  visual: {
    metaphor: "blueprint",
    title: "One recipe, reused everywhere",
    caption:
      "Define a Composable once, then call it wherever you need it — each call draws a fresh copy.",
  },
  example: {
    code: `@Composable
fun Greeting(name: String) {
    Text("Hello, $name!")
}

@Composable
fun Welcome() {
    Column {
        Greeting("Ada")
        Greeting("Linus")
    }
}`,
    explain:
      "Greeting takes a name parameter, so it's reusable. Welcome calls it twice with different names — two greetings from one definition. That's the whole superpower: write once, reuse anywhere, customize with parameters.",
  },
  playground: `@Composable
fun ProfileCard() {
    Column {
        Text("Ada Lovelace", fontSize = 20.sp, fontWeight = FontWeight.Bold)
        Text("Mathematician", color = Color.Gray)
    }
}`,
  mistakes: [
    {
      wrong: `fun ProfileCard() {     // ❌ missing @Composable
    Text("Ada")
}`,
      right: `@Composable             // ✅ now it can describe UI
fun ProfileCard() {
    Text("Ada")
}`,
      note: "Only functions marked @Composable can contain UI like Text or Button.",
    },
    {
      wrong: `@Composable
fun Greeting() {        // ❌ hard-coded, not reusable
    Text("Hello, Ada!")
}`,
      right: `@Composable
fun Greeting(name: String) {   // ✅ parameter makes it reusable
    Text("Hello, $name!")
}`,
      note: "Passing data in as a parameter lets you reuse the same Composable for many cases.",
    },
  ],
  quiz: [
    {
      q: "What makes a function a Composable?",
      options: ["It returns a View", "The @Composable annotation", "Its name starts with a capital letter", "It lives in MainActivity"],
      answer: 1,
      explain:
        "The @Composable annotation is what lets a function describe UI and be called by other Composables.",
    },
    {
      q: "Why give a Composable parameters?",
      options: [
        "To make it run faster",
        "So one Composable can be reused with different data",
        "Parameters are required by Kotlin",
        "To connect to the internet",
      ],
      answer: 1,
      explain:
        "Parameters make a Composable flexible and reusable — like a cookie cutter you feed different ingredients.",
    },
  ],
  aiContext:
    "The learner is on 'Composable Functions'. Lean on the LEGO-brick and cookie-cutter analogies. Emphasize: @Composable marks UI functions, and parameters make them reusable. They already know what Compose is.",
};

const lessonText: Lesson = {
  id: "text",
  slug: "text",
  title: "Text",
  emoji: "🔤",
  estMinutes: 7,
  authored: true,
  objective: "Display and style text on screen.",
  beginner:
    "**`Text`** is the Composable that shows words on screen. The simplest version is just `Text(\"Hello\")`. You can style it with parameters: **`fontSize`** (in `.sp`), **`color`** (like `Color.Gray`), and **`fontWeight`** (like `FontWeight.Bold`). Mix these to make headings, captions, labels — anything made of words.",
  child:
    "Text is how your app *talks*. 🗣️ You hand it some words and it writes them on the screen. And just like a marker set, you can make the words big, tiny, bold, or a different color.",
  analogy:
    "Think of a label maker. You type the words, then pick the size and style of the sticker. `Text` is the label maker for your app — same words, but you choose how they look.",
  example: {
    code: `@Composable
fun Headline() {
    Text(
        text = "Welcome!",
        fontSize = 24.sp,
        fontWeight = FontWeight.Bold,
        color = Color.Blue
    )
}`,
    explain:
      "One Text, fully styled: 24sp makes it large, FontWeight.Bold makes it heavy, and Color.Blue paints it blue. Remove a parameter and Text falls back to a sensible default.",
  },
  playground: `@Composable
fun Demo() {
    Column {
        Text("Big and bold", fontSize = 24.sp, fontWeight = FontWeight.Bold)
        Text("Small and gray", fontSize = 14.sp, color = Color.Gray)
    }
}`,
  mistakes: [
    {
      wrong: `Text(fontSize = 20.sp)    // ❌ no text to show`,
      right: `Text("Hello", fontSize = 20.sp)   // ✅ give it words`,
      note: "Text always needs the words to display — either as the first value or text = \"...\".",
    },
    {
      wrong: `Text("Hi", fontSize = 20)      // ❌ missing .sp`,
      right: `Text("Hi", fontSize = 20.sp)   // ✅ sizes use .sp`,
      note: "Font sizes are measured in sp (scalable pixels), so write 20.sp, not 20.",
    },
  ],
  quiz: [
    {
      q: "Which unit is used for font size in Compose?",
      options: ["px", "dp", "sp", "pt"],
      answer: 2,
      explain: "Text sizes use sp (scalable pixels) so they respect the user's font-size settings.",
    },
    {
      q: "How do you make Text bold?",
      options: ["bold = true", "fontWeight = FontWeight.Bold", "style = Bold", "Text.bold()"],
      answer: 1,
      explain: "Pass fontWeight = FontWeight.Bold to make the text heavier.",
    },
  ],
  aiContext:
    "The learner is on 'Text'. Cover fontSize (.sp), color, and fontWeight. Use the label-maker analogy. Keep it concrete; encourage tweaking the playground values.",
};

const lessonButton: Lesson = {
  id: "button",
  slug: "button",
  title: "Button",
  emoji: "🔘",
  estMinutes: 8,
  authored: true,
  objective: "Add tappable buttons that run code on click.",
  beginner:
    "A **`Button`** is something the user can tap. You give it an **`onClick`** — a little block of code that runs each time it's pressed — and you put the button's label (usually a `Text`) inside its `{ }`. Buttons are how your UI *does* things: change a value, move to a new screen, submit a form.",
  child:
    "A button is a doorbell. 🔔 When you press it, something happens — a sound, a light, a surprise. In an app you decide what happens: maybe a number goes up, or a new picture appears.",
  analogy:
    "Think of a light switch. Flipping it (the tap) runs an action (the light turns on). The `onClick` is the wiring behind the switch that decides what the flip actually does.",
  example: {
    code: `@Composable
fun LikeButton() {
    var likes by remember { mutableStateOf(0) }
    Button(onClick = { likes++ }) {
        Text("👍 $likes")
    }
}`,
    explain:
      "likes is remembered state starting at 0. Each tap runs onClick = { likes++ }, which bumps the number; Compose then redraws the label automatically. The Text inside the braces is what the button shows.",
  },
  playground: `@Composable
fun Counter() {
    var count by remember { mutableStateOf(0) }
    Column {
        Text("Pressed $count times")
        Button(onClick = { count++ }) {
            Text("Tap me")
        }
    }
}`,
  mistakes: [
    {
      wrong: `Button {                 // ❌ no onClick
    Text("Tap me")
}`,
      right: `Button(onClick = { count++ }) {   // ✅ define what a tap does
    Text("Tap me")
}`,
      note: "A button needs an onClick so it knows what to do when pressed.",
    },
    {
      wrong: `Button(onClick = { count++ })    // ❌ no label inside
`,
      right: `Button(onClick = { count++ }) {
    Text("Tap me")               // ✅ put the label in { }
}`,
      note: "Whatever you put inside the button's braces becomes its visible content.",
    },
  ],
  quiz: [
    {
      q: "What does the onClick parameter do?",
      options: [
        "Sets the button's color",
        "Runs code each time the button is tapped",
        "Names the button",
        "Makes the button bigger",
      ],
      answer: 1,
      explain: "onClick holds the code that runs whenever the user taps the button.",
    },
    {
      q: "Where does a button's label go?",
      options: ["In the onClick", "Inside the button's { } block", "In a separate Text file", "As the first number"],
      answer: 1,
      explain: "The content inside the button's braces (like a Text) is what the button displays.",
    },
  ],
  aiContext:
    "The learner is on 'Button'. Connect it to state they learned via remember/mutableStateOf — onClick changes state, UI updates. Use doorbell/light-switch analogies. Encourage tapping the live counter in the playground.",
};

const lessonImage: Lesson = {
  id: "image",
  slug: "image",
  title: "Image",
  emoji: "🖼️",
  estMinutes: 7,
  authored: true,
  objective: "Show pictures from resources or the internet.",
  beginner:
    "**`Image`** displays a picture. You tell it *what* to show with **`painter`** (for a drawable bundled in your app, via `painterResource(...)`) and always add a **`contentDescription`** so screen readers can describe it. Use a **`Modifier`** to control its **size** and shape — for example `Modifier.size(120.dp)`.",
  child:
    "Image is how you put a photo or drawing on the screen. 📷 You point at the picture you want, and the app shows it — and you can say how big it should be.",
  analogy:
    "It's like sticking a photo into a frame on the wall. `painter` is the photo, the `Modifier.size` is the frame's size, and `contentDescription` is the little caption underneath that describes it for anyone who can't see it.",
  example: {
    code: `@Composable
fun Avatar() {
    Image(
        painter = painterResource(R.drawable.profile),
        contentDescription = "Profile photo",
        modifier = Modifier.size(120.dp)
    )
}`,
    explain:
      "painterResource loads a drawable from your app's resources. contentDescription makes it accessible. Modifier.size(120.dp) keeps it a tidy 120×120. (In the preview we show a stand-in image so you can see the size change.)",
  },
  playground: `@Composable
fun Photo() {
    Image(
        painter = painterResource(R.drawable.sample),
        contentDescription = "A sample picture",
        modifier = Modifier.size(140.dp)
    )
}`,
  mistakes: [
    {
      wrong: `Image(
    painter = painterResource(R.drawable.pic)
)   // ❌ no contentDescription`,
      right: `Image(
    painter = painterResource(R.drawable.pic),
    contentDescription = "A friendly dog"   // ✅ accessible
)`,
      note: "Always give a contentDescription so screen readers can describe the image (use null only for purely decorative images).",
    },
  ],
  quiz: [
    {
      q: "What is contentDescription used for?",
      options: [
        "Choosing the image color",
        "Helping screen readers describe the image",
        "Setting the image size",
        "Loading the image faster",
      ],
      answer: 1,
      explain: "contentDescription provides accessible text so screen-reader users know what the image shows.",
    },
    {
      q: "How do you control how big an Image is?",
      options: ["fontSize", "A Modifier like Modifier.size(...)", "imageScale", "You can't change it"],
      answer: 1,
      explain: "Size (and many other visual properties) are set with a Modifier, e.g. Modifier.size(120.dp).",
    },
  ],
  aiContext:
    "The learner is on 'Image'. Cover painter/painterResource, contentDescription (accessibility), and sizing via Modifier. Use the photo-in-a-frame analogy. The live preview uses a placeholder image.",
};

const lessonIcon: Lesson = {
  id: "icon",
  slug: "icon",
  title: "Icon",
  emoji: "⭐",
  estMinutes: 6,
  authored: true,
  objective: "Use Material icons as small symbols.",
  beginner:
    "An **`Icon`** is a small, simple symbol — a heart, a star, a settings gear. Compose ships with a big set of **Material icons** you reach through `Icons.Default.…`. Like images, an icon takes a **`contentDescription`** for accessibility, and you can tint or size it with parameters and modifiers.",
  child:
    "Icons are tiny pictures ⭐ that mean something at a glance — a heart for 'like', a trash can for 'delete'. They help people understand a button without reading any words.",
  analogy:
    "Think of road signs. A little symbol instantly tells you 'stop' or 'food ahead' without a sentence. Icons are your app's road signs — small, clear, and universal.",
  example: {
    code: `@Composable
fun FavoriteIcon() {
    Icon(
        imageVector = Icons.Default.Favorite,
        contentDescription = "Add to favorites"
    )
}`,
    explain:
      "Icons.Default.Favorite is a built-in heart symbol. contentDescription tells assistive tech what it means. You'd often place an Icon inside a Button to make an icon button.",
  },
  playground: `@Composable
fun Faves() {
    Row {
        Icon(Icons.Default.Star, contentDescription = "star 1")
        Icon(Icons.Default.Star, contentDescription = "star 2")
        Icon(Icons.Default.Star, contentDescription = "star 3")
    }
}`,
  mistakes: [
    {
      wrong: `Icon(Icons.Default.Star)    // ❌ no contentDescription`,
      right: `Icon(
    Icons.Default.Star,
    contentDescription = "Rating star"   // ✅
)`,
      note: "Give meaningful icons a contentDescription; use null only when the icon is purely decorative.",
    },
  ],
  quiz: [
    {
      q: "Where do Compose's built-in icons come from?",
      options: ["Icons.Default.…", "The internet only", "You must draw each one", "Color.Icons"],
      answer: 0,
      explain: "Material icons are available through Icons.Default.… (and other icon sets).",
    },
    {
      q: "What's a common place to put an Icon?",
      options: ["Inside a Button to make an icon button", "Only in the app manifest", "Inside a String", "Nowhere — icons stand alone"],
      answer: 0,
      explain: "Icons are frequently placed inside Buttons (or next to Text) to label actions clearly.",
    },
  ],
  aiContext:
    "The learner is on 'Icon'. Cover Icons.Default.…, contentDescription, and that icons often live inside buttons. Use the road-sign analogy. The preview renders icons as small star symbols.",
};

const lessonMaterialBasics: Lesson = {
  id: "material-basics",
  slug: "material-basics",
  title: "Material Design Basics",
  emoji: "🎨",
  estMinutes: 9,
  authored: true,
  objective: "Understand Material theming: colors, shapes, typography.",
  beginner:
    "**Material Design** is Google's design system, and Compose has it built in via **`MaterialTheme`**. It bundles three things your whole app shares: a **color** scheme, **typography** (text styles), and **shapes** (corner roundness). Wrapping your app in a `MaterialTheme` means components like `Button` and `Surface` automatically pick up a consistent, polished look.",
  child:
    "Material is like a box of matching crayons. 🖍️ Instead of every page using random colors and fonts, everything shares the same nice set — so your whole app looks like it belongs together.",
  analogy:
    "Think of a school uniform. Once the school picks the colors and style, every student matches automatically. `MaterialTheme` is that uniform for your app — set it once, and all your components dress the same.",
  example: {
    code: `@Composable
fun ThemedCard() {
    Surface {
        Column {
            Text("Material Design", fontWeight = FontWeight.Bold)
            Text("Colors, type, and shapes — all consistent.", color = Color.Gray, fontSize = 14.sp)
        }
    }
}`,
    explain:
      "Surface is a Material container — it provides a background and elevation that follow the theme. Inside it we stack a bold title and a softer subtitle, so the card reads as one tidy unit.",
  },
  playground: `@Composable
fun ThemedCard() {
    Surface {
        Column {
            Text("Material Design", fontSize = 18.sp, fontWeight = FontWeight.Bold)
            Text("Everything matches automatically.", color = Color.Gray, fontSize = 14.sp)
        }
    }
}`,
  mistakes: [
    {
      wrong: `// ❌ hard-coding the same color everywhere
Text("Title", color = Color(0xFF6650A4))
Text("Body", color = Color(0xFF6650A4))`,
      right: `// ✅ define it once in your theme, reuse via MaterialTheme
MaterialTheme {
    Text("Title")
    Text("Body")
}`,
      note: "Put colors, type, and shapes in your theme so you change them in one place — not scattered across the app.",
    },
  ],
  quiz: [
    {
      q: "Which three things does MaterialTheme provide?",
      options: [
        "Colors, typography, and shapes",
        "Images, sounds, and videos",
        "Network, storage, and sensors",
        "Buttons, rows, and columns",
      ],
      answer: 0,
      explain: "MaterialTheme bundles a color scheme, typography, and shapes for a consistent look.",
    },
    {
      q: "Why use a theme instead of styling each component by hand?",
      options: [
        "It's required to compile",
        "So the whole app stays consistent and is easy to restyle in one place",
        "It makes the app smaller",
        "Themes load images",
      ],
      answer: 1,
      explain: "A shared theme keeps everything consistent and lets you restyle the whole app from one spot.",
    },
  ],
  aiContext:
    "The learner is on 'Material Design Basics'. Cover MaterialTheme bundling colors, typography, and shapes, and why centralizing styling matters. Use the matching-crayons / school-uniform analogies. They know Text, Button, and Surface basics.",
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
      lessonComposableFunctions,
      lessonText,
      lessonButton,
      lessonImage,
      lessonIcon,
      lessonMaterialBasics,
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
