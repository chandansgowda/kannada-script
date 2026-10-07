import React, { useCallback, useEffect, useRef, useState } from "react";

import { sendEvents } from "../../helpers";
import { copyText } from "../CopyToClipboard";
import {
  CodeIcon,
  DownloadIcon,
  InputIcon,
  MinusIcon,
  PlayIcon,
  PlusIcon,
  ResetIcon,
  ShareIcon,
  TerminalIcon,
} from "../common/icons";
import { decodeCode, getShareUrl, storage } from "../common/share";
import { detectScript, transliterate } from "../common/transliterate";

import CodeEditor, { CodeEditorHandle, CursorPosition } from "./CodeEditor";
import ExamplePicker from "./ExamplePicker";
import { DEFAULT_EXAMPLE, Example } from "./examples";
import KeywordBar from "./KeywordBar";
import MoreMenu from "./MoreMenu";
import OutputPanel, { OutputTab } from "./OutputPanel";
import { runCode, RunResult } from "./runCode";
import Toast, { ToastMessage } from "./Toast";

const STORAGE_KEYS = {
  code: "kannadascript.code",
  input: "kannadascript.input",
  fontSize: "kannadascript.fontSize",
};

const MIN_FONT_SIZE = 12;
const MAX_FONT_SIZE = 22;

type MobilePane = "code" | OutputTab;

const splitInput = (input: string) => {
  const lines = input.split(/\r?\n/);
  if (lines[lines.length - 1] === "") lines.pop();
  return lines;
};

const isDesktop = () => window.matchMedia("(min-width: 1024px)").matches;

