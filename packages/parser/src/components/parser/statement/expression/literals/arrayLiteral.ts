import Literal from ".";

import { TokenTypes } from "../../../../../constants/bhaiLangSpec";
import { NodeType } from "../../../../../constants/constants";
import { ASTNode } from "../../../types/nodeTypes";
import Expression from "..";

/**
 * [1, 2, "mooru"]
 */
export default class ArrayLiteral extends Literal {
  getLiteral(): ASTNode {
    this._tokenExecutor.eatTokenAndForwardLookahead(
      TokenTypes.OPEN_BRACKET_TYPE
    );

    const elements: ASTNode[] = [];

    while (
      this._tokenExecutor.getLookahead()?.type !== TokenTypes.CLOSED_BRACKET_TYPE
    ) {
      elements.push(
        Expression.getExpressionImpl(
          NodeType.AssignmentExpression
        ).getExpression()
      );

      // allow a trailing comma
      if (this._tokenExecutor.getLookahead()?.type !== TokenTypes.COMMA_TYPE)
        break;
      this._tokenExecutor.eatTokenAndForwardLookahead(TokenTypes.COMMA_TYPE);
    }

    this._tokenExecutor.eatTokenAndForwardLookahead(
      TokenTypes.CLOSED_BRACKET_TYPE
    );

    return {
      type: NodeType.ArrayLiteral,
      elements,
    };
  }
}
