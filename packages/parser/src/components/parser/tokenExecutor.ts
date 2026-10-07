import { TokenTypes } from "../../constants/bhaiLangSpec";
import { syntaxError } from "../../exceptions/syntaxError";
import { Token, Tokenizer } from "../tokenizer/types";

// Human friendly names for token types used in error messages
const TOKEN_DESCRIPTIONS: Record<string, string> = {
  [TokenTypes.IDENTIFIER_TYPE]: "variable hesaru (a name)",
  [TokenTypes.NUMBER_TYPE]: "sankhye (a number)",
  [TokenTypes.STRING_TYPE]: "string",
  [TokenTypes.BOOLEAN_TYPE]: "sari/thappu",
  [TokenTypes.SIMPLE_ASSIGN_TYPE]: '"="',
  [TokenTypes.COMPLEX_ASSIGN_TYPE]: "assignment operator",
};

export const describeTokenType = (tokenType: string | null) =>
  (tokenType && TOKEN_DESCRIPTIONS[tokenType]) || `"${tokenType}"`;

export default class TokenExecutor {
  private _tokenizer: Tokenizer;
  private _lookahead: Token | null = null;

  constructor(tokenizer: Tokenizer) {
    this._tokenizer = tokenizer;
  }

  eatTokenAndForwardLookahead(tokenType: string | null) {
    const token = this.expectToken(tokenType);

    this.setLookahead(this._tokenizer.getNextToken());

    return token;
  }

  /**
   * Validates the lookahead without reading the next token. Used for the
   * last token of a program, so that whatever follows it is never tokenized.
   */
  expectToken(tokenType: string | null) {
    const token = this._lookahead;

    if (token == null) {
      throw this.unexpectedEndError(tokenType);
    }

    if (token.type !== tokenType && tokenType === TokenTypes.SEMI_COLON_TYPE) {
      // point at where the semicolon is missing, not at the next line
      throw syntaxError(
        this._tokenizer.getPreviousTokenEndPosition(),
        `illi ";" beku — marethideya? (Missing ";" before "${token.value}")`
      );
    }

    if (token.type !== tokenType) {
      throw this.syntaxError(
        `illi ${describeTokenType(tokenType)} beku, aadre "${token.value}" sikkide. ` +
          `(Expected ${describeTokenType(tokenType)} but found "${token.value}")`
      );
    }

    return token;
  }

  unexpectedEndError(tokenType: string | null) {
    if (tokenType === TokenTypes.HI_BHAI_TYPE) {
      return syntaxError(
        null,
        `"namaskara" sikkilla! Program "namaskara" inda shuru aagbeku. (Program must start with "namaskara")`
      );
    }

    if (tokenType === TokenTypes.BYE_BHAI_TYPE) {
      return this.syntaxError(
        `Program mugiyalilla — "matte sigona" marethideya? (Missing "matte sigona")`
      );
    }

    return this.syntaxError(
      `Code ardhakke nintide, ${describeTokenType(tokenType)} beku. ` +
        `(Unexpected end of input, expected ${describeTokenType(tokenType)})`
    );
  }

  /** Creates a SyntaxError pointing at the current lookahead token. */
  syntaxError(message: string) {
    return syntaxError(this._tokenizer.getLastTokenPosition(), message);
  }

  eatOptionalSemiColonToken() {
    if (this.getLookahead()?.type == TokenTypes.SEMI_COLON_TYPE)
      this.eatTokenAndForwardLookahead(TokenTypes.SEMI_COLON_TYPE);
  }

  getLookahead() {
    return this._lookahead;
  }

  setLookahead(lookahead: Token | null) {
    this._lookahead = lookahead;
  }
}
