import Expression from ".";

import { TokenTypes } from "../../../../constants/bhaiLangSpec";
import { NodeType } from "../../../../constants/constants";
import { ASTNode } from "../../types/nodeTypes";

/**
 * Function calls and indexing, which can be chained: f(1)[0](2)
 */
export default class CallMemberExpression extends Expression {
  getExpression(): ASTNode {
    let expression = Expression.getExpressionImpl(
      NodeType.PrimaryExpression
    ).getExpression();

    for (;;) {
      const lookahead = this._tokenExecutor.getLookahead();

      if (lookahead?.type === TokenTypes.OPEN_PARENTHESIS_TYPE) {
        expression = {
          type: NodeType.CallExpression,
          callee: expression,
          arguments: this._getArguments(),
        };
      } else if (lookahead?.type === TokenTypes.OPEN_BRACKET_TYPE) {
        this._tokenExecutor.eatTokenAndForwardLookahead(
          TokenTypes.OPEN_BRACKET_TYPE
        );
        const property = Expression.getExpressionImpl(
          NodeType.AssignmentExpression
        ).getExpression();
        this._tokenExecutor.eatTokenAndForwardLookahead(
          TokenTypes.CLOSED_BRACKET_TYPE
        );
        expression = {
          type: NodeType.MemberExpression,
          object: expression,
          property,
        };
      } else {
        return expression;
      }
    }
  }

  private _getArguments() {
    this._tokenExecutor.eatTokenAndForwardLookahead(
      TokenTypes.OPEN_PARENTHESIS_TYPE
    );

    const args = this.getExpressionList(TokenTypes.CLOSED_PARENTHESIS_TYPE);

    this._tokenExecutor.eatTokenAndForwardLookahead(
      TokenTypes.CLOSED_PARENTHESIS_TYPE
    );

    return args;
  }
}
