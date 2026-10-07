import Statement from ".";

import { TokenTypes } from "../../../constants/bhaiLangSpec";
import { NodeType } from "../../../constants/constants";
import bhaiLangModule from "../../../module/bhaiLangModule";
import { ASTNode } from "../types/nodeTypes";

import Expression from "./expression";

/**
 * prathi (idu i = 0; i < 10; i += 1) { ... }
 *
 * Every part inside the parenthesis is optional.
 */
export default class ForStatement extends Statement {
  getStatement(): ASTNode {
    this._tokenExecutor.eatTokenAndForwardLookahead(TokenTypes.FOR_TYPE);

    this._tokenExecutor.eatTokenAndForwardLookahead(
      TokenTypes.OPEN_PARENTHESIS_TYPE
    );

    const init = this._getInit();

    const test = this._getOptionalExpression(TokenTypes.SEMI_COLON_TYPE);
    this._tokenExecutor.eatTokenAndForwardLookahead(TokenTypes.SEMI_COLON_TYPE);

    const update = this._getOptionalExpression(
      TokenTypes.CLOSED_PARENTHESIS_TYPE
    );
    this._tokenExecutor.eatTokenAndForwardLookahead(
      TokenTypes.CLOSED_PARENTHESIS_TYPE
    );

    if (this._tokenExecutor.getLookahead() == null) {
      throw this._tokenExecutor.unexpectedEndError(
        TokenTypes.OPEN_CURLY_BRACE_TYPE
      );
    }

    const body = Statement.getStatementImpl(
      this._tokenExecutor.getLookahead()!
    ).getStatement();

    return {
      type: NodeType.ForStatement,
      init,
      test,
      update,
      body,
    };
  }

  private _getInit(): ASTNode | null {
    const lookahead = this._tokenExecutor.getLookahead();

    // variable statement consumes its own semicolon
    if (lookahead?.type === TokenTypes.BHAI_YE_HAI_TYPE)
      return bhaiLangModule.getVariableStatement().getStatement();

    const init = this._getOptionalExpression(TokenTypes.SEMI_COLON_TYPE);
    this._tokenExecutor.eatTokenAndForwardLookahead(TokenTypes.SEMI_COLON_TYPE);
    return init;
  }

  private _getOptionalExpression(stopTokenType: string): ASTNode | null {
    if (this._tokenExecutor.getLookahead()?.type === stopTokenType) return null;

    return Expression.getExpressionImpl(
      NodeType.AssignmentExpression
    ).getExpression();
  }
}
