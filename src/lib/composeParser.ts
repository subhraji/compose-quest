// ── A tiny, forgiving parser for the *teaching subset* of Compose ──
// It is NOT a Kotlin compiler. It understands enough structure to turn
// common Compose code into a render tree (and to surface friendly errors).
//
// Supported:
//   Calls:        Name(args) { children }   and   Name { children }
//   Named args:   text = "...", fontSize = 20.sp, modifier = Modifier.padding(8.dp)...
//   Modifiers:    Modifier.padding(16.dp).background(Color.Blue).size(80.dp)...
//   State:        var x by remember { mutableStateOf(0) }
//   onClick:      { x++ } / { x-- } / { x = 5 }
//   Interpolation in strings: "Count: $x" and "Count: ${x}"

export interface ModifierCall {
  name: string;
  args: string[];
}

export interface Node {
  name: string;
  /** named arguments, raw string values (already string-unquoted where relevant) */
  named: Record<string, string>;
  /** positional argument raw values */
  positional: string[];
  modifiers: ModifierCall[];
  /** name of the int state var mutated in onClick, + the op */
  onClick?: { kind: "inc" | "dec" | "set" | "noop"; varName?: string; value?: number };
  children: Node[];
}

export interface ParseResult {
  /** state variables discovered: name -> initial int value */
  state: Record<string, number>;
  /** root composable bodies (children of the @Composable fun) */
  roots: Node[];
  error?: string;
}

// ── tokenizer ──────────────────────────────────────────────
type Tok =
  | { t: "id"; v: string }
  | { t: "str"; v: string }
  | { t: "num"; v: string }
  | { t: "punct"; v: string };

function tokenize(src: string): Tok[] {
  const toks: Tok[] = [];
  let i = 0;
  const isIdStart = (c: string) => /[A-Za-z_@]/.test(c);
  const isId = (c: string) => /[A-Za-z0-9_]/.test(c);
  while (i < src.length) {
    const c = src[i];
    if (c === " " || c === "\n" || c === "\t" || c === "\r") {
      i++;
      continue;
    }
    // line comments
    if (c === "/" && src[i + 1] === "/") {
      while (i < src.length && src[i] !== "\n") i++;
      continue;
    }
    if (c === '"') {
      let j = i + 1;
      let v = "";
      while (j < src.length && src[j] !== '"') {
        v += src[j];
        j++;
      }
      toks.push({ t: "str", v });
      i = j + 1;
      continue;
    }
    if (/[0-9]/.test(c)) {
      let j = i;
      let v = "";
      while (j < src.length && /[0-9xXa-fA-F.]/.test(src[j])) {
        v += src[j];
        j++;
      }
      toks.push({ t: "num", v });
      i = j;
      continue;
    }
    if (isIdStart(c)) {
      let j = i;
      let v = "";
      while (j < src.length && isId(src[j])) {
        v += src[j];
        j++;
      }
      toks.push({ t: "id", v });
      i = j;
      continue;
    }
    toks.push({ t: "punct", v: c });
    i++;
  }
  return toks;
}

// composables the live preview knows how to draw
const RENDERABLE = new Set([
  "Text", "Button", "Column", "Row", "Box", "Spacer", "Icon", "Image", "Card", "Surface",
]);

// ── up-front syntax validation ─────────────────────────────
// The tokenizer/parser are intentionally forgiving, so they would silently
// swallow real mistakes. We catch the common ones here and return a friendly,
// specific message the learner can act on.
function findSyntaxError(src: string): string | null {
  // strip line comments so // ... doesn't count toward brackets/quotes
  const noComments = src.replace(/\/\/[^\n]*/g, "");

  // unterminated string: remove every complete "..." then any leftover " is unbalanced
  const noStrings = noComments.replace(/"(?:[^"\\]|\\.)*"/g, "");
  if (noStrings.includes('"')) {
    return 'A text string is missing its closing quote ( " ).';
  }

  // balanced & correctly-nested brackets
  const closeToOpen: Record<string, string> = { ")": "(", "}": "{", "]": "[" };
  const openToClose: Record<string, string> = { "(": ")", "{": "}", "[": "]" };
  const stack: string[] = [];
  for (const ch of noStrings) {
    if (ch === "(" || ch === "{" || ch === "[") {
      stack.push(ch);
    } else if (ch === ")" || ch === "}" || ch === "]") {
      const top = stack.pop();
      if (!top) {
        return `There's an extra closing ${ch} with no matching ${closeToOpen[ch]}.`;
      }
      if (top !== closeToOpen[ch]) {
        return `Mismatched brackets — found ${ch} where a ${openToClose[top]} was expected.`;
      }
    }
  }
  if (stack.length > 0) {
    const unclosed = stack[stack.length - 1];
    return `A ${unclosed} is never closed — add a matching ${openToClose[unclosed]}.`;
  }

  return null;
}

