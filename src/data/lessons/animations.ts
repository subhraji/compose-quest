import type { Lesson } from "../types";

// ════════════════════════════════════════════════════════════
//  ANIMATIONS — making the UI feel alive
// ════════════════════════════════════════════════════════════

export const lessonAnimatedVisibility: Lesson = {
  id: "animatedvisibility",
  slug: "animatedvisibility",
  title: "AnimatedVisibility",
  emoji: "👀",
  estMinutes: 9,
  authored: true,
  objective: "Fade/slide things in and out.",
  beginner:
    "**`AnimatedVisibility`** smoothly **shows and hides** content based on a boolean. Instead of an element popping in or vanishing, it animates the transition. You control how with `enter` and `exit` parameters — e.g. `enter = fadeIn()`, `exit = slideOutVertically()`. Wrap whatever you want to appear/disappear inside its content block.",
  child:
    "AnimatedVisibility makes things appear and disappear smoothly 👀 instead of popping. Like a magician fading something in gently, rather than it just blinking into existence.",
  analogy:
    "Think of theatre stage lights. The actor doesn't teleport on — the lights fade up so they ease into view, and fade down when the scene ends. AnimatedVisibility fades your UI in and out the same way.",
  visual: {
    metaphor: "generic",
    title: "Smoothly show & hide",
    caption: "AnimatedVisibility animates content in/out via enter and exit transitions.",
  },
  example: {
    code: `@Composable
fun Details(expanded: Boolean) {
    AnimatedVisibility(
        visible = expanded,
        enter = fadeIn(),
        exit = fadeOut()
    ) {
        Text("Here are the details!")
    }
}`,
    explain:
      "When expanded becomes true the Text fades in; when it becomes false it fades out. Swap fadeIn/fadeOut for slide or expand transitions to change the motion.",
  },
  mistakes: [
    {
      wrong: `if (expanded) {
    Text("Details")   // ❌ pops in/out, no animation
}`,
      right: `AnimatedVisibility(visible = expanded) {
    Text("Details")   // ✅ animated
}`,
      note: "A plain if shows/hides instantly. AnimatedVisibility animates the appearance and disappearance.",
    },
  ],
  quiz: [
    {
      q: "What does AnimatedVisibility do?",
      options: [
        "Changes text color",
        "Animates showing and hiding content based on a boolean",
        "Loads data from a server",
        "Creates a database",
      ],
      answer: 1,
      explain: "It smoothly animates content in and out instead of toggling it instantly.",
    },
    {
      q: "How do you customize how it appears and disappears?",
      options: [
        "With enter and exit parameters",
        "With a Modifier.color",
        "With remember",
        "You can't customize it",
      ],
      answer: 0,
      explain: "enter and exit take transitions like fadeIn()/slideOutVertically() to define the motion.",
    },
  ],
  aiContext:
    "The learner is learning AnimatedVisibility. Use the 'magician fading something in' and 'theatre stage lights' analogies. Key: visible boolean + enter/exit transitions (fadeIn, slideIn, etc.). Contrast with a plain if (instant). This stage has no live preview. They know state and recomposition.",
};

