import React, { useCallback, useEffect, useRef, useState } from "react";

import { sendEvents } from "../../helpers";
import { copyText } from "../CopyToClipboard";
import {
  DownloadIcon,
  MinusIcon,
  PlayIcon,
  PlusIcon,
  ResetIcon,
  ShareIcon,
} from "../common/icons";
import { getShareUrl, readSharedCode, storage } from "../common/share";
import { detectScript, transliterate } from "../common/transliterate";

import CodeEditor, { CodeEditorHandle, CursorPosition } from "./CodeEditor";
import ExamplePicker from "./ExamplePicker";
import { DEFAULT_EXAMPLE, Example } from "./examples";
import KeywordBar from "./KeywordBar";
import OutputPanel, { OutputTab } from "./OutputPanel";
import { usePlayground } from "./PlaygroundContext";
import { runCode, RunResult } from "./runCode";
import Toast, { ToastMessage } from "./Toast";

const STORAGE_KEYS = {
  code: "kannadascript.code",
  input: "kannadascript.input",
  fontSize: "kannadascript.fontSize",
};

const MIN_FONT_SIZE = 12;
const MAX_FONT_SIZE = 22;

const splitInput = (input: string) => {
  const lines = input.split(/\r?\n/);
  if (lines[lines.length - 1] === "") lines.pop();
  return lines;
};

