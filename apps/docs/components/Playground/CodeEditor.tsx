import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";

import dynamic from "next/dynamic";

import { highlightCode } from "../common/syntax";

const Editor = dynamic(() => import("react-simple-code-editor"), {
  ssr: false,
  loading: () => (
    <div className="p-4 pl-[3.75rem] font-mono text-sm text-neutral-500">
      Editor load aagtide…
    </div>
  ),
});

export const LINE_HEIGHT = 1.7;
const PADDING = 16;
export const CURSOR_MARKER = "§";

export type CursorPosition = { line: number; column: number };

export type CodeEditorHandle = {
  /** Inserts text at the cursor; CURSOR_MARKER marks where the cursor ends up */
  insertSnippet: (snippet: string) => void;
  goToLine: (line: number, column?: number) => void;
  focus: () => void;
};

type Props = {
  code: string;
  onChange: (code: string) => void;
  onRun: () => void;
  onCursorChange: (position: CursorPosition) => void;
  activeLine: number;
  errorLine: number | null;
  fontSize: number;
};

const TEXTAREA_ID = "codeEditor";

function positionOf(value: string, index: number): CursorPosition {
  const before = value.slice(0, index).split("\n");
  return { line: before.length, column: before[before.length - 1].length + 1 };
}

function lineStartIndex(value: string, line: number) {
  let index = 0;
  for (let current = 1; current < line; current++) {
    const next = value.indexOf("\n", index);
    if (next === -1) return value.length;
    index = next + 1;
  }
  return index;
}

