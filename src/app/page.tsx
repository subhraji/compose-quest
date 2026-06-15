"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Map, Bot, Wand2, Eye, Trophy, ArrowRight } from "lucide-react";
import { ComposePreview } from "@/components/ComposePreview";

const FEATURES = [
  { icon: Map, title: "A guided journey", body: "A visual roadmap from your first Composable to advanced UI. Always know where you are and what's next.", color: "from-quest-400 to-quest-600" },
  { icon: Bot, title: "Your own AI tutor", body: "“Quest” knows exactly which lesson you're on. Ask it to explain like you're 10, give analogies, or fix your code.", color: "from-pink-400 to-coral-500" },
  { icon: Wand2, title: "Live playground", body: "Edit real Compose code and watch the UI update instantly. Buttons you build actually work.", color: "from-mint-400 to-quest-400" },
  { icon: Eye, title: "Visual metaphors", body: "State is a memory box. Recomposition is rebuilding LEGO. Hard ideas become things you can see and touch.", color: "from-spark-400 to-coral-500" },
];

const STEPS = [
  { n: "1", t: "Pick up where you left off", d: "The roadmap remembers your progress and unlocks the next step." },
  { n: "2", t: "Learn it 4 ways", d: "Beginner words, a 10-year-old version, a real-world analogy, and a visual you can play with." },
  { n: "3", t: "Try it yourself", d: "Tweak the live example in the playground and ask the AI tutor anything." },
  { n: "4", t: "Prove it & earn XP", d: "A quick quiz locks in the idea. Complete it to unlock what's next." },
];

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* ── Hero ── */}
      <section className="relative mx-auto max-w-6xl px-4 pb-10 pt-16 sm:pt-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="chip bg-quest-50 text-quest-700"
            >
              <Sparkles className="h-3.5 w-3.5" /> Learn Jetpack Compose like an adventure
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="mt-4 font-display text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl"
            >
              Build Android UI.
              <br />
              <span className="bg-quest-gradient bg-clip-text text-transparent">Feel like a kid again.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-5 max-w-md text-lg text-ink/70"
            >
              The most beginner-friendly way to learn Jetpack Compose. Visual, interactive, and guided every
              step — with an AI tutor that explains things so simply a 10-year-old would get it.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link href="/roadmap" className="btn-primary text-base">
                Start the quest <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/lesson/what-is-compose" className="btn-ghost text-base">
                Try a free lesson
              </Link>
            </motion.div>

            <div className="mt-6 flex items-center gap-4 text-sm text-ink-muted">
              <span>🌱 Zero experience needed</span>
              <span>·</span>
              <span>🆓 Free AI tutor</span>
            </div>
          </div>

          {/* floating playground peek */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 60 }}
            className="relative"
          >
            <div className="absolute -right-6 -top-6 hidden animate-float lg:block">
              <span className="chip bg-spark-gradient text-white shadow-float">tap the button →</span>
            </div>
            <div className="card overflow-hidden p-4">
              <div className="mb-3 flex items-center gap-1.5 px-1">
                <span className="h-3 w-3 rounded-full bg-coral-400" />
                <span className="h-3 w-3 rounded-full bg-spark-400" />
                <span className="h-3 w-3 rounded-full bg-mint-400" />
                <span className="ml-2 text-xs font-semibold text-ink-muted">Counter.kt — live</span>
              </div>
              <ComposePreview code={`@Composable
fun Counter() {
    var count by remember { mutableStateOf(0) }
    Column {
        Text("You tapped", fontSize = 14.sp, color = Color.Gray)
        Text("$count times", fontSize = 28.sp, fontWeight = FontWeight.Bold)
        Button(onClick = { count++ }) { Text("Tap me!") }
    }
}`} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">Not a docs site. An adventure.</h2>
          <p className="mt-2 text-ink/60">Everything is designed to make Compose click for total beginners.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -6 }}
              className="card p-6"
            >
              <div className={`mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${f.color} text-white shadow-soft`}>
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold">{f.title}</h3>
              <p className="mt-1 text-sm text-ink/65">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-[2.5rem] bg-quest-gradient p-8 text-white sm:p-12">
          <h2 className="font-display text-3xl font-extrabold">How every lesson works</h2>
          <p className="mt-2 max-w-lg text-white/80">A simple, repeatable loop that turns confusion into confidence.</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <div key={s.n} className="rounded-3xl bg-white/10 p-5 backdrop-blur">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white font-black text-quest-600">{s.n}</span>
                <h3 className="mt-3 font-bold">{s.t}</h3>
                <p className="mt-1 text-sm text-white/80">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="mx-auto max-w-3xl px-4 py-20 text-center">
        <Trophy className="mx-auto h-12 w-12 text-spark-500" />
        <h2 className="mt-4 font-display text-4xl font-black">Your Compose journey starts now.</h2>
        <p className="mx-auto mt-3 max-w-md text-ink/65">
          13 stages. From “what is a Composable?” to building your own design system. One friendly step at a time.
        </p>
        <Link href="/roadmap" className="btn-primary mt-7 text-base">
          Open the roadmap <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <footer className="border-t border-quest-100 py-8 text-center text-sm text-ink-muted">
        Compose Quest · Learn Jetpack Compose Like an Adventure
      </footer>
    </div>
  );
}
