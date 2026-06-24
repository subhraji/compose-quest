import type { Lesson } from "../types";

// ════════════════════════════════════════════════════════════
//  ARCHITECTURE — keeping big apps clean
// ════════════════════════════════════════════════════════════

export const lessonViewModel: Lesson = {
  id: "viewmodel",
  slug: "viewmodel",
  title: "ViewModel",
  emoji: "👔",
  estMinutes: 11,
  authored: true,
  objective: "Hold and manage screen data separate from UI.",
  beginner:
    "A **`ViewModel`** holds a screen's data and logic **outside** the UI, so your Composables stay simple and focused on drawing. A big bonus: a ViewModel **survives configuration changes** (like screen rotation), so state isn't lost. In Compose you get one with `viewModel()` and read its state from your Composable.",
  child:
    "A ViewModel is a manager 👔 who keeps all the important info safe. The screen just asks the manager what to show and stays nice and simple — and even if you rotate the phone, the manager still remembers everything.",
  analogy:
    "Think of a news anchor (the UI) and a producer (the ViewModel). The producer gathers the facts and decides what's on; the anchor just reads what's handed to them. Swap anchors (rotate the screen) and the producer still has all the notes.",
  visual: {
    metaphor: "generic",
    title: "Logic lives outside the UI",
    caption: "A ViewModel owns screen state + logic and survives rotation; the UI just renders it.",
  },
  example: {
    code: `class CounterViewModel : ViewModel() {
    var count by mutableStateOf(0)
        private set
    fun increment() { count++ }
}

@Composable
fun CounterScreen(vm: CounterViewModel = viewModel()) {
    Button(onClick = { vm.increment() }) {
        Text("Count: \${vm.count}")
    }
}`,
    explain:
      "The ViewModel owns count and the increment() logic. The Composable just reads vm.count and calls vm.increment() — so the UI stays thin and the state survives rotation.",
  },
  mistakes: [
    {
      wrong: `@Composable
fun Screen() {
    // ❌ all business logic + network calls crammed in the UI
}`,
      right: `// ✅ move data + logic into a ViewModel; the Composable just renders it`,
      note: "Don't pile business logic into Composables. Keep it in a ViewModel so the UI is simple and state survives config changes.",
    },
  ],
  quiz: [
    {
      q: "What is a key benefit of a ViewModel?",
      options: [
        "It makes text bigger",
        "It holds state/logic outside the UI and survives configuration changes",
        "It replaces the NavHost",
        "It draws animations",
      ],
      answer: 1,
      explain: "A ViewModel separates data/logic from UI and persists across rotation and other config changes.",
    },
    {
      q: "How do you obtain a ViewModel in a Composable?",
      options: ["viewModel()", "remember {}", "Modifier.viewModel()", "new ViewModel()"],
      answer: 0,
      explain: "The viewModel() function provides (and scopes) the ViewModel for your Composable.",
    },
  ],
  aiContext:
    "The learner is learning ViewModel. Use the 'manager who keeps the info' and 'news anchor vs producer' analogies. Key points: separates state/logic from UI, survives configuration changes, obtained via viewModel(). They know state, recomposition, and state hoisting.",
};

