import interpreter from "kannada-script-interpreter";

export type OutputLine = {
  kind: "output" | "input";
  value: string;
};

export type RunError = {
  kind: "syntax" | "runtime";
  message: string;
  line?: number;
  column?: number;
};

export type RunResult = {
  lines: OutputLine[];
  error: RunError | null;
  durationMs: number;
};

const MAX_OUTPUT_LINES = 5000;

class OutputLimitError extends Error {}

/**
 * Runs a program. `inputLines` answer `kelu()` calls in order, after which
 * the browser prompt is used.
 */
export function runCode(code: string, inputLines: string[]): RunResult {
  const lines: OutputLine[] = [];
  const pendingInput = [...inputLines];
  let error: RunError | null = null;
  const start = performance.now();

  try {
    interpreter.interpret(code, {
      print: (value) => {
        if (lines.length >= MAX_OUTPUT_LINES) throw new OutputLimitError();
        lines.push({ kind: "output", value });
      },
      input: (prompt) => {
        const answer = pendingInput.length
          ? pendingInput.shift()!
          : window.prompt(prompt ?? "kelu() — input kodi:");
        if (answer === null) return null;
        lines.push({ kind: "input", value: `${prompt ?? ""}${answer}` });
        return answer;
      },
    });
  } catch (e) {
    error = toRunError(e);
  }

  return { lines, error, durationMs: performance.now() - start };
}

function toRunError(e: unknown): RunError {
  if (e instanceof OutputLimitError)
    return {
      kind: "runtime",
      message: `Output thumba doddadaaytu — ${MAX_OUTPUT_LINES} lines matra torisuttene. (Output limit reached)`,
    };

  if (e instanceof SyntaxError) {
    const { line, column } = e as SyntaxError & { line?: number; column?: number };
    return { kind: "syntax", message: e.message, line, column };
  }

  if (e instanceof Error)
    return {
      kind: "runtime",
      // the exception name is shown as a label instead
      message: e.message.replace(/^(RuntimeException|khaliPointerException): /, ""),
    };

  return { kind: "runtime", message: String(e) };
}
