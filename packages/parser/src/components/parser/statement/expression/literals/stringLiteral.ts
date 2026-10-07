import Literal from ".";

import { TokenTypes } from "../../../../../constants/bhaiLangSpec";
import { NodeType } from "../../../../../constants/constants";
import { ASTNode } from "../../../types/nodeTypes";

const ESCAPES: Record<string, string> = {
  n: "\n",
  t: "\t",
  r: "\r",
  "0": "\0",
  "\\": "\\",
  '"': '"',
  "'": "'",
};

// Unknown escapes are kept as is, so "C:\path" still works
const unescapeString = (value: string) =>
  value.replace(/\\([\s\S])/g, (match, char: string) =>
    char in ESCAPES ? ESCAPES[char] : match
  );

export default class StringLiteral extends Literal {
  getLiteral(): ASTNode {
    const token = this._tokenExecutor.eatTokenAndForwardLookahead(
      TokenTypes.STRING_TYPE
    );
    return {
      type: NodeType.StringLiteral,
      value: unescapeString(token.value.slice(1, -1)),
    };
  }
}