export const lessonStateFlow: Lesson = {
  id: "stateflow",
  slug: "stateflow",
  title: "StateFlow",
  emoji: "🌊",
  estMinutes: 10,
  authored: true,
  objective: "Expose state that the UI observes over time.",
  beginner:
    "**`StateFlow`** is an observable holder of a **current value** that emits updates over time. ViewModels commonly expose a private `MutableStateFlow` and a public read-only `StateFlow`. The UI collects it with **`collectAsStateWithLifecycle()`** (or `collectAsState()`), turning the stream into Compose state that recomposes whenever the value changes.",
  child:
    "A StateFlow is a river of updates 🌊 the screen keeps watching. Whenever the water level (the value) changes, everyone watching the river sees the new level right away.",
  analogy:
    "Think of a live stock ticker. It always shows the latest price (current value) and keeps streaming new ones. Anyone watching the ticker instantly sees each update — that's the UI collecting a StateFlow.",
  visual: {
    metaphor: "memory-box",
    title: "A stream with a current value",
    caption: "StateFlow always has a latest value; the UI collects it and recomposes on change.",
  },
  example: {
    code: `class PriceViewModel : ViewModel() {
    private val _price = MutableStateFlow(0)
    val price: StateFlow<Int> = _price
    fun update(p: Int) { _price.value = p }
}

@Composable
fun PriceLabel(vm: PriceViewModel = viewModel()) {
    val price by vm.price.collectAsStateWithLifecycle()
    Text("Price: \$price")
}`,
    explain:
      "The ViewModel keeps a private mutable flow and exposes a read-only StateFlow. The UI collects it into Compose state, so the Text recomposes every time the price updates.",
  },
  mistakes: [
    {
      wrong: `val price: MutableStateFlow<Int> = _price  // ❌ exposes mutable flow`,
      right: `val price: StateFlow<Int> = _price          // ✅ read-only to the UI`,
      note: "Expose the read-only StateFlow type so the UI can observe but not mutate it; keep the MutableStateFlow private.",
    },
  ],
  quiz: [
    {
      q: "What does a StateFlow always have?",
      options: [
        "A list of screens",
        "A current value plus a stream of updates",
        "A color",
        "A navigation route",
      ],
      answer: 1,
      explain: "StateFlow holds a current value and emits new ones over time.",
    },
    {
      q: "How does the UI turn a StateFlow into Compose state?",
      options: [
        "remember { }",
        "collectAsStateWithLifecycle() (or collectAsState())",
        "Modifier.flow()",
        "viewModel()",
      ],
      answer: 1,
      explain: "Collecting the flow yields Compose state that recomposes on each new value.",
    },
  ],
  aiContext:
    "The learner is learning StateFlow. Use the 'river of updates' and 'stock ticker' analogies. Key points: current value + stream, private MutableStateFlow / public StateFlow, UI uses collectAsStateWithLifecycle(). They know ViewModel and state.",
};

export const lessonSharedFlow: Lesson = {
  id: "sharedflow",
  slug: "sharedflow",
  title: "SharedFlow",
  emoji: "📣",
  estMinutes: 9,
  authored: true,
  objective: "Emit one-time events to the UI.",
  beginner:
    "**`SharedFlow`** is for **one-time events** — show a snackbar, navigate once, display a toast — things that should fire **once**, not be re-shown on every recomposition. Unlike StateFlow it has **no 'current value'**; it just emits events as they happen. ViewModels expose a `SharedFlow` of events and the UI collects and reacts to each one.",
  child:
    "A SharedFlow is a loudspeaker announcement 📣 everyone hears once. It's not a sign that stays up — it's a 'ding!' that happens and is gone, so it never accidentally repeats.",
  analogy:
    "Think of a doorbell. It rings once when pressed; it doesn't keep showing 'someone rang' forever. A SharedFlow fires an event once, and the UI responds once.",
  visual: {
    metaphor: "generic",
    title: "Fire-once events",
    caption: "SharedFlow emits events (navigate, toast) with no retained value to re-trigger.",
  },
  example: {
    code: `class LoginViewModel : ViewModel() {
    private val _events = MutableSharedFlow<String>()
    val events: SharedFlow<String> = _events
    suspend fun onLogin() { _events.emit("navigate_home") }
}

@Composable
fun LoginScreen(vm: LoginViewModel = viewModel()) {
    LaunchedEffect(Unit) {
        vm.events.collect { event ->
            // handle once: navigate, show snackbar, etc.
        }
    }
}`,
    explain:
      "Login emits a one-time 'navigate_home' event. The UI collects events inside a LaunchedEffect and reacts once per emission — no value is retained to fire again on recomposition.",
  },
  mistakes: [
    {
      wrong: `// modelling a one-time navigation as StateFlow<Boolean>
// ❌ re-fires on recomposition / config change`,
      right: `// ✅ use SharedFlow for events that must happen exactly once`,
      note: "StateFlow retains its value, so event-as-state can re-trigger (double navigation). Use SharedFlow for fire-once events.",
    },
  ],
  quiz: [
    {
      q: "What is SharedFlow best for?",
      options: [
        "Holding the current screen value",
        "One-time events like navigation or a snackbar",
        "Storing files",
        "Laying out a grid",
      ],
      answer: 1,
      explain: "SharedFlow emits events once; it doesn't retain a current value.",
    },
    {
      q: "Why not use StateFlow for a one-time navigation event?",
      options: [
        "It's slower",
        "It retains its value and can re-fire on recomposition",
        "It can't hold booleans",
        "It needs a Modifier",
      ],
      answer: 1,
      explain: "Because StateFlow keeps a current value, an event modeled as state may trigger again unexpectedly.",
    },
  ],
  aiContext:
    "The learner is learning SharedFlow. Use the 'loudspeaker announcement' and 'doorbell' analogies. Key contrast with StateFlow: SharedFlow = fire-once events, no retained value; collected inside LaunchedEffect. They just learned StateFlow and ViewModel.",
};