const CodeEditor = forwardRef<CodeEditorHandle, Props>(function CodeEditor(
  { code, onChange, onRun, onCursorChange, activeLine, errorLine, fontSize },
  ref
) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const lineHeightPx = fontSize * LINE_HEIGHT;

  const getTextarea = () =>
    document.getElementById(TEXTAREA_ID) as HTMLTextAreaElement | null;

  const reportCursor = useCallback(
    (textarea: HTMLTextAreaElement) =>
      onCursorChange(positionOf(textarea.value, textarea.selectionStart)),
    [onCursorChange]
  );

  /** Replaces the selection, keeping the editor's undo history working. */
  const insertText = useCallback(
    (textarea: HTMLTextAreaElement, text: string) => {
      textarea.focus();
      // execCommand keeps native undo and fires the input event
      if (!document.execCommand("insertText", false, text)) {
        const { selectionStart, selectionEnd, value } = textarea;
        onChange(value.slice(0, selectionStart) + text + value.slice(selectionEnd));
        const caret = selectionStart + text.length;
        requestAnimationFrame(() => textarea.setSelectionRange(caret, caret));
      }
    },
    [onChange]
  );

  const insertSnippet = useCallback(
    (snippet: string) => {
      const textarea = getTextarea();
      if (!textarea) return;

      const { selectionStart, value } = textarea;
      const lineStart = value.lastIndexOf("\n", selectionStart - 1) + 1;
      const indent = value.slice(lineStart).match(/^[ \t]*/)?.[0] ?? "";
      const indented = snippet.replace(/\n/g, `\n${indent}`);
      const marker = indented.indexOf(CURSOR_MARKER);
      const text = indented.replace(CURSOR_MARKER, "");

      insertText(textarea, text);

      if (marker !== -1) {
        const caret = selectionStart + marker;
        textarea.setSelectionRange(caret, caret);
      }
      reportCursor(textarea);
    },
    [insertText, reportCursor]
  );

  const goToLine = useCallback(
    (line: number, column = 1) => {
      const textarea = getTextarea();
      if (!textarea) return;

      const index = Math.min(
        lineStartIndex(textarea.value, line) + column - 1,
        textarea.value.length
      );
      textarea.focus({ preventScroll: true });
      textarea.setSelectionRange(index, index);
      reportCursor(textarea);

      const scroller = scrollRef.current;
      if (scroller)
        scroller.scrollTo({
          top: Math.max(0, PADDING + (line - 1) * lineHeightPx - scroller.clientHeight / 3),
          behavior: "smooth",
        });
    },
    [lineHeightPx, reportCursor]
  );

  useImperativeHandle(ref, () => ({
    insertSnippet,
    goToLine,
    focus: () => getTextarea()?.focus(),
  }));

  const toggleComment = (textarea: HTMLTextAreaElement) => {
    const { value, selectionStart, selectionEnd } = textarea;
    const start = value.lastIndexOf("\n", selectionStart - 1) + 1;
    const endOfLine = value.indexOf("\n", Math.max(selectionEnd - 1, selectionStart));
    const end = endOfLine === -1 ? value.length : endOfLine;
    const lines = value.slice(start, end).split("\n");

    const allCommented = lines
      .filter((line) => line.trim())
      .every((line) => /^\s*\/\//.test(line));

    const updated = lines
      .map((line) => {
        if (!line.trim()) return line;
        return allCommented
          ? line.replace(/^(\s*)\/\/ ?/, "$1")
          : line.replace(/^(\s*)/, "$1// ");
      })
      .join("\n");

    textarea.setSelectionRange(start, end);
    insertText(textarea, updated);
    textarea.setSelectionRange(start, start + updated.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const textarea = e.target as HTMLTextAreaElement;
    const mod = e.ctrlKey || e.metaKey;

    if (mod && e.key === "Enter") {
      e.preventDefault();
      onRun();
      return;
    }

    if (mod && e.key === "/") {
      e.preventDefault();
      toggleComment(textarea);
      return;
    }

    // smart indent after "{"
    if (e.key === "Enter" && !mod && !e.shiftKey && !e.altKey) {
      const { value, selectionStart, selectionEnd } = textarea;
      if (selectionStart !== selectionEnd) return;

      const before = value.slice(0, selectionStart);
      if (!/\{\s*$/.test(before)) return;

      e.preventDefault();
      const lineStart = before.lastIndexOf("\n") + 1;
      const indent = before.slice(lineStart).match(/^[ \t]*/)?.[0] ?? "";
      const closing = /^[ \t]*\}/.test(value.slice(selectionEnd));
      const inner = `\n${indent}  `;

      insertText(textarea, closing ? `${inner}\n${indent}` : inner);
      if (closing) {
        const caret = selectionStart + inner.length;
        textarea.setSelectionRange(caret, caret);
      }
    }
  };

  const highlightWithLineNumbers = (input: string) =>
    highlightCode(input)
      .split("\n")
      .map((line, i) => {
        const classes = ["line-number"];
        if (i + 1 === errorLine) classes.push("is-error");
        else if (i + 1 === activeLine) classes.push("is-active");
        return `<span class="${classes.join(" ")}">${i + 1}</span>${line}`;
      })
      .join("\n");

  const lineTop = (line: number) => PADDING + (line - 1) * lineHeightPx;

  return (
    <div
      ref={scrollRef}
      className="editor-scroll thin-scrollbar min-h-0 flex-1"
      onClick={(e) => {
        // clicking below the last line focuses the editor
        if (e.target === e.currentTarget) getTextarea()?.focus();
      }}
    >
      <label htmlFor={TEXTAREA_ID} className="sr-only">
        Kannada Script code editor
      </label>
      <div
        className="code-editor code-surface relative min-h-full font-mono"
        style={{ fontSize, lineHeight: LINE_HEIGHT }}
      >
        {/* gutter */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 border-r border-white/[0.05] bg-black/20" />
        {/* current line & error line highlights */}
        <div
          className="pointer-events-none absolute inset-x-0 bg-white/[0.035] transition-[top] duration-75"
          style={{ top: lineTop(activeLine), height: lineHeightPx }}
        />
        {errorLine !== null && (
          <div
            className="pointer-events-none absolute inset-x-0 border-l-2 border-kred bg-kred/10"
            style={{ top: lineTop(errorLine), height: lineHeightPx }}
          />
        )}
        <Editor
          value={code}
          onValueChange={onChange}
          highlight={highlightWithLineNumbers}
          padding={PADDING}
          textareaId={TEXTAREA_ID}
          className="relative z-[1] min-h-full"
          textareaClassName="text-transparent"
          onKeyDown={handleKeyDown}
          onKeyUp={(e: React.KeyboardEvent) =>
            reportCursor(e.target as HTMLTextAreaElement)
          }
          onClick={(e: React.MouseEvent) =>
            reportCursor(e.target as HTMLTextAreaElement)
          }
          onFocus={(e: React.FocusEvent) => {
            // props other than the documented ones go to the wrapper div
            const textarea = e.target as HTMLTextAreaElement;
            textarea.spellcheck = false;
            textarea.setAttribute("autocapitalize", "off");
            textarea.setAttribute("autocorrect", "off");
            textarea.setAttribute("autocomplete", "off");
          }}
          style={{ fontFamily: "inherit", minHeight: "100%" }}
        />
      </div>
    </div>
  );
});

export default React.memo(CodeEditor);