export default function Playground() {
  const [code, setCode] = useState(DEFAULT_EXAMPLE.code);
  const [input, setInput] = useState("");
  const [result, setResult] = useState<RunResult | null>(null);
  const [errorLine, setErrorLine] = useState<number | null>(null);
  const [tab, setTab] = useState<OutputTab>("output");
  const [fontSize, setFontSize] = useState(15);
  const [cursor, setCursor] = useState<CursorPosition>({ line: 1, column: 1 });
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [modKey, setModKey] = useState("Ctrl");

  const editorRef = useRef<CodeEditorHandle>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const { registerHandler } = usePlayground();

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

  // restore saved / shared code once on the client
  useEffect(() => {
    if (/Mac|iPhone|iPad/.test(navigator.platform)) setModKey("⌘");

    const shared = readSharedCode();
    if (shared !== null) {
      setCode(shared);
      showToast("Share maadida code load aaytu 🎉");
      // drop the param, so a reload shows the user's own edits
      const url = new URL(window.location.href);
      url.searchParams.delete("code");
      window.history.replaceState(null, "", url.toString());
    } else {
      const saved = storage.get(STORAGE_KEYS.code);
      if (saved !== null) setCode(saved);
    }

    setInput(storage.get(STORAGE_KEYS.input) ?? "");
    const savedFontSize = Number(storage.get(STORAGE_KEYS.fontSize));
    if (savedFontSize >= MIN_FONT_SIZE && savedFontSize <= MAX_FONT_SIZE)
      setFontSize(savedFontSize);

    setHydrated(true);
  }, [showToast]);

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

  const run = useCallback(
    (source: string = code, inputText: string = input) => {
      const runResult = runCode(source, splitInput(inputText));
      setResult(runResult);
      setErrorLine(runResult.error?.line ?? null);
      setTab("output");
      sendEvents("CodeExecuted", { success: !runResult.error });

      // the output is below the editor on small screens
      if (window.innerWidth < 1024)
        setTimeout(
          () => outputRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }),
          50
        );
    },
    [code, input]
  );

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
      if (previous.trim() && previous !== newCode)
        showToast(message, { label: "Undo", onClick: () => setCode(previous) });
      else showToast(message);
    },
    [code, showToast]
  );

  // "Try it" buttons in the docs
  useEffect(() => {
    registerHandler((newCode, options) => {
      if (options?.input !== undefined) setInput(options.input);
      replaceCode(newCode, "Code playground ge bantu ✨");
      if (options?.run) run(newCode, options.input ?? input);
    });
    return () => registerHandler(null);
  }, [registerHandler, replaceCode, run, input]);

  const loadExample = (example: Example) => {
    if (example.input !== undefined) setInput(example.input);
    replaceCode(example.code, `"${example.title}" example load aaytu`);
    sendEvents("ExampleLoaded", { example: example.id });
  };

  const script = detectScript(code);
  const toggleScript = () => {
    const target = script === "kannada" ? "latin" : "kannada";
    replaceCode(
      transliterate(code, target),
      target === "kannada" ? "Keywords ಕನ್ನಡ ಲಿಪಿ ge badalaadavu" : "Keywords English lipi ge badalaadavu"
    );
    sendEvents("ScriptToggled", { script: target });
  };

  const share = async () => {
    const copied = await copyText(getShareUrl(code));
    showToast(copied ? "Share link copy aaytu! 🔗" : "Link copy aagilla, URL bar inda copy maadi");
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

  const lineCount = code.split("\n").length;

  return (
    <section id="playground" className="relative mx-auto max-w-7xl scroll-mt-20 px-4 sm:px-6 lg:px-8">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="chip">Playground</span>
          <h2 className="section-title mt-3">
            Try it here <span className="font-kannada text-primary">ಇಲ್ಲೇ ಬರೆಯಿರಿ</span>
          </h2>
          <p className="mt-2 max-w-xl text-sm text-neutral-400">
            Nothing to install. Your code is saved in this browser automatically.
          </p>
        </div>
      </div>

      {/* toolbar */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <ExamplePicker onSelect={loadExample} />
        <button
          type="button"
          className="btn-secondary"
          onClick={toggleScript}
          title="Switch keywords between English letters and Kannada script"
        >
          <span
            className="flex h-5 w-5 items-center justify-center rounded-md bg-primary font-kannada text-xs font-bold leading-none text-dark"
            aria-hidden="true"
          >
            {script === "kannada" ? "A" : "ಕ"}
          </span>
          <span className={script === "kannada" ? "" : "font-kannada"}>
            {script === "kannada" ? "English lipi" : "ಕನ್ನಡ ಲಿಪಿ"}
          </span>
        </button>

        <div className="ml-auto flex items-center gap-1">
          <button type="button" className="btn-ghost" onClick={share} title="Copy a link to this code">
            <ShareIcon size={15} />
            <span className="hidden md:inline">Share</span>
          </button>
          <button type="button" className="btn-ghost" onClick={download} title="Download as main.kans">
            <DownloadIcon size={15} />
            <span className="hidden md:inline">Download</span>
          </button>
          <button type="button" className="btn-ghost" onClick={reset} title="Reset to the starter program">
            <ResetIcon size={15} />
            <span className="hidden md:inline">Reset</span>
          </button>
          <button
            type="button"
            className="btn-primary ml-1 px-5"
            onClick={() => run()}
            disabled={!code.trim()}
            title={`Run (${modKey} + Enter)`}
          >
            <PlayIcon size={14} />
            Run
            <kbd className="hidden rounded bg-dark/10 px-1.5 text-[11px] font-bold lg:inline">
              {modKey} ↵
            </kbd>
          </button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
        {/* editor */}
        <div className="card min-w-0 overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/[0.06] px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-kred/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-primary/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              </span>
              <span className="ml-2 rounded-lg bg-white/[0.05] px-2.5 py-1 font-mono text-xs text-neutral-300">
                main.kans
              </span>
            </div>
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
              <span className="w-8 text-center text-xs tabular-nums text-neutral-500">{fontSize}px</span>
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

          <div className="flex items-center justify-between gap-3 border-t border-white/[0.06] bg-black/20 px-3 py-1.5 text-[11px] text-neutral-500">
            <span className="tabular-nums">
              Ln {cursor.line}, Col {cursor.column} · {lineCount} lines
              {hydrated && <span className="hidden sm:inline"> · Autosaved</span>}
            </span>
            <span className="hidden items-center gap-1 md:flex">
              <kbd className="kbd">{modKey}</kbd>
              <kbd className="kbd">↵</kbd> run
              <span className="mx-1 text-neutral-700">|</span>
              <kbd className="kbd">{modKey}</kbd>
              <kbd className="kbd">/</kbd> comment
            </span>
          </div>
        </div>

        <OutputPanel
          ref={outputRef}
          result={result}
          tab={tab}
          onTabChange={setTab}
          input={input}
          onInputChange={setInput}
          onClear={() => {
            setResult(null);
            setErrorLine(null);
          }}
          onRun={() => run()}
          onGoToLine={(line, column) => editorRef.current?.goToLine(line, column)}
          modKey={modKey}
        />
      </div>

      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </section>
  );
}
