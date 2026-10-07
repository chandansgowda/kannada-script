import React from "react";

import { CURSOR_MARKER as C } from "./CodeEditor";

// snippets inserted by the quick-insert bar, C marks the cursor position
const SNIPPETS: { label: string; snippet: string; hint: string }[] = [
  { label: "helu", snippet: `helu "${C}";`, hint: "print" },
  { label: "idu", snippet: `idu ${C} = ;`, hint: "variable" },
  { label: "enadru", snippet: `enadru (${C}) {\n  \n}`, hint: "if" },
  { label: "illa andre", snippet: ` illa andre (${C}) {\n  \n}`, hint: "else if" },
  { label: "enu illa andre", snippet: ` enu illa andre {\n  ${C}\n}`, hint: "else" },
  { label: "ellivargu", snippet: `ellivargu (${C}) {\n  \n}`, hint: "while" },
  { label: "prathi", snippet: `prathi (idu i = 0; i < ${C}; i += 1) {\n  \n}`, hint: "for" },
  { label: "kelasa", snippet: `kelasa ${C}() {\n  \n}`, hint: "function" },
  { label: "kodu", snippet: `kodu ${C};`, hint: "return" },
  { label: "saaku nilsu", snippet: `saaku nilsu;${C}`, hint: "break" },
  { label: "munde nodu", snippet: `munde nodu;${C}`, hint: "continue" },
  { label: "sari", snippet: `sari${C}`, hint: "true" },
  { label: "thappu", snippet: `thappu${C}`, hint: "false" },
  { label: "khali", snippet: `khali${C}`, hint: "null" },
  { label: "mattu", snippet: ` mattu ${C}`, hint: "&&" },
  { label: "athava", snippet: ` athava ${C}`, hint: "||" },
  { label: "alla", snippet: `alla ${C}`, hint: "!" },
  { label: "kelu()", snippet: `kelu("${C}")`, hint: "input" },
  { label: "uddha()", snippet: `uddha(${C})`, hint: "length" },
];

type Props = {
  onInsert: (snippet: string) => void;
  transform: (snippet: string) => string;
};

export default function KeywordBar({ onInsert, transform }: Props) {
  return (
    <div className="thin-scrollbar flex items-center gap-1.5 overflow-x-auto border-t border-white/[0.06] px-3 py-2">
      <span className="shrink-0 pr-1 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
        Insert
      </span>
      {SNIPPETS.map(({ label, snippet, hint }) => (
        <button
          key={label}
          type="button"
          title={`${label} — ${hint}`}
          // keep the editor focused & its selection intact
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => onInsert(transform(snippet))}
          className="shrink-0 rounded-lg border border-white/[0.08] bg-white/[0.03] px-2 py-1 font-mono text-xs text-neutral-300 transition hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
        >
          {transform(label)}
        </button>
      ))}
    </div>
  );
}
