import { Position } from "../components/tokenizer/types";

/**
 * A SyntaxError carrying where in the source it happened, so editors can
 * point at the offending line.
 */
export type KannadaSyntaxError = SyntaxError & Partial<Position>;

export function syntaxError(
  position: Position | null,
  message: string
): KannadaSyntaxError {
  const error: KannadaSyntaxError = new SyntaxError(
    position
      ? `Ayyo! Line ${position.line}:${position.column} — ${message}`
      : `Ayyo! ${message}`
  );

  if (position) {
    error.line = position.line;
    error.column = position.column;
  }

  return error;
}
