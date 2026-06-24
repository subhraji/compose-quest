import type { Lesson } from "../types";

// ════════════════════════════════════════════════════════════
//  NETWORKING — talking to the internet
// ════════════════════════════════════════════════════════════

export const lessonRetrofit: Lesson = {
  id: "retrofit",
  slug: "retrofit",
  title: "Retrofit",
  emoji: "📡",
  estMinutes: 12,
  authored: true,
  objective: "Call web APIs to fetch data.",
  beginner:
    "**Retrofit** is the standard library for calling web APIs in Android. You describe the endpoints as a Kotlin **interface** with annotations like `@GET(\"users\")`, mark the functions `suspend` so they work with coroutines, and Retrofit generates the networking code. Paired with a JSON converter (like Moshi or Gson), it turns the response straight into Kotlin objects.",
  child:
    "Retrofit is a mail carrier 📡 who fetches packages from the internet for you. You write down the address (the endpoint), and it brings back exactly what's there, neatly unwrapped.",
  analogy:
    "Think of ordering takeout by phone. You read off the menu item (the endpoint), the restaurant prepares it, and it arrives at your door ready to eat (a parsed Kotlin object). Retrofit handles the whole call-and-deliver round trip.",
  visual: {
    metaphor: "generic",
    title: "Fetch data from a server",
    caption: "Declare endpoints as an annotated interface; Retrofit makes the calls and parses JSON.",
  },
  example: {
    code: `// 1) describe the API
interface UserApi {
    @GET("users/{id}")
    suspend fun getUser(@Path("id") id: String): User
}

// 2) build Retrofit and create the API
val api = Retrofit.Builder()
    .baseUrl("https://example.com/")
    .addConverterFactory(MoshiConverterFactory.create())
    .build()
    .create(UserApi::class.java)

// 3) call it from a coroutine
val user = api.getUser("42")`,
    explain:
      "You declare endpoints once as an interface. Retrofit builds an implementation, and calling getUser(\"42\") performs the request and parses the JSON into a User object.",
  },
  mistakes: [
    {
      wrong: `fun getUser(id: String): User   // ❌ blocking, no suspend`,
      right: `suspend fun getUser(id: String): User  // ✅ coroutine-friendly`,
      note: "Mark API functions suspend so the network call runs off the main thread without blocking the UI.",
    },
  ],
  quiz: [
    {
      q: "How do you describe a Retrofit endpoint?",
      options: [
        "As a Composable",
        "As an interface function with annotations like @GET",
        "As a Modifier",
        "As a StateFlow",
      ],
      answer: 1,
      explain: "Endpoints are interface functions annotated with the HTTP method and path.",
    },
    {
      q: "Why mark Retrofit API functions as suspend?",
      options: [
        "To make them run on the main thread",
        "So they integrate with coroutines and don't block the UI",
        "It's required for compilation only",
        "To change the URL",
      ],
      answer: 1,
      explain: "suspend lets the call run asynchronously via coroutines, keeping the UI responsive.",
    },
  ],
  aiContext:
    "The learner is learning Retrofit. Use the 'mail carrier' and 'phoning for takeout' analogies. Key pieces: annotated interface (@GET/@Path), suspend functions, Retrofit.Builder with baseUrl + converter. They know coroutines (rememberCoroutineScope/LaunchedEffect) and ViewModel. No live preview in this stage.",
};

export const lessonApiIntegration: Lesson = {
  id: "api-integration",
  slug: "api-integration",
  title: "API Integration",
  emoji: "🔌",
  estMinutes: 11,
  authored: true,
  objective: "Show fetched data in your Compose UI.",
  beginner:
    "Fetching data is only half the job — you also handle **loading, success, and error** states in the UI. The clean pattern: the ViewModel calls the API inside `viewModelScope.launch`, stores the result in a `StateFlow` (often a small `UiState` sealed type), and the Composable collects it and shows a spinner, the data, or an error message accordingly.",
  child:
    "API integration is putting the delivered package onto your screen 🔌 — and being polite while you wait: showing a 'loading…' spinner, then the goodies when they arrive, or a friendly 'oops' if delivery failed.",
  analogy:
    "Think of tracking a parcel: 'on its way' (loading), 'delivered' (success → show contents), or 'delivery failed' (error → show a retry). Good API integration shows the user which of those is happening.",
  visual: {
    metaphor: "generic",
    title: "Loading → data → error",
    caption: "ViewModel fetches into a StateFlow of UiState; the UI renders each case.",
  },
  example: {
    code: `sealed interface UiState {
    object Loading : UiState
    data class Success(val user: User) : UiState
    data class Error(val message: String) : UiState
}

class UserViewModel(private val api: UserApi) : ViewModel() {
    private val _state = MutableStateFlow<UiState>(UiState.Loading)
    val state: StateFlow<UiState> = _state
    fun load(id: String) = viewModelScope.launch {
        _state.value = try { UiState.Success(api.getUser(id)) }
                        catch (e: Exception) { UiState.Error("Couldn't load") }
    }
}

@Composable
fun UserScreen(vm: UserViewModel) {
    when (val s = vm.state.collectAsStateWithLifecycle().value) {
        is UiState.Loading -> Text("Loading…")
        is UiState.Success -> Text(s.user.name)
        is UiState.Error   -> Text(s.message)
    }
}`,
    explain:
      "The ViewModel models the screen as Loading/Success/Error and the UI renders each branch with a when. Wrapping the call in try/catch turns failures into a visible error state instead of a crash.",
  },
  mistakes: [
    {
      wrong: `// only handling success
Text(user.name)  // ❌ what shows while loading or on error?`,
      right: `when (state) { Loading -> …; Success -> …; Error -> … }  // ✅`,
      note: "Always handle loading and error, not just the happy path — otherwise the screen looks broken while data is in flight or when a request fails.",
    },
  ],
  quiz: [
    {
      q: "What three states should API-driven UI usually handle?",
      options: [
        "Start, Stop, Pause",
        "Loading, Success, Error",
        "Red, Green, Blue",
        "Open, Close, Minimize",
      ],
      answer: 1,
      explain: "Modeling Loading/Success/Error covers the realistic outcomes of a network call.",
    },
    {
      q: "Where should the API call live?",
      options: [
        "Directly in the Composable body",
        "In the ViewModel (e.g. viewModelScope.launch), exposed via StateFlow",
        "In the Modifier chain",
        "In the Manifest",
      ],
      answer: 1,
      explain: "Keep the call in the ViewModel and expose the result as state for the UI to render.",
    },
  ],
  aiContext:
    "The learner is learning API integration. Use the 'parcel tracking: on its way / delivered / failed' analogy. Key pattern: sealed UiState (Loading/Success/Error), ViewModel fetches in viewModelScope, UI renders with when. They know Retrofit, ViewModel, StateFlow, coroutines.",
};

export const networkingLessons = {
  lessonRetrofit,
  lessonApiIntegration,
};
