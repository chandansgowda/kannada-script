import Literal from ".";

import { TokenTypes } from "../../../../../constants/bhaiLangSpec";
import { NodeType } from "../../../../../constants/constants";
import { ASTNode } from "../../../types/nodeTypes";

// Kannada digits ೦-೯ (U+0CE6 - U+0CEF) to 0-9
const toAsciiDigits = (value: string) =>
  value.replace(/[\u0CE6-\u0CEF]/g, (digit) =>
    String(digit.charCodeAt(0) - 0x0ce6)
  );

export default class NumericLiteral extends Literal {
  getLiteral(): ASTNode {
    const token = this._tokenExecutor.eatTokenAndForwardLookahead(
      TokenTypes.NUMBER_TYPE
    );
    return {
      type: NodeType.NumericLiteral,
      value: Number(toAsciiDigits(token.value)),
    };
  }
}