export const lessonAnimateAsState: Lesson = {
  id: "animate-as-state",
  slug: "animate-as-state",
  title: "animate*AsState",
  emoji: "🎢",
  estMinutes: 9,
  authored: true,
  objective: "Smoothly animate a value when it changes.",
  beginner:
    "**`animate*AsState`** functions (like `animateDpAsState`, `animateColorAsState`, `animateFloatAsState`) take a **target value** and give you back a value that **glides** to it whenever the target changes. You just point it at where you want to end up, and Compose handles every in-between frame. Perfect for size, color, or alpha that should ease instead of jump.",
  child:
    "animate*AsState is sliding to a new number instead of jumping to it 🎢. You say 'go to 100', and it smoothly rolls there rather than snapping instantly.",
  analogy:
    "Think of a thermostat dial easing to the new temperature, or a car's speedometer needle sweeping up rather than teleporting. You set the destination; the needle animates there on its own.",
  visual: {
    metaphor: "generic",
    title: "Glide to a target",
    caption: "Give a target value; animate*AsState animates the in-between frames automatically.",
  },
  example: {
    code: `@Composable
fun GrowingBox(big: Boolean) {
    val size by animateDpAsState(
        targetValue = if (big) 200.dp else 80.dp
    )
    Box(
        modifier = Modifier
            .size(size)
            .background(Color.Blue)
    ) {}
}`,
    explain:
      "size isn't set directly — it follows the target (200dp or 80dp). When big flips, the box smoothly grows or shrinks because animateDpAsState animates every frame between the two values.",
  },
  mistakes: [
    {
      wrong: `val size = if (big) 200.dp else 80.dp  // ❌ jumps instantly`,
      right: `val size by animateDpAsState(if (big) 200.dp else 80.dp)  // ✅ glides`,
      note: "A plain value snaps to the new number. animate*AsState interpolates smoothly to the target.",
    },
  ],
  quiz: [
    {
      q: "What do you give animate*AsState?",
      options: [
        "Every frame manually",
        "A target value to animate toward",
        "A network URL",
        "A database query",
      ],
      answer: 1,
      explain: "You provide the target; Compose animates the in-between values automatically.",
    },
    {
      q: "Which would you use to animate a size in dp?",
      options: [
        "animateColorAsState",
        "animateDpAsState",
        "rememberCoroutineScope",
        "collectAsState",
      ],
      answer: 1,
      explain: "animateDpAsState animates Dp values like sizes and offsets.",
    },
  ],
  aiContext:
    "The learner is learning animate*AsState. Use the 'speedometer needle sweeping' and 'thermostat dial' analogies. Key: provide a targetValue, get back a value that glides; variants animateDpAsState/animateColorAsState/animateFloatAsState. They just learned AnimatedVisibility.",
};

export const lessonTransitions: Lesson = {
  id: "transitions",
  slug: "transitions",
  title: "Transitions",
  emoji: "🦋",
  estMinutes: 10,
  authored: true,
  objective: "Animate several values together.",
  beginner:
    "When you want **multiple properties to animate together** off one state, use **`updateTransition`**. You give it a target state, then derive each animated value with `transition.animateDp`, `animateColor`, etc. All of them stay perfectly **in sync** and share the same timing — ideal for things like a card that simultaneously grows, changes color, and rotates when selected.",
  child:
    "Transitions animate several things at once 🦋 — like a caterpillar smoothly turning into a butterfly, where the color, shape, and size all change together in harmony.",
  analogy:
    "Think of a synchronized swimming team. One signal, and everyone moves together in time. updateTransition is that single signal driving many animations at once, all coordinated.",
  visual: {
    metaphor: "generic",
    title: "Many values, one state",
    caption: "updateTransition animates several properties together, all sharing timing.",
  },
  example: {
    code: `@Composable
fun SelectableCard(selected: Boolean) {
    val transition = updateTransition(selected, label = "card")
    val size by transition.animateDp(label = "size") {
        if (it) 160.dp else 100.dp
    }
    val color by transition.animateColor(label = "color") {
        if (it) Color.Green else Color.Gray
    }
    Box(
        modifier = Modifier.size(size).background(color)
    ) {}
}`,
    explain:
      "One transition drives both size and color off the same selected state, so they animate together with shared timing — no risk of them drifting out of sync.",
  },
  mistakes: [
    {
      wrong: `// separate animate*AsState calls you hope stay in sync
val size by animateDpAsState(...)
val color by animateColorAsState(...)  // ⚠️ independent timing`,
      right: `val transition = updateTransition(state)
val size by transition.animateDp { ... }
val color by transition.animateColor { ... }  // ✅ coordinated`,
      note: "For several values that must move together, updateTransition keeps them coordinated under one state and timeline.",
    },
  ],
  quiz: [
    {
      q: "When should you reach for updateTransition?",
      options: [
        "For a single value",
        "When several values should animate together off one state",
        "For network calls",
        "For database writes",
      ],
      answer: 1,
      explain: "updateTransition coordinates multiple animated values driven by the same state.",
    },
    {
      q: "What's the benefit over separate animate*AsState calls?",
      options: [
        "Less code only",
        "All the values stay in sync under one shared timing",
        "It's the only way to animate color",
        "It disables animation",
      ],
      answer: 1,
      explain: "A transition keeps multiple properties coordinated rather than independently timed.",
    },
  ],
  aiContext:
    "The learner is learning Transitions (updateTransition). Use the 'caterpillar to butterfly' and 'synchronized swimming' analogies. Key: one state drives many animateDp/animateColor values in sync. Contrast with independent animate*AsState. They just learned animate*AsState.",
};

