import React, { forwardRef } from "react";

import {
  AlertIcon,
  CheckIcon,
  InputIcon,
  PlayIcon,
  TerminalIcon,
  TrashIcon,
} from "../common/icons";

import { RunResult } from "./runCode";

export type OutputTab = "output" | "input";

type Props = {
  result: RunResult | null;
  tab: OutputTab;
  onTabChange: (tab: OutputTab) => void;
  input: string;
  onInputChange: (input: string) => void;
  onClear: () => void;
  onRun: () => void;
  onGoToLine: (line: number, column?: number) => void;
  modKey: string;
};

const formatDuration = (ms: number) =>
  ms < 1 ? "<1 ms" : ms < 1000 ? `${Math.round(ms)} ms` : `${(ms / 1000).toFixed(2)} s`;

function Status({ result }: { result: RunResult | null }) {
  if (!result)
    return <span className="text-xs font-medium text-neutral-500">Ready</span>;

  if (result.error)
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-kred/10 px-2.5 py-0.5 text-xs font-semibold text-kred-light ring-1 ring-inset ring-kred/30">
        <span className="h-1.5 w-1.5 rounded-full bg-kred-light" />
        Ayyo! Eno thappaythu
      </span>
    );

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-300 ring-1 ring-inset ring-emerald-400/25">
      <CheckIcon size={12} />
      Jai Karnataka · {formatDuration(result.durationMs)}
    </span>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition ${
        active ? "bg-primary text-dark" : "text-neutral-400 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

const OutputPanel = forwardRef<HTMLDivElement, Props>(function OutputPanel(
  { result, tab, onTabChange, input, onInputChange, onClear, onRun, onGoToLine, modKey },
  ref
) {
  const inputLineCount = input.split("\n").filter((line) => line !== "").length;

  return (
    <div ref={ref} className="card flex min-w-0 flex-col overflow-hidden">
      <div className="flex items-center justify-between gap-2 border-b border-white/[0.06] px-3 py-2">
        <div
          role="tablist"
          aria-label="Output panels"
          className="flex items-center gap-1 rounded-full border border-white/[0.06] bg-white/[0.03] p-1"
        >
          <TabButton active={tab === "output"} onClick={() => onTabChange("output")}>
            <TerminalIcon size={13} /> Output
          </TabButton>
          <TabButton active={tab === "input"} onClick={() => onTabChange("input")}>
            <InputIcon size={13} /> Input
            {inputLineCount > 0 && (
              <span
                className={`rounded-full px-1.5 text-[10px] ${
                  tab === "input" ? "bg-dark/15" : "bg-white/10 text-neutral-300"
                }`}
              >
                {inputLineCount}
              </span>
            )}
          </TabButton>
        </div>
        <div className="flex items-center gap-1">
          {tab === "output" && <Status result={result} />}
          {tab === "output" && result && (
            <button
              type="button"
              className="icon-btn h-8 w-8"
              onClick={onClear}
              title="Clear output"
              aria-label="Clear output"
            >
              <TrashIcon size={15} />
            </button>
          )}
        </div>
      </div>

      {tab === "output" ? (
        <div
          className="thin-scrollbar h-[16rem] overflow-auto bg-dark-950/60 p-4 font-mono text-sm leading-relaxed sm:h-[20rem] lg:h-auto lg:flex-1"
          aria-live="polite"
        >
          {!result ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <button
                type="button"
                onClick={onRun}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/20 transition hover:bg-primary/20"
                aria-label="Run code"
              >
                <PlayIcon size={18} />
              </button>
              <p className="font-sans text-sm text-neutral-400">
                <span className="font-semibold text-neutral-200">Run</span> maadi, output illi barutte.
              </p>
              <p className="font-sans text-xs text-neutral-500">
                <kbd className="kbd">{modKey}</kbd> + <kbd className="kbd">Enter</kbd>
              </p>
            </div>
          ) : (
            <div className="space-y-0.5">
              {result.lines.length === 0 && !result.error && (
                <p className="font-sans text-sm italic text-neutral-500">
                  Program odithu, aadre enu helilla. (No output — use <code className="inline-code">helu</code> to print)
                </p>
              )}
              {result.lines.map((line, i) => (
                <div
                  key={i}
                  className={`flex gap-3 whitespace-pre-wrap break-words ${
                    i < 200 ? "animate-fade-up" : ""
                  }`}
                  style={i < 200 ? { animationDelay: `${i * 12}ms` } : undefined}
                >
                  <span className="select-none text-primary/60">
                    {line.kind === "input" ? "?" : "›"}
                  </span>
                  <span
                    className={
                      line.kind === "input" ? "text-sky-300" : "text-neutral-100"
                    }
                  >
                    {line.value}
                  </span>
                </div>
              ))}
              {result.error && (
                <div className="mt-3 animate-fade-up rounded-xl border border-kred/30 bg-kred/[0.08] p-3 font-sans">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-kred-light">
                    <AlertIcon size={14} />
                    {result.error.kind === "syntax" ? "Syntax thappu" : "Runtime thappu"}
                  </div>
                  <p className="mt-1.5 whitespace-pre-wrap break-words font-mono text-[13px] leading-relaxed text-red-100">
                    {result.error.message}
                  </p>
                  {result.error.line !== undefined && (
                    <button
                      type="button"
                      onClick={() => onGoToLine(result.error!.line!, result.error!.column)}
                      className="mt-2 inline-flex items-center gap-1 rounded-lg bg-kred/15 px-2 py-1 text-xs font-semibold text-kred-light transition hover:bg-kred/25"
                    >
                      Line {result.error.line} ge hogi →
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="flex h-[16rem] flex-col gap-2 bg-dark-950/60 p-4 sm:h-[20rem] lg:h-auto lg:flex-1">
          <label htmlFor="programInput" className="text-xs text-neutral-400">
            Prathi line ondu <code className="inline-code">kelu()</code> ge uttara.
            Uttara mugidre browser prompt keLutte.
          </label>
          <textarea
            id="programInput"
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            spellCheck={false}
            placeholder={"Chandan\n24"}
            className="thin-scrollbar flex-1 resize-none rounded-xl border border-white/[0.08] bg-black/30 p-3 font-mono text-sm text-neutral-100 outline-none transition placeholder:text-neutral-600 focus:border-primary/40"
          />
        </div>
      )}
    </div>
  );
});

export default React.memo(OutputPanel);