export const lessonMvvm: Lesson = {
  id: "mvvm",
  slug: "mvvm",
  title: "MVVM",
  emoji: "🍽️",
  estMinutes: 12,
  authored: true,
  objective: "Connect View, ViewModel, and data cleanly.",
  beginner:
    "**MVVM** (Model–View–ViewModel) is a way to organize code into three layers. The **Model** is your data and where it comes from (repositories, database, network). The **ViewModel** holds screen state and logic and exposes it as flows. The **View** (your Composables) just renders that state and sends user actions back to the ViewModel. Each layer has one job, so the app stays easy to change and test.",
  child:
    "MVVM is a restaurant 🍽️. You (the View) tell the waiter what you want; the waiter passes it to the kitchen (ViewModel) which decides what to cook; the kitchen gets ingredients from the pantry (Model/data). Everyone has one job and it runs smoothly.",
  analogy:
    "Think of a restaurant: dining room (View) shows the meal and takes orders, kitchen (ViewModel) prepares and decides, pantry (Model) stores ingredients. The diner never rummages the pantry, and the pantry never plates a dish — clear roles.",
  visual: {
    metaphor: "generic",
    title: "Three layers, one job each",
    caption: "Model (data) → ViewModel (state + logic) → View (renders & sends actions).",
  },
  example: {
    code: `// Model: where data comes from
class UserRepository { suspend fun load(): User = /* ... */ }

// ViewModel: state + logic
class UserViewModel(private val repo: UserRepository) : ViewModel() {
    private val _user = MutableStateFlow<User?>(null)
    val user: StateFlow<User?> = _user
    fun load() = viewModelScope.launch { _user.value = repo.load() }
}

// View: just renders
@Composable
fun UserScreen(vm: UserViewModel) {
    val user by vm.user.collectAsStateWithLifecycle()
    Text(user?.name ?: "Loading…")
}`,
    explain:
      "Data flows up from the Repository (Model) into the ViewModel's StateFlow, and the View renders it. User actions flow the other way — the View calls vm.load(). Each layer stays focused.",
  },
  mistakes: [
    {
      wrong: `@Composable
fun Screen() {
    // ❌ network call + data parsing directly in the UI`,
      right: `// ✅ View renders; ViewModel holds logic; Model fetches data`,
      note: "Mixing data fetching into the View breaks the separation. Keep fetching in the Model, logic in the ViewModel, rendering in the View.",
    },
  ],
  quiz: [
    {
      q: "What are the three layers of MVVM?",
      options: [
        "Menu, Vendor, Vault",
        "Model, View, ViewModel",
        "Make, Verify, Merge",
        "Main, View, Module",
      ],
      answer: 1,
      explain: "MVVM = Model (data), View (UI), ViewModel (state + logic).",
    },
    {
      q: "In MVVM, what is the View's job?",
      options: [
        "Fetch data from the network",
        "Render state and forward user actions to the ViewModel",
        "Store data on disk",
        "Decide business rules",
      ],
      answer: 1,
      explain: "The View (Composables) just displays state and reports actions; logic lives in the ViewModel.",
    },
  ],
  aiContext:
    "The learner is learning MVVM. Use the 'restaurant: dining room / kitchen / pantry' analogy. Map: Model=data/repository, ViewModel=state+logic (exposes flows), View=Composables that render and forward actions. Ties together ViewModel, StateFlow, SharedFlow they just learned.",
};

export const architectureLessons = {
  lessonViewModel,
  lessonStateFlow,
  lessonSharedFlow,
  lessonMvvm,
};