export const lessonGestureAnimations: Lesson = {
  id: "gesture-animations",
  slug: "gesture-animations",
  title: "Gesture Animations",
  emoji: "🤙",
  estMinutes: 11,
  authored: true,
  objective: "React to drags and swipes with motion.",
  beginner:
    "Gesture animations make UI **follow the user's finger**. You read gestures with modifiers like `pointerInput { detectDragGestures { ... } }`, store the position in an **`Animatable`**, and update it as the finger moves. When the finger lifts, you can `animateTo` a resting spot (snap back, or fling). This is how you build draggable cards, swipe-to-dismiss, and sliders.",
  child:
    "Gesture animations make things follow your finger 🤙. Drag a card around and it sticks to your fingertip; let go and it springs back into place.",
  analogy:
    "Think of dragging a fridge magnet. While your finger's on it, it tracks your hand exactly; release it and it settles. Gesture animations tie motion directly to your touch like that.",
  visual: {
    metaphor: "generic",
    title: "Motion that follows touch",
    caption: "Read drags with pointerInput, track position in an Animatable, animateTo on release.",
  },
  example: {
    code: `@Composable
fun DraggableBox() {
    val offsetX = remember { Animatable(0f) }
    val scope = rememberCoroutineScope()
    Box(
        modifier = Modifier
            .offset { IntOffset(offsetX.value.toInt(), 0) }
            .pointerInput(Unit) {
                detectDragGestures { _, drag ->
                    scope.launch { offsetX.snapTo(offsetX.value + drag.x) }
                }
            }
            .size(80.dp)
            .background(Color.Magenta)
    ) {}
}`,
    explain:
      "detectDragGestures reports finger movement; each move updates the Animatable offset so the box tracks the finger. On release you could call offsetX.animateTo(0f) to spring it back.",
  },
  mistakes: [
    {
      wrong: `// updating a plain var on drag, then trying to animate it later  // ❌`,
      right: `// store position in an Animatable so you can snapTo while dragging and animateTo on release  // ✅`,
      note: "An Animatable lets you both jump (snapTo) during the drag and animate (animateTo) when the finger lifts — a plain value can't do the smooth settle.",
    },
  ],
  quiz: [
    {
      q: "Which modifier reads raw gestures like drags?",
      options: ["Modifier.background", "Modifier.pointerInput", "Modifier.padding", "Modifier.weight"],
      answer: 1,
      explain: "pointerInput (with detectDragGestures, etc.) gives you low-level gesture events.",
    },
    {
      q: "Why store the drag position in an Animatable?",
      options: [
        "It uses less memory",
        "So you can snapTo while dragging and animateTo (e.g. spring back) on release",
        "It's required for color",
        "It disables dragging",
      ],
      answer: 1,
      explain: "Animatable supports both instant updates during the drag and smooth animation to a resting value.",
    },
  ],
  aiContext:
    "The learner is learning Gesture Animations. Use the 'dragging a fridge magnet' analogy. Key pieces: pointerInput + detectDragGestures, Animatable for position, snapTo during drag / animateTo on release. They know offset modifier, coroutines (rememberCoroutineScope), and prior animation lessons.",
};

export const animationLessons = {
  lessonAnimatedVisibility,
  lessonAnimateAsState,
  lessonTransitions,
  lessonGestureAnimations,
};
