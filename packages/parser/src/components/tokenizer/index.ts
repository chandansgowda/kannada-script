import { Spec } from "../../constants/bhaiLangSpec";
import InvalidStateException from "../../exceptions/invalidStateException";
import { syntaxError } from "../../exceptions/syntaxError";

import { Position, Token, Tokenizer } from "./types";

export default class TokenizerImpl implements Tokenizer {
  private _spec: Spec;
  private _string: String | undefined = undefined;
  private _cursor: number;
  private _lastTokenStart: number;
  private _lastTokenEnd: number;
  private _previousTokenEnd: number;

  constructor(spec: Spec) {
    this._spec = spec;
    this._cursor = 0;
    this._lastTokenStart = 0;
    this._lastTokenEnd = 0;
    this._previousTokenEnd = 0;
  }

  initTokenizer(stringToTokenize: String) {
    this._string = stringToTokenize;
    this.setCursor(0);
  }

  setCursor(index: number) {
    this._cursor = index;
    this._lastTokenStart = index;
    this._lastTokenEnd = index;
    this._previousTokenEnd = index;
  }

  isEOF() {
    if (!this._string) return true;

    return this._cursor === this._string.length;
  }

  hasMoreTokens() {
    if (!this._string) return false;

    return this._cursor < this._string.length;
  }

  getLastTokenPosition(): Position {
    return this._positionOf(this._lastTokenStart);
  }

  getPreviousTokenEndPosition(): Position {
    return this._positionOf(this._previousTokenEnd);
  }

  getNextToken(): Token | null {
    if (!this._string)
      throw new InvalidStateException(
        "Tokenizer is not initialized with string. " +
          "Please call initTokenizer method first."
      );

    // skip whitespaces & comments iteratively
    for (;;) {
      if (!this.hasMoreTokens()) {
        this._markToken(this._cursor);
        return null;
      }

      const start = this._cursor;
      const string = this._string.slice(this._cursor);

      let matchedEntry = false;
      for (const { regex, tokenType, canonical } of this._spec) {
        const tokenValue = this._matched(regex, string);

        if (tokenValue === null) {
          continue;
        }

        matchedEntry = true;

        if (tokenType === null) {
          break;
        }

        this._markToken(start);

        return {
          type: tokenType,
          value: canonical ?? tokenValue,
        };
      }

      if (!matchedEntry) {
        this._lastTokenStart = start;
        throw this._unexpectedCharacterError(string);
      }
    }
  }

  private _markToken(start: number) {
    this._previousTokenEnd = this._lastTokenEnd;
    this._lastTokenStart = start;
    this._lastTokenEnd = this._cursor;
  }

  _matched(regex: RegExp, string: string) {
    const matched = regex.exec(string);
    if (matched === null) {
      return null;
    }
    this._cursor += matched[0].length;
    return matched[0];
  }

  private _unexpectedCharacterError(string: string) {
    const position = this._positionOf(this._cursor);
    const char = String.fromCodePoint(string.codePointAt(0) ?? 0);

    if (char === '"' || char === "'") {
      return syntaxError(
        position,
        `String mugisilla — closing ${char} marethideya? (Unterminated string)`
      );
    }

    if (string.startsWith("/*")) {
      return syntaxError(
        position,
        `Comment mugisilla — "*/" beku. (Unterminated comment)`
      );
    }

    return syntaxError(
      position,
      `"${char}" yenu anta gottagilla. (Unexpected character "${char}")`
    );
  }

  private _positionOf(index: number): Position {
    const source = (this._string ?? "").slice(0, index);
    const lines = source.split("\n");
    return {
      line: lines.length,
      column: lines[lines.length - 1].length + 1,
    };
  }
}
