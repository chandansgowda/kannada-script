import Statement from ".";

import { TokenTypes } from "../../../constants/bhaiLangSpec";
import { NodeType } from "../../../constants/constants";
import { ASTNode } from "../types/nodeTypes";

import Expression from "./expression";

/**
 * kodu;  or  kodu expression;
 */
export default class ReturnStatement extends Statement {
  getStatement(): ASTNode {
    this._tokenExecutor.eatTokenAndForwardLookahead(TokenTypes.RETURN_TYPE);

    const argument =
      this._tokenExecutor.getLookahead()?.type !== TokenTypes.SEMI_COLON_TYPE
        ? Expression.getExpressionImpl(
            NodeType.AssignmentExpression
          ).getExpression()
        : null;

    this._tokenExecutor.eatTokenAndForwardLookahead(TokenTypes.SEMI_COLON_TYPE);

    return {
      type: NodeType.ReturnStatement,
      argument,
    };
  }
}