export default function Playground() {
  const [code, setCode] = useState(DEFAULT_EXAMPLE.code);
  const [input, setInput] = useState("");
  const [result, setResult] = useState<RunResult | null>(null);
  const [errorLine, setErrorLine] = useState<number | null>(null);
  const [outputTab, setOutputTab] = useState<OutputTab>("output");
  const [mobilePane, setMobilePane] = useState<MobilePane>("code");
  const [fontSize, setFontSize] = useState(15);
  const [cursor, setCursor] = useState<CursorPosition>({ line: 1, column: 1 });
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [modKey, setModKey] = useState("Ctrl");

  const editorRef = useRef<CodeEditorHandle>(null);

  const showToast = useCallback(
    (message: string, action?: ToastMessage["action"]) =>
      setToast({ id: Date.now(), message, action }),
    []
  );

  useEffect(() => {
    if (!toast) return;
    const timeout = setTimeout(() => setToast(null), toast.action ? 6000 : 3000);
    return () => clearTimeout(timeout);
  }, [toast]);

  const showOutput = useCallback((runResult: RunResult) => {
    setResult(runResult);
    setErrorLine(runResult.error?.line ?? null);
    setOutputTab("output");
    // on phones the output replaces the editor
    if (!isDesktop()) setMobilePane("output");
  }, []);

  // restore saved code, or load code from a share link / docs "Try it"
  useEffect(() => {
    if (/Mac|iPhone|iPad/.test(navigator.platform)) setModKey("⌘");

    const params = new URLSearchParams(window.location.search);
    const saved = storage.get(STORAGE_KEYS.code);
    const savedInput = storage.get(STORAGE_KEYS.input) ?? "";
    const shared = params.get("code") ? decodeCode(params.get("code")!) : null;
    const sharedInput = params.get("input") ? decodeCode(params.get("input")!) : null;

    if (shared !== null) {
      setCode(shared);
      setInput(sharedInput ?? savedInput);
      if (params.get("run") === "1") showOutput(runCode(shared, splitInput(sharedInput ?? "")));

      if (saved && saved.trim() && saved !== shared)
        showToast("Hosa code load aaytu", {
          label: "Nanna code",
          onClick: () => {
            setCode(saved);
            setResult(null);
            setErrorLine(null);
          },
        });

      // drop the params, so a reload shows the user's own edits
      window.history.replaceState(null, "", window.location.pathname);
    } else {
      if (saved !== null) setCode(saved);
      setInput(savedInput);
    }

    const savedFontSize = Number(storage.get(STORAGE_KEYS.fontSize));
    if (savedFontSize >= MIN_FONT_SIZE && savedFontSize <= MAX_FONT_SIZE)
      setFontSize(savedFontSize);
    else if (!isDesktop()) setFontSize(14);

    setHydrated(true);
  }, [showToast, showOutput]);

  // autosave
  useEffect(() => {
    if (!hydrated) return;
    const timeout = setTimeout(() => {
      storage.set(STORAGE_KEYS.code, code);
      storage.set(STORAGE_KEYS.input, input);
      storage.set(STORAGE_KEYS.fontSize, String(fontSize));
    }, 300);
    return () => clearTimeout(timeout);
  }, [code, input, fontSize, hydrated]);

  const run = useCallback(() => {
    const runResult = runCode(code, splitInput(input));
    showOutput(runResult);
    sendEvents("CodeExecuted", { success: !runResult.error });
  }, [code, input, showOutput]);

  const handleCodeChange = useCallback((newCode: string) => {
    setCode(newCode);
    setErrorLine(null);
  }, []);

  /** Replaces the whole program, offering an undo. */
  const replaceCode = useCallback(
    (newCode: string, message: string) => {
      const previous = code;
      setCode(newCode);
      setResult(null);
      setErrorLine(null);
      setMobilePane("code");
      if (previous.trim() && previous !== newCode)
        showToast(message, { label: "Undo", onClick: () => setCode(previous) });
      else showToast(message);
    },
    [code, showToast]
  );

  const loadExample = (example: Example) => {
    if (example.input !== undefined) setInput(example.input);
    replaceCode(example.code, `"${example.title}" load aaytu`);
    sendEvents("ExampleLoaded", { example: example.id });
  };

  const script = detectScript(code);
  const toggleScript = () => {
    const target = script === "kannada" ? "latin" : "kannada";
    replaceCode(
      transliterate(code, target),
      target === "kannada" ? "Keywords ಕನ್ನಡ ಲಿಪಿ ge badalaadavu" : "Keywords English ge badalaadavu"
    );
    sendEvents("ScriptToggled", { script: target });
  };

  const share = async () => {
    const copied = await copyText(getShareUrl(code));
    showToast(copied ? "Share link copy aaytu! 🔗" : "Link copy aagilla");
    sendEvents("CodeShared");
  };

  const download = () => {
    const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "main.kans";
    link.click();
    URL.revokeObjectURL(url);
    sendEvents("CodeDownloaded");
  };

  const reset = () => {
    replaceCode(DEFAULT_EXAMPLE.code, "Code reset aaytu");
    sendEvents("CodeCleared");
  };

  const changeFontSize = (delta: number) =>
    setFontSize((size) => Math.min(MAX_FONT_SIZE, Math.max(MIN_FONT_SIZE, size + delta)));

  const goToLine = (line: number, column?: number) => {
    setMobilePane("code");
    // wait for the editor to be visible on phones
    setTimeout(() => editorRef.current?.goToLine(line, column), 50);
  };

  const selectMobilePane = (pane: MobilePane) => {
    setMobilePane(pane);
    if (pane !== "code") setOutputTab(pane);
  };

  const lineCount = code.split("\n").length;
  const inputLineCount = splitInput(input).filter(Boolean).length;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {/* toolbar */}
      <div className="flex items-center gap-2 border-b border-white/[0.06] px-3 py-2 sm:px-4">
        <ExamplePicker onSelect={loadExample} />
        <button
          type="button"
          className="btn-secondary h-10 px-3"
          onClick={toggleScript}
          title="Switch keywords between English letters and Kannada script"
        >
          <span
            className="flex h-5 w-5 items-center justify-center rounded-md bg-primary font-kannada text-[13px] font-bold text-dark"
            aria-hidden="true"
          >
            {script === "kannada" ? "A" : "ಕ"}
          </span>
          <span className={script === "kannada" ? "" : "font-kannada"}>
            {script === "kannada" ? "English" : "ಕನ್ನಡ ಲಿಪಿ"}
          </span>
        </button>

        <div className="ml-auto flex items-center gap-1">
          <div className="hidden items-center gap-1 lg:flex">
            <button type="button" className="btn-ghost" onClick={share} title="Copy a link to this code">
              <ShareIcon size={15} /> Share
            </button>
            <button type="button" className="btn-ghost" onClick={download} title="Download as main.kans">
              <DownloadIcon size={15} /> Download
            </button>
            <button type="button" className="btn-ghost" onClick={reset} title="Reset to the starter program">
              <ResetIcon size={15} /> Reset
            </button>
            <button
              type="button"
              className="btn-primary ml-1 h-10 px-5"
              onClick={run}
              disabled={!code.trim()}
              title={`Run (${modKey} + Enter)`}
            >
              <PlayIcon size={14} />
              Run
              <kbd className="rounded bg-dark/10 px-1.5 text-[11px] font-bold">{modKey} ↵</kbd>
            </button>
          </div>
          <div className="lg:hidden">
            <MoreMenu
              onShare={share}
              onDownload={download}
              onReset={reset}
              fontSize={fontSize}
              onFontSizeChange={changeFontSize}
            />
          </div>
        </div>
      </div>

      {/* panes */}
      <div className="grid min-h-0 flex-1 gap-3 p-3 sm:p-4 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
        <div
          className={`card min-h-0 min-w-0 flex-col overflow-hidden ${
            mobilePane === "code" ? "flex" : "hidden lg:flex"
          }`}
        >
          <div className="hidden items-center justify-between border-b border-white/[0.06] px-3 py-1.5 lg:flex">
            <span className="rounded-lg bg-white/[0.05] px-2.5 py-1 font-mono text-xs text-neutral-300">
              main.kans
            </span>
            <div className="flex items-center gap-0.5">
              <button
                type="button"
                className="icon-btn h-8 w-8"
                onClick={() => changeFontSize(-1)}
                disabled={fontSize <= MIN_FONT_SIZE}
                aria-label="Decrease font size"
                title="Smaller text"
              >
                <MinusIcon size={14} />
              </button>
              <span className="w-10 text-center text-xs tabular-nums text-neutral-500">{fontSize}px</span>
              <button
                type="button"
                className="icon-btn h-8 w-8"
                onClick={() => changeFontSize(1)}
                disabled={fontSize >= MAX_FONT_SIZE}
                aria-label="Increase font size"
                title="Bigger text"
              >
                <PlusIcon size={14} />
              </button>
            </div>
          </div>

          <CodeEditor
            ref={editorRef}
            code={code}
            onChange={handleCodeChange}
            onRun={run}
            onCursorChange={setCursor}
            activeLine={cursor.line}
            errorLine={errorLine}
            fontSize={fontSize}
          />

          <KeywordBar
            onInsert={(snippet) => editorRef.current?.insertSnippet(snippet)}
            transform={(snippet) => (script === "kannada" ? transliterate(snippet, "kannada") : snippet)}
          />

          <div className="hidden items-center justify-between gap-3 border-t border-white/[0.06] bg-black/20 px-3 py-1.5 text-[11px] text-neutral-500 sm:flex">
            <span className="tabular-nums">
              Ln {cursor.line}, Col {cursor.column} · {lineCount} lines
              {hydrated && " · Autosaved"}
            </span>
            <span className="hidden items-center gap-1 lg:flex">
              <kbd className="kbd">{modKey}</kbd>
              <kbd className="kbd">↵</kbd> run
              <span className="mx-1 text-neutral-700">|</span>
              <kbd className="kbd">{modKey}</kbd>
              <kbd className="kbd">/</kbd> comment
            </span>
          </div>
        </div>

        <div className={`min-h-0 min-w-0 ${mobilePane === "code" ? "hidden lg:flex" : "flex"}`}>
          <OutputPanel
            result={result}
            tab={outputTab}
            onTabChange={setOutputTab}
            input={input}
            onInputChange={setInput}
            onClear={() => {
              setResult(null);
              setErrorLine(null);
            }}
            onRun={run}
            onGoToLine={goToLine}
            modKey={modKey}
          />
        </div>
      </div>

      {/* phone tab bar */}
      <nav
        aria-label="Playground panes"
        className="flex items-center gap-2 border-t border-white/[0.08] bg-dark-900/95 px-3 pb-[calc(0.5rem+env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl lg:hidden"
      >
        <div className="grid flex-1 grid-cols-3" role="tablist">
          {(
            [
              { pane: "code", label: "Code", Icon: CodeIcon },
              { pane: "output", label: "Output", Icon: TerminalIcon },
              { pane: "input", label: "Input", Icon: InputIcon },
            ] as const
          ).map(({ pane, label, Icon }) => (
            <button
              key={pane}
              type="button"
              role="tab"
              aria-selected={mobilePane === pane}
              onClick={() => selectMobilePane(pane)}
              className={`relative flex flex-col items-center gap-1 rounded-xl py-1.5 text-[11px] font-semibold transition ${
                mobilePane === pane ? "text-primary" : "text-neutral-500"
              }`}
            >
              <Icon size={19} />
              {label}
              {pane === "output" && result && mobilePane !== "output" && (
                <span
                  className={`absolute right-[calc(50%-18px)] top-1 h-2 w-2 rounded-full ${
                    result?.error ? "bg-kred" : "bg-emerald-400"
                  }`}
                />
              )}
              {pane === "input" && inputLineCount > 0 && (
                <span className="absolute right-[calc(50%-22px)] top-0.5 rounded-full bg-white/10 px-1.5 text-[10px] text-neutral-300">
                  {inputLineCount}
                </span>
              )}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="btn-primary h-12 rounded-2xl px-6 text-[15px]"
          onClick={run}
          disabled={!code.trim()}
        >
          <PlayIcon size={15} />
          Run
        </button>
      </nav>

      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </div>
  );
}
