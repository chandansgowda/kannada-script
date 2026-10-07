import Expression from ".";

import { TokenTypes } from "../../../../constants/bhaiLangSpec";
import { NodeType } from "../../../../constants/constants";
import { ASTNode } from "../../types/nodeTypes";

import Literal from "./literals";

export default class PrimaryExpression extends Expression {
  getExpression(): ASTNode {
    const token = this._tokenExecutor.getLookahead();

    switch (token?.type) {
      case TokenTypes.OPEN_PARENTHESIS_TYPE:
        return Expression.getExpressionImpl(
          NodeType.ParanthesizedExpression
        ).getExpression();
      case TokenTypes.STRING_TYPE:
      case TokenTypes.NUMBER_TYPE:
      case TokenTypes.BOOLEAN_TYPE:
        return Literal.getLiteralImpl(token.type).getLiteral();
      case TokenTypes.khali_TYPE:
        return this._getkhaliLiteral();
      case TokenTypes.OPEN_BRACKET_TYPE:
        return Literal.getLiteralImpl(token.type).getLiteral();
      case TokenTypes.IDENTIFIER_TYPE:
        return this._getLeftHandSideExpression();
      default:
        throw this._unexpectedTokenError();
    }
  }

  private _unexpectedTokenError() {
    const token = this._tokenExecutor.getLookahead();

    if (!token)
      return this._tokenExecutor.syntaxError(
        `Code ardhakke nintide, illi ondu value beku. (Unexpected end of input, expected an expression)`
      );

    return this._tokenExecutor.syntaxError(
      `illi ondu value beku, aadre "${token.value}" sikkide. (Expected an expression but found "${token.value}")`
    );
  }

  private _getkhaliLiteral() {
    this._tokenExecutor.eatTokenAndForwardLookahead(TokenTypes.khali_TYPE);
    return Literal.getLiteralImpl(TokenTypes.khali_TYPE).getLiteral();
  }

  private _getLeftHandSideExpression() {
    return Expression.getExpressionImpl(
      NodeType.IdentifierExpression
    ).getExpression();
  }
}
