import type { Lesson } from "../types";

// ════════════════════════════════════════════════════════════
//  NAVIGATION — moving between screens
// ════════════════════════════════════════════════════════════

export const lessonNavHost: Lesson = {
  id: "navhost",
  slug: "navhost",
  title: "NavHost",
  emoji: "🚪",
  estMinutes: 11,
  authored: true,
  objective: "Set up navigation between screens.",
  beginner:
    "**`NavHost`** is the container that swaps screens in and out. You create a **`NavController`** with `rememberNavController()`, give the NavHost a `startDestination`, and inside it list each screen with `composable(\"route\") { ScreenContent() }`. The NavController is what you call to actually move — `navController.navigate(\"profile\")`.",
  child:
    "A NavHost is a hallway with doors 🚪. Each door leads to a different room (screen). The NavController is your hand on the doorknob — it decides which door you walk through.",
  analogy:
    "Think of a hotel floor. The hallway (NavHost) connects the rooms, each room has a number (route), and your keycard (NavController) lets you move from one to another.",
  visual: {
    metaphor: "rooms",
    title: "A hallway connecting screens",
    caption: "NavHost holds the screens; the NavController moves between them by route.",
  },
  example: {
    code: `@Composable
fun App() {
    val navController = rememberNavController()
    NavHost(
        navController = navController,
        startDestination = "home"
    ) {
        composable("home") {
            HomeScreen(onOpen = { navController.navigate("profile") })
        }
        composable("profile") { ProfileScreen() }
    }
}`,
    explain:
      "The NavHost starts on 'home'. Each composable(route) registers a screen. Tapping in HomeScreen calls navController.navigate(\"profile\") to swap to the profile screen.",
  },
  mistakes: [
    {
      wrong: `val navController = NavController(context)  // ❌ created wrong / not remembered`,
      right: `val navController = rememberNavController()  // ✅`,
      note: "Always obtain the controller with rememberNavController() so it survives recomposition.",
    },
  ],
  quiz: [
    {
      q: "What is the NavHost's job?",
      options: [
        "Store data on disk",
        "Hold the app's screens and swap between them",
        "Make network calls",
        "Animate a single button",
      ],
      answer: 1,
      explain: "NavHost is the container that displays whichever destination the NavController points to.",
    },
    {
      q: "How do you get a NavController in Compose?",
      options: [
        "rememberNavController()",
        "new NavController()",
        "Modifier.nav()",
        "mutableStateOf()",
      ],
      answer: 0,
      explain: "rememberNavController() creates and remembers the controller across recompositions.",
    },
  ],
  aiContext:
    "The learner is learning NavHost. Use the 'hallway with doors' and 'hotel floor' analogies. Key pieces: rememberNavController(), NavHost with startDestination, composable(route) blocks, navController.navigate(route). This stage has no live preview. They know Composables and state.",
};

export const lessonRoutes: Lesson = {
  id: "routes",
  slug: "routes",
  title: "Routes",
  emoji: "🗺️",
  estMinutes: 8,
  authored: true,
  objective: "Name and reach each screen.",
  beginner:
    "A **route** is just a **string name** for a destination, like `\"home\"`, `\"profile\"`, or `\"settings\"`. You register each one with `composable(\"route\")` and travel to it with `navController.navigate(\"route\")`. Because routes are plain strings, it's smart to keep them in constants (or a sealed class) so you don't mistype them.",
  child:
    "A route is a room's address 🗺️. Every room has a name written on the door, so you always know how to ask to go there.",
  analogy:
    "Think of street addresses. To visit a friend you need their address; to visit a screen you need its route. Get the address right and you arrive; a typo sends you nowhere.",
  visual: {
    metaphor: "rooms",
    title: "Every screen has an address",
    caption: "Routes are string names you register and navigate to.",
  },
  example: {
    code: `object Routes {
    const val HOME = "home"
    const val PROFILE = "profile"
}

// register
composable(Routes.HOME) { HomeScreen() }
// travel
navController.navigate(Routes.PROFILE)`,
    explain:
      "Keeping route names in a Routes object means you reuse the same constant when registering and navigating, so a typo can't send you to a screen that doesn't exist.",
  },
  mistakes: [
    {
      wrong: `composable("profile") { ... }
navController.navigate("Profile")  // ❌ capital P — different route!`,
      right: `navController.navigate("profile")  // ✅ matches exactly`,
      note: "Routes are case-sensitive strings. Use shared constants to avoid mismatches and crashes.",
    },
  ],
  quiz: [
    {
      q: "What is a route in Compose Navigation?",
      options: [
        "A color value",
        "A string name identifying a screen",
        "A type of Modifier",
        "A database table",
      ],
      answer: 1,
      explain: "A route is the string key you register a screen under and navigate to.",
    },
    {
      q: "Why store route names in constants?",
      options: [
        "To make the app bigger",
        "To avoid typos between registering and navigating",
        "It's required by Kotlin",
        "To change the color theme",
      ],
      answer: 1,
      explain: "Shared constants ensure the same exact string is used everywhere, preventing mismatches.",
    },
  ],
  aiContext:
    "The learner is learning Routes. Use the 'room address' / 'street address' analogies. Routes are case-sensitive strings; recommend constants or a sealed class. They just learned NavHost and navController.navigate.",
};

