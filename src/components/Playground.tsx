"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, RotateCcw, Sparkles, Wand2 } from "lucide-react";
import { ComposePreview } from "./ComposePreview";

interface PlaygroundProps {
  starter: string;
  /** asks the AI mentor to debug the current code */
  onAskAi?: (code: string) => void;
}

export function Playground({ starter, onAskAi }: PlaygroundProps) {
  const [code, setCode] = useState(starter);
  const [live, setLive] = useState(starter);
  const [ran, setRan] = useState(false);

  const run = () => {
    setLive(code);
    setRan(true);
  };
  const reset = () => {
    setCode(starter);
    setLive(starter);
    setRan(false);
  };

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between border-b border-black/[0.06] px-4 py-2.5 dark:border-white/[0.08]">
        <div className="flex items-center gap-2 text-sm font-semibold text-ink/70 dark:text-cloud/70">
          <Wand2 className="h-4 w-4" strokeWidth={1.5} /> Playground
          <span className="chip bg-mint-500/10 text-mint-600 dark:text-mint-400">live preview</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={reset} className="btn-ghost px-3 py-1.5 text-xs">
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </button>
          {onAskAi && (
            <button onClick={() => onAskAi(code)} className="btn-ghost px-3 py-1.5 text-xs">
              <Sparkles className="h-3.5 w-3.5" /> Ask AI
            </button>
          )}
          <motion.button whileTap={{ scale: 0.95 }} onClick={run} className="btn-primary px-4 py-1.5 text-xs">
            <Play className="h-3.5 w-3.5" /> Run
          </motion.button>
        </div>
      </div>

      <div className="grid md:grid-cols-2">
        {/* editor */}
        <div className="relative border-b border-black/[0.06] dark:border-white/[0.08] md:border-b-0 md:border-r">
          <textarea
            spellCheck={false}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="h-full min-h-[260px] w-full resize-none bg-ink p-4 font-mono text-sm leading-relaxed text-cloud outline-none dark:bg-black/40"
          />
          <span className="pointer-events-none absolute bottom-2 right-3 text-[10px] font-semibold uppercase tracking-wide text-cloud/40">
            edit me
          </span>
        </div>

        {/* preview */}
        <div className="p-4">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink/40 dark:text-cloud/40">
            <span className="grid h-4 w-4 place-items-center rounded bg-mint-500/15 text-mint-600">●</span>
            Preview {ran && <span className="text-mint-500">· updated</span>}
          </div>
          <ComposePreview code={live} />
          <p className="mt-2 text-center text-[11px] text-ink/40 dark:text-cloud/40">
            Simulated render of the Compose teaching subset — tap buttons, they really work!
          </p>
        </div>
      </div>
    </div>
  );
}
