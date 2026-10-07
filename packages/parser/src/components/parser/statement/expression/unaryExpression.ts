import Expression from ".";

import { TokenTypes } from "../../../../constants/bhaiLangSpec";
import { NodeType } from "../../../../constants/constants";
import { ASTNode } from "../../types/nodeTypes";

const UNARY_OPERATOR_TYPES = [
  TokenTypes.ADDITIVE_OPERATOR_TYPE,
  TokenTypes.LOGICAL_NOT,
];

/**
 * -x, +x, !x / alla x
 */
export default class UnaryExpression extends Expression {
  getExpression(): ASTNode {
    const lookahead = this._tokenExecutor.getLookahead();

    if (!lookahead || !UNARY_OPERATOR_TYPES.includes(lookahead.type)) {
      return Expression.getExpressionImpl(
        NodeType.CallMemberExpression
      ).getExpression();
    }

    const operator = this._tokenExecutor.eatTokenAndForwardLookahead(
      lookahead.type
    ).value;
    const argument = this.getExpression();

    // fold signed number literals, so -5 stays a plain NumericLiteral
    if (
      (operator === "-" || operator === "+") &&
      argument.type === NodeType.NumericLiteral &&
      typeof argument.value === "number"
    ) {
      return {
        type: NodeType.NumericLiteral,
        value: operator === "-" ? -argument.value : argument.value,
      };
    }

    return {
      type: NodeType.UnaryExpression,
      operator,
      argument,
    };
  }
}