export const lessonNavArgs: Lesson = {
  id: "nav-args",
  slug: "nav-args",
  title: "Passing Arguments",
  emoji: "📨",
  estMinutes: 10,
  authored: true,
  objective: "Send data when navigating.",
  beginner:
    "To pass data to a screen, put a **placeholder** in its route like `\"profile/{userId}\"`, declare it in `arguments`, then navigate with the real value: `navController.navigate(\"profile/42\")`. The destination reads it from `backStackEntry.arguments`. Use this for IDs and small values — not big objects (pass an ID and look the object up instead).",
  child:
    "Passing arguments is carrying a note with you when you walk into the next room 📨. The note says something like 'show user 42', so the room knows what to display.",
  analogy:
    "It's like mailing a letter with the recipient's name inside. The route is the envelope, the argument is the note tucked in — the next screen opens it and acts on what it says.",
  visual: {
    metaphor: "rooms",
    title: "Carry data into the next screen",
    caption: "Declare a {placeholder} in the route, pass a value, read it on arrival.",
  },
  example: {
    code: `// declare the argument in the route
composable("profile/{userId}") { backStackEntry ->
    val userId = backStackEntry.arguments?.getString("userId")
    ProfileScreen(userId = userId)
}

// navigate with a real value
navController.navigate("profile/42")`,
    explain:
      "The {userId} placeholder becomes part of the route. Navigating to \"profile/42\" fills it in, and the destination reads userId from the back stack entry's arguments.",
  },
  mistakes: [
    {
      wrong: `// passing a whole object
navController.navigate(route = bigUserObject)  // ❌`,
      right: `navController.navigate("profile/\${user.id}")  // ✅ pass the id, look it up`,
      note: "Navigation arguments are for small values like IDs. Pass an identifier and fetch the full object on the destination screen.",
    },
  ],
  quiz: [
    {
      q: "How do you declare an argument in a route?",
      options: [
        "With a {placeholder} like \"profile/{userId}\"",
        "By adding a Modifier",
        "Using mutableStateOf",
        "You can't pass arguments",
      ],
      answer: 0,
      explain: "A {placeholder} in the route string marks where the argument goes.",
    },
    {
      q: "What should you pass for a large object?",
      options: [
        "The entire object in the route",
        "A small ID, then look the object up on arrival",
        "Nothing — recreate it",
        "A screenshot",
      ],
      answer: 1,
      explain: "Pass an identifier (like a user id) and fetch the full data on the destination screen.",
    },
  ],
  aiContext:
    "The learner is learning Navigation arguments. Use the 'carry a note into the next room' and 'letter in an envelope' analogies. Key flow: {placeholder} in route → navigate with value → read from backStackEntry.arguments. Pass IDs, not big objects. They know NavHost and routes.",
};

export const navigationLessons = {
  lessonNavHost,
  lessonRoutes,
  lessonNavArgs,
};