// flatten the render tree so we can inspect every node
function collectNodes(nodes: Node[], acc: Node[]): void {
  for (const n of nodes) {
    acc.push(n);
    collectNodes(n.children, acc);
  }
}

// ── parser ─────────────────────────────────────────────────
export function parseCompose(src: string): ParseResult {
  // 0) bail early on clear syntax errors with a specific message
  const syntaxError = findSyntaxError(src);
  if (syntaxError) {
    return { state: {}, roots: [], error: syntaxError };
  }

  const state: Record<string, number> = {};

  // 1) discover state vars:  var NAME by remember { mutableStateOf(N) }
  const stateRe = /var\s+(\w+)\s+by\s+remember\s*\{\s*mutableStateOf\(\s*(-?\d+)\s*\)\s*\}/g;
  let m: RegExpExecArray | null;
  while ((m = stateRe.exec(src))) {
    state[m[1]] = parseInt(m[2], 10);
  }

  // 2) strip the outer @Composable fun X() { ... } wrapper if present,
  //    keeping only the body so we parse the UI tree.
  let body = src;
  const funMatch = src.match(/@Composable[\s\S]*?fun\s+\w+\s*\([^)]*\)\s*\{/);
  if (funMatch) {
    const start = src.indexOf(funMatch[0]) + funMatch[0].length;
    body = src.slice(start, src.lastIndexOf("}"));
  }
  // remove the state declaration lines so they aren't parsed as calls
  body = body.replace(stateRe, "");

  const toks = tokenize(body);
  let p = 0;
  const peek = () => toks[p];
  const next = () => toks[p++];

  function parseBlock(): Node[] {
    const nodes: Node[] = [];
    while (p < toks.length) {
      const tk = peek();
      if (!tk) break;
      if (tk.t === "punct" && tk.v === "}") {
        next();
        break;
      }
      if (tk.t === "id") {
        const node = parseCall();
        if (node) nodes.push(node);
      } else {
        next(); // skip stray tokens
      }
    }
    return nodes;
  }

  function parseCall(): Node | null {
    const nameTok = next();
    if (!nameTok || nameTok.t !== "id") return null;
    const node: Node = {
      name: nameTok.v,
      named: {},
      positional: [],
      modifiers: [],
      children: [],
    };

    // arguments?
    if (peek() && peek().t === "punct" && peek().v === "(") {
      next(); // (
      parseArgs(node);
    }

    // trailing lambda { ... }
    if (peek() && peek().t === "punct" && peek().v === "{") {
      next(); // {
      node.children = parseBlock();
    }
    return node;
  }

  function parseArgs(node: Node) {
    // read until matching )
    while (p < toks.length) {
      const tk = peek();
      if (!tk) break;
      if (tk.t === "punct" && tk.v === ")") {
        next();
        break;
      }
      if (tk.t === "punct" && tk.v === ",") {
        next();
        continue;
      }
      // named arg?  id =
      if (tk.t === "id" && toks[p + 1] && toks[p + 1].t === "punct" && toks[p + 1].v === "=") {
        const key = (next() as { v: string }).v;
        next(); // =
        readArgValue(node, key);
      } else {
        // positional
        readArgValue(node, null);
      }
    }
  }

  function readArgValue(node: Node, key: string | null) {
    const tk = peek();
    if (!tk) return;

    // string literal
    if (tk.t === "str") {
      next();
      if (key) node.named[key] = tk.v;
      else node.positional.push(tk.v);
      return;
    }
    // onClick lambda
    if (tk.t === "punct" && tk.v === "{") {
      const lambda = consumeBalanced("{", "}");
      if (key === "onClick") node.onClick = parseOnClick(lambda);
      return;
    }
    // Modifier chain or other dotted/called expression
    if (tk.t === "id") {
      const startId = next() as { v: string };
      if (startId.v === "Modifier") {
        node.modifiers = parseModifierChain();
        if (key) node.named[key] = "Modifier";
        return;
      }
      // expression like Color.Red, 20.sp, Alignment.Center, FontWeight.Bold
      let expr = startId.v;
      expr += consumeDotted();
      if (key) node.named[key] = expr;
      else node.positional.push(expr);
      return;
    }
    // number like 20.sp handled as num + .sp
    if (tk.t === "num") {
      const n = next() as { v: string };
      let expr = n.v + consumeDotted();
      if (key) node.named[key] = expr;
      else node.positional.push(expr);
      return;
    }
    next(); // skip
  }

  // consume `.foo(...)` chains, returning the raw text
  function consumeDotted(): string {
    let out = "";
    while (peek() && peek().t === "punct" && peek().v === ".") {
      next();
      out += ".";
      const id = peek();
      if (id && id.t === "id") {
        out += (next() as { v: string }).v;
      }
      if (peek() && peek().t === "punct" && peek().v === "(") {
        out += "(" + consumeBalanced("(", ")") + ")";
      }
    }
    return out;
  }

  function parseModifierChain(): ModifierCall[] {
    const mods: ModifierCall[] = [];
    while (peek() && peek().t === "punct" && peek().v === ".") {
      next(); // .
      const nameTok = peek();
      if (!nameTok || nameTok.t !== "id") break;
      const name = (next() as { v: string }).v;
      const args: string[] = [];
      if (peek() && peek().t === "punct" && peek().v === "(") {
        const inner = consumeBalanced("(", ")");
        // split top-level commas
        inner
          .split(/,(?![^(]*\))/)
          .map((s) => s.trim())
          .filter(Boolean)
          .forEach((a) => args.push(a));
      }
      mods.push({ name, args });
    }
    return mods;
  }

  // returns the raw inner text between an already-seen-or-about-to-see opener
  function consumeBalanced(open: string, close: string): string {
    // assumes current token is the opener
    if (peek() && peek().t === "punct" && peek().v === open) next();
    let depth = 1;
    let out = "";
    while (p < toks.length && depth > 0) {
      const tk = next();
      if (tk.t === "punct" && tk.v === open) depth++;
      else if (tk.t === "punct" && tk.v === close) {
        depth--;
        if (depth === 0) break;
      }
      out += tk.t === "str" ? `"${tk.v}"` : tk.v;
      if (tk.t === "id" || tk.t === "num") out += " ";
    }
    return out.trim();
  }

  function parseOnClick(body: string): Node["onClick"] {
    let mm = body.match(/(\w+)\s*\+\+/);
    if (mm) return { kind: "inc", varName: mm[1] };
    mm = body.match(/(\w+)\s*--/);
    if (mm) return { kind: "dec", varName: mm[1] };
    mm = body.match(/(\w+)\s*=\s*(-?\d+)/);
    if (mm) return { kind: "set", varName: mm[1], value: parseInt(mm[2], 10) };
    return { kind: "noop" };
  }

  let roots: Node[] = [];
  let error: string | undefined;
  try {
    roots = parseBlock();
    if (roots.length === 0) {
      error = 'I couldn\'t find any Composables to draw. Try adding something like Text("Hello").';
    } else {
      // nothing the preview can actually render? point at the culprit.
      const all: Node[] = [];
      collectNodes(roots, all);
      const hasRenderable = all.some((n) => RENDERABLE.has(n.name));
      if (!hasRenderable) {
        const firstUnknown = all.find((n) => n.children.length === 0) ?? all[0];
        error = `I don't know how to draw "${firstUnknown.name}". The live preview supports Text, Button, Column, Row, Box, Image, Icon, Card and Surface.`;
      }
    }
  } catch (e) {
    error = "Hmm, I couldn't read that code. Check for matching { } and ( ).";
  }

  return { state, roots, error };
}
