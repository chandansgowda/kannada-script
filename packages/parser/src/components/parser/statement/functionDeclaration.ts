import Statement from ".";

import { TokenTypes } from "../../../constants/bhaiLangSpec";
import { NodeType } from "../../../constants/constants";
import { ASTNode } from "../types/nodeTypes";

import Expression from "./expression";

/**
 * kelasa name(a, b) { ... }
 */
export default class FunctionDeclaration extends Statement {
  getStatement(): ASTNode {
    this._tokenExecutor.eatTokenAndForwardLookahead(TokenTypes.FUNCTION_TYPE);

    const id = this._getIdentifier();

    this._tokenExecutor.eatTokenAndForwardLookahead(
      TokenTypes.OPEN_PARENTHESIS_TYPE
    );

    const params: ASTNode[] = [];

    if (
      this._tokenExecutor.getLookahead()?.type !==
      TokenTypes.CLOSED_PARENTHESIS_TYPE
    ) {
      do {
        const param = this._getIdentifier();

        if (params.some((existing) => existing.name === param.name)) {
          throw this._tokenExecutor.syntaxError(
            `"${param.name}" parameter eradu sala ide. (Duplicate parameter "${param.name}")`
          );
        }

        params.push(param);
      } while (
        this._tokenExecutor.getLookahead()?.type === TokenTypes.COMMA_TYPE &&
        this._tokenExecutor.eatTokenAndForwardLookahead(TokenTypes.COMMA_TYPE)
      );
    }

    this._tokenExecutor.eatTokenAndForwardLookahead(
      TokenTypes.CLOSED_PARENTHESIS_TYPE
    );

    if (
      this._tokenExecutor.getLookahead()?.type !==
      TokenTypes.OPEN_CURLY_BRACE_TYPE
    ) {
      // reuse the standard "expected {" error
      this._tokenExecutor.expectToken(TokenTypes.OPEN_CURLY_BRACE_TYPE);
    }

    const body = Statement.getStatementImpl(
      this._tokenExecutor.getLookahead()!
    ).getStatement();

    return {
      type: NodeType.FunctionDeclaration,
      id,
      params,
      body,
    };
  }

  private _getIdentifier() {
    return Expression.getExpressionImpl(
      NodeType.IdentifierExpression
    ).getExpression();
  }
}
