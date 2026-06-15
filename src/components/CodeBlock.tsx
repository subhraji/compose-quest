import React from "react";

const KEYWORDS = new Set([
  "fun", "val", "var", "by", "if", "else", "for", "while", "return",
  "class", "object", "true", "false", "null", "when", "is", "in",
]);

/** very small Kotlin highlighter for display only */
function highlight(line: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  // comments first
  const commentIdx = line.indexOf("//");
  let code = line;
  let comment = "";
  if (commentIdx !== -1) {
    code = line.slice(0, commentIdx);
    comment = line.slice(commentIdx);
  }

  const tokenRe = /(@\w+)|("(?:[^"\\]|\\.)*")|(\b\d+(?:\.\d+)?\b)|(\b[A-Za-z_]\w*\b)|(\s+)|([^\sA-Za-z0-9_@"]+)/g;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = tokenRe.exec(code))) {
    const [whole, anno, str, num, word, ws, sym] = m;
    if (anno) out.push(<span key={key++} className="tok-anno">{anno}</span>);
    else if (str) out.push(<span key={key++} className="tok-str">{str}</span>);
    else if (num) out.push(<span key={key++} className="tok-num">{num}</span>);
    else if (word) {
      if (KEYWORDS.has(word)) out.push(<span key={key++} className="tok-kw">{word}</span>);
      else if (/^[A-Z]/.test(word)) out.push(<span key={key++} className="tok-fn">{word}</span>);
      else out.push(<span key={key++}>{word}</span>);
    } else if (ws) out.push(<span key={key++}>{ws}</span>);
    else out.push(<span key={key++}>{sym}</span>);
  }
  if (comment) out.push(<span key={key++} className="tok-com">{comment}</span>);
  return out;
}

export function CodeBlock({ code, className = "" }: { code: string; className?: string }) {
  const lines = code.replace(/\n$/, "").split("\n");
  return (
    <pre className={`code-surface ${className}`}>
      <code>
        {lines.map((ln, i) => (
          <div key={i}>{highlight(ln).length ? highlight(ln) : " "}</div>
        ))}
      </code>
    </pre>
  );
}
