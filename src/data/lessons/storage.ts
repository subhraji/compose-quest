import type { Lesson } from "../types";

// ════════════════════════════════════════════════════════════
//  LOCAL STORAGE — saving data on the device
// ════════════════════════════════════════════════════════════

export const lessonRoom: Lesson = {
  id: "room",
  slug: "room",
  title: "Room Database",
  emoji: "🗄️",
  estMinutes: 12,
  authored: true,
  objective: "Store structured data locally.",
  beginner:
    "**Room** is Android's database library — a friendly layer over SQLite. You define three things: an **`@Entity`** (a table, e.g. a Note), a **`@Dao`** (the queries: insert, delete, get), and a **`@Database`** that ties them together. DAO functions can return a **Flow**, so your UI automatically updates whenever the stored data changes.",
  child:
    "Room is a filing cabinet inside the phone 🗄️ that remembers things forever. You file a card away, and even after you close the app and come back, it's still right there.",
  analogy:
    "Think of a library. Books are rows (entities), the librarian who finds and shelves them is the DAO, and the whole building is the database. You ask the librarian; they handle the shelves.",
  visual: {
    metaphor: "generic",
    title: "A local database",
    caption: "Entity (table) + DAO (queries) + Database. DAO Flows keep the UI in sync.",
  },
  example: {
    code: `@Entity
data class Note(
    @PrimaryKey(autoGenerate = true) val id: Int = 0,
    val text: String
)

@Dao
interface NoteDao {
    @Insert suspend fun add(note: Note)
    @Query("SELECT * FROM Note") fun all(): Flow<List<Note>>
}

@Database(entities = [Note::class], version = 1)
abstract class AppDb : RoomDatabase() {
    abstract fun notes(): NoteDao
}`,
    explain:
      "Note is the table, NoteDao holds the queries (note add() is suspend, all() returns a Flow), and AppDb wires them together. Collecting all() in the UI means new notes appear automatically.",
  },
  mistakes: [
    {
      wrong: `@Query("SELECT * FROM Note") fun all(): List<Note>  // ❌ static snapshot`,
      right: `@Query("SELECT * FROM Note") fun all(): Flow<List<Note>>  // ✅ live updates`,
      note: "Returning a Flow makes the query observable, so the UI refreshes whenever the data changes. A plain List is just a one-time snapshot.",
    },
  ],
  quiz: [
    {
      q: "What are the three main Room building blocks?",
      options: [
        "View, ViewModel, Model",
        "Entity, DAO, Database",
        "Get, Post, Put",
        "Row, Column, Box",
      ],
      answer: 1,
      explain: "An @Entity is a table, a @Dao holds queries, and the @Database connects them.",
    },
    {
      q: "Why return a Flow from a DAO query?",
      options: [
        "It's faster to type",
        "So the UI updates automatically when stored data changes",
        "Flows use less storage",
        "It's required for inserts",
      ],
      answer: 1,
      explain: "A Flow makes the query observable, emitting new results whenever the table changes.",
    },
  ],
  aiContext:
    "The learner is learning Room. Use the 'filing cabinet' and 'library (books/librarian/building)' analogies. Key pieces: @Entity (table), @Dao (queries, suspend inserts, Flow reads), @Database. Flow reads keep the UI live. They know coroutines, Flow/StateFlow, ViewModel. No live preview.",
};

export const lessonDataStore: Lesson = {
  id: "datastore",
  slug: "datastore",
  title: "DataStore",
  emoji: "🔑",
  estMinutes: 9,
  authored: true,
  objective: "Save small key-value settings.",
  beginner:
    "**DataStore** is the modern way to store **small key-value data** — user settings and preferences like 'dark mode = on' or 'last opened tab'. It's the successor to SharedPreferences: fully **asynchronous** (coroutines + Flow, never blocking the main thread) and safer. Use **Preferences DataStore** for simple keys; reach for Room when you have structured, relational data.",
  child:
    "DataStore is a tiny notebook 🔑 for small notes like 'dark mode = on'. Not a whole filing cabinet — just a little pad for quick settings you want to remember.",
  analogy:
    "Think of a sticky note on your fridge with a couple of reminders ('milk: low', 'bins: Tuesday'). It's perfect for small facts. For a whole archive of documents you'd use a filing cabinet (Room), not a sticky note.",
  visual: {
    metaphor: "generic",
    title: "Key-value preferences",
    caption: "DataStore stores small settings asynchronously via Flow; Room is for structured data.",
  },
  example: {
    code: `val DARK_MODE = booleanPreferencesKey("dark_mode")

// read as a Flow
val isDark: Flow<Boolean> = dataStore.data
    .map { prefs -> prefs[DARK_MODE] ?: false }

// write inside a coroutine
suspend fun setDark(on: Boolean) {
    dataStore.edit { prefs -> prefs[DARK_MODE] = on }
}`,
    explain:
      "A typed key (DARK_MODE) identifies the setting. Reading returns a Flow you can collect in the UI; writing happens in a suspend edit { } block — all off the main thread.",
  },
  mistakes: [
    {
      wrong: `// storing a large list of records in DataStore  // ❌`,
      right: `// use Room for structured/relational data; DataStore for small settings  // ✅`,
      note: "DataStore is for small key-value preferences. For lists of structured records, use Room.",
    },
  ],
  quiz: [
    {
      q: "What is DataStore best suited for?",
      options: [
        "Large relational tables",
        "Small key-value settings and preferences",
        "Network requests",
        "Drawing graphics",
      ],
      answer: 1,
      explain: "DataStore stores small preference-style key-value data; Room handles structured data.",
    },
    {
      q: "How does DataStore differ from old SharedPreferences?",
      options: [
        "It's synchronous and blocking",
        "It's asynchronous (coroutines + Flow) and safer",
        "It can't store booleans",
        "It only works online",
      ],
      answer: 1,
      explain: "DataStore is fully async via coroutines and Flow, avoiding the main-thread issues of SharedPreferences.",
    },
  ],
  aiContext:
    "The learner is learning DataStore. Use the 'tiny notebook' / 'sticky note vs filing cabinet' analogies (contrasting with Room). Key points: small key-value prefs, async Flow reads, suspend edit writes, successor to SharedPreferences. They just learned Room and know Flow/coroutines.",
};

export const storageLessons = {
  lessonRoom,
  lessonDataStore,
};
