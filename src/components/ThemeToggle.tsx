"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="grid h-9 w-9 place-items-center rounded-full border border-black/10 text-ink/70 transition-colors hover:bg-black/[0.04] dark:border-white/15 dark:text-cloud/80 dark:hover:bg-white/[0.06]"
    >
      {mounted && dark ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-[18px] w-[18px]" />}
    </button>
  );
}
