"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Map, Bot, Wand2, Eye, ArrowRight, Sparkles, Heart } from "lucide-react";

const FEATURES = [
  { icon: Map, title: "A guided journey", body: "A visual roadmap from your first Composable to advanced UI. Always know where you are and what's next.", grad: "from-indigo-500 to-violet-500" },
  { icon: Bot, title: "Your own AI tutor", body: "“Quest” knows exactly which lesson you're on. Ask it to explain like you're 10, give analogies, or fix your code.", grad: "from-violet-500 to-fuchsia-500" },
  { icon: Wand2, title: "Live playground", body: "Edit real Compose code and watch the UI update instantly. Buttons you build actually work.", grad: "from-fuchsia-500 to-pink-500" },
  { icon: Eye, title: "Visual metaphors", body: "State is a memory box. Recomposition is rebuilding LEGO. Hard ideas become things you can see and touch.", grad: "from-pink-500 to-rose-500" },
];

const STEPS = [
  { n: "01", t: "Pick up where you left off", d: "The roadmap remembers your progress and unlocks the next step." },
  { n: "02", t: "Learn it 4 ways", d: "Beginner words, a 10-year-old version, a real-world analogy, and a visual you can play with." },
  { n: "03", t: "Try it yourself", d: "Tweak the live example in the playground and ask the AI tutor anything." },
  { n: "04", t: "Prove it & earn XP", d: "A quick quiz locks in the idea. Complete it to unlock what's next." },
];

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* floating ambient glow blobs */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-indigo-400/30 via-violet-400/20 to-fuchsia-400/30 blur-3xl"
        style={{ animation: "float-blob 12s ease-in-out infinite" }}
      />

      {/* ── Hero ── */}
      <section className="mx-auto max-w-3xl px-4 pb-24 pt-28 text-center sm:pt-36">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="chip border border-quest-300/40 bg-quest-50/60 text-quest-700 dark:border-quest-400/30 dark:bg-quest-500/10 dark:text-quest-300"
        >
          <Sparkles className="h-3.5 w-3.5" /> Learn Jetpack Compose like an adventure
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl"
        >
          Build Android UI.
          <br />
          <span className="text-gradient">Feel like a kid again.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink/60 dark:text-cloud/60"
        >
          The most beginner-friendly way to learn Jetpack Compose. Visual, interactive, and guided every
          step — with an AI tutor that explains things so simply a 10-year-old would get it.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-10 flex justify-center"
        >
          <Link href="/roadmap" className="btn-primary text-base">
            Start the quest <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="mt-6 flex justify-center gap-4 text-sm text-ink/45 dark:text-cloud/45">
          <span>Zero experience needed</span>
          <span className="text-quest-400">·</span>
          <span>Free AI tutor</span>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="mx-auto max-w-5xl px-4 py-20">
        <div className="mb-14 text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Not a docs site. <span className="text-gradient">An adventure.</span>
          </h2>
          <p className="mt-3 text-ink/50 dark:text-cloud/50">Everything is designed to make Compose click for total beginners.</p>
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
              className="card group p-6 transition-shadow duration-300 hover:shadow-[0_18px_44px_-20px_rgba(124,58,237,0.45)]"
            >
              <div className={`mb-4 grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${f.grad} text-white shadow-lg shadow-violet-500/20 transition-transform duration-300 group-hover:scale-110`}>
                <f.icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h3 className="font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/55 dark:text-cloud/55">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="mx-auto max-w-5xl px-4 py-20">
        <div className="mb-14 text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">How every lesson works</h2>
          <p className="mt-3 text-ink/50 dark:text-cloud/50">A simple, repeatable loop that turns confusion into confidence.</p>
        </div>
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <span className="font-mono text-2xl font-bold text-gradient">{s.n}</span>
              <h3 className="mt-3 font-display font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/55 dark:text-cloud/55">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="mx-auto max-w-3xl px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-quest-300/20 p-10 text-center sm:p-16"
          style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.10), rgba(236,72,153,0.08))" }}
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-fuchsia-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-indigo-400/20 blur-3xl" />
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Your Compose journey <span className="text-gradient">starts now.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-ink/60 dark:text-cloud/60">
            13 stages. From “what is a Composable?” to building your own design system. One friendly step at a time.
          </p>
          <Link href="/roadmap" className="btn-primary mt-8 text-base">
            Open the roadmap <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </section>

      <footer className="border-t border-black/[0.06] py-10 text-center dark:border-white/[0.08]">
        <p className="text-sm text-ink/40 dark:text-cloud/40">
          Compose Quest · Learn Jetpack Compose Like an Adventure
        </p>
        <p className="mt-2 flex items-center justify-center gap-1.5 text-sm text-ink/55 dark:text-cloud/55">
          Developed with <Heart className="h-3.5 w-3.5 fill-current text-pink-500" /> by{" "}
          <span className="font-semibold text-gradient">Subhrajit Deb</span>
        </p>
      </footer>
    </div>
  );
}
