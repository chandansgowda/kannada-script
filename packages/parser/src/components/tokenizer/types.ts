export interface Tokenizer {
  initTokenizer(stringToTokenize: String): void;

  isEOF(): boolean;

  hasMoreTokens(): boolean;

  getNextToken(): Token | null;

  /** Moves the cursor to the given index of the source string. */
  setCursor(index: number): void;

  /** Line/column (1-based) where the most recently returned token starts. */
  getLastTokenPosition(): Position;

  /** Line/column right after the token returned before the last one. */
  getPreviousTokenEndPosition(): Position;
}

export interface Token {
  type: string;

  value: string;
}

export interface Position {
  line: number;

  column: number;
}
