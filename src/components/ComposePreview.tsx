"use client";

import React, { useMemo, useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { parseCompose, type Node, type ModifierCall } from "@/lib/composeParser";

// ── value helpers ──────────────────────────────────────────
const NAMED_COLORS: Record<string, string> = {
  "Color.Red": "#f43f5e",
  "Color.Blue": "#3b82f6",
  "Color.Green": "#10b981",
  "Color.Yellow": "#facc15",
  "Color.Black": "#0f1226",
  "Color.White": "#ffffff",
  "Color.Gray": "#9ca3af",
  "Color.Magenta": "#d946ef",
  "Color.Cyan": "#06b6d4",
  "Color.LightGray": "#e5e7eb",
  "Color.DarkGray": "#4b5563",
};

function parseColor(raw?: string): string | undefined {
  if (!raw) return undefined;
  raw = raw.trim();
  if (NAMED_COLORS[raw]) return NAMED_COLORS[raw];
  // Color(0xFFRRGGBB)
  const hex = raw.match(/Color\(\s*0x([0-9a-fA-F]{8})\s*\)/);
  if (hex) {
    const v = hex[1];
    const a = parseInt(v.slice(0, 2), 16) / 255;
    const r = parseInt(v.slice(2, 4), 16);
    const g = parseInt(v.slice(4, 6), 16);
    const b = parseInt(v.slice(6, 8), 16);
    return `rgba(${r},${g},${b},${a})`;
  }
  return undefined;
}

function dp(raw?: string): number | undefined {
  if (!raw) return undefined;
  const n = raw.match(/(-?\d+(?:\.\d+)?)\s*\.?\s*(dp|sp)?/);
  return n ? parseFloat(n[1]) : undefined;
}

// ── modifier → CSS ─────────────────────────────────────────
function modsToStyle(mods: ModifierCall[]): React.CSSProperties {
  const s: React.CSSProperties = {};
  for (const m of mods) {
    const a = m.args;
    switch (m.name) {
      case "padding":
        if (a.length === 1) s.padding = dp(a[0]);
        else if (a.length >= 2) s.padding = `${dp(a[1]) ?? 0}px ${dp(a[0]) ?? 0}px`;
        break;
      case "size":
        s.width = dp(a[0]);
        s.height = dp(a[1] ?? a[0]);
        break;
      case "width":
        s.width = a[0]?.includes("fillMaxWidth") ? "100%" : dp(a[0]);
        break;
      case "height":
        s.height = dp(a[0]);
        break;
      case "fillMaxWidth":
        s.width = "100%";
        break;
      case "fillMaxSize":
        s.width = "100%";
        s.height = "100%";
        break;
      case "background":
        s.background = parseColor(a[0]) ?? "#e0e7ff";
        break;
      case "border": {
        const w = dp(a[0]) ?? 1;
        const col = parseColor(a[1]) ?? "#6366f1";
        s.border = `${w}px solid ${col}`;
        break;
      }
      case "clip":
      case "clipToBounds":
        s.borderRadius = 12;
        s.overflow = "hidden";
        break;
      case "offset":
        s.position = "relative";
        s.left = dp(a[0]);
        s.top = dp(a[1] ?? "0");
        break;
      case "fillMaxHeight":
        s.height = "100%";
        break;
    }
  }
  return s;
}

// ── string interpolation with live state ───────────────────
function interpolate(text: string, state: Record<string, number>): string {
  return text
    .replace(/\$\{(\w+)\}/g, (_, n) => String(state[n] ?? `{${n}}`))
    .replace(/\$(\w+)/g, (_, n) => (n in state ? String(state[n]) : `$${n}`));
}

// ── the recursive renderer ─────────────────────────────────
function RenderNode({
  node,
  state,
  setState,
  initial,
}: {
  node: Node;
  state: Record<string, number>;
  setState: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  initial: Record<string, number>;
}): React.ReactElement | null {
  const style = modsToStyle(node.modifiers);
  const kids = node.children.map((c, i) => (
    <RenderNode key={i} node={c} state={state} setState={setState} initial={initial} />
  ));

  const handleClick = () => {
    const oc = node.onClick;
    if (!oc || !oc.varName) return;
    setState((s) => {
      const cur = s[oc.varName!] ?? 0;
      if (oc.kind === "inc") return { ...s, [oc.varName!]: cur + 1 };
      if (oc.kind === "dec") return { ...s, [oc.varName!]: cur - 1 };
      if (oc.kind === "set") return { ...s, [oc.varName!]: oc.value ?? 0 };
      return s;
    });
  };

  switch (node.name) {
    case "Text": {
      const raw = node.named.text ?? node.positional[0] ?? "";
      const fontSize = dp(node.named.fontSize) ?? 16;
      const color = parseColor(node.named.color) ?? "#0f1226";
      const bold = node.named.fontWeight?.includes("Bold");
      return (
        <span style={{ ...style, fontSize, color, fontWeight: bold ? 700 : 400 }}>
          {interpolate(raw, state)}
        </span>
      );
    }
    case "Button": {
      return (
        <button
          onClick={handleClick}
          style={style}
          className="rounded-2xl bg-quest-gradient px-5 py-2.5 font-semibold text-white shadow-soft transition active:scale-95"
        >
          {kids.length ? kids : "Button"}
        </button>
      );
    }
    case "Column":
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 6, ...style }}>{kids}</div>
      );
    case "Row":
      return (
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 8, ...style }}>
          {kids}
        </div>
      );
    case "Box":
      return (
        <div style={{ position: "relative", display: "inline-grid", placeItems: "center", ...style }}>
          {kids}
        </div>
      );
    case "Spacer":
      return <div style={{ width: style.width ?? 8, height: style.height ?? 8 }} />;
    case "Icon":
      return <span style={{ fontSize: 22, ...style }}>⭐</span>;
    case "Image":
      return (
        <div
          style={{
            width: style.width ?? 80,
            height: style.height ?? 80,
            borderRadius: 16,
            background: "linear-gradient(135deg,#a5b4fc,#f0abfc)",
            display: "grid",
            placeItems: "center",
            fontSize: 28,
            ...style,
          }}
        >
          🖼️
        </div>
      );
    case "Card":
    case "Surface":
      return (
        <div
          style={{ padding: 14, borderRadius: 18, background: "#fff", boxShadow: "0 6px 20px -8px rgba(79,70,229,.3)", ...style }}
        >
          {kids}
        </div>
      );
    default:
      // unknown composable — render its children so structure still shows
      return kids.length ? <div style={style}>{kids}</div> : null;
  }
}

// ── public component ───────────────────────────────────────
export function ComposePreview({ code }: { code: string }) {
  const parsed = useMemo(() => parseCompose(code), [code]);
  const [state, setState] = useState<Record<string, number>>(parsed.state);

  // reset live state whenever the set of state vars / initials changes
  useEffect(() => {
    setState(parsed.state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(parsed.state)]);

  if (parsed.error) {
    return (
      <div className="flex h-full min-h-[160px] flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-coral-400/40 bg-coral-400/5 p-6 text-center">
        <AlertCircle className="h-6 w-6 text-coral-500" />
        <p className="max-w-xs text-sm font-medium text-ink/70">{parsed.error}</p>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-[160px] items-center justify-center rounded-2xl bg-[radial-gradient(circle_at_30%_20%,#eef2ff,#f7f8fc)] p-6">
      <div className="flex flex-col items-center gap-1.5">
        {parsed.roots.map((n, i) => (
          <RenderNode key={i} node={n} state={state} setState={setState} initial={parsed.state} />
        ))}
      </div>
    </div>
  );
}
