import { TokenTypes } from "../../../../../constants/kannadascriptSpec";
import UnsupportedTypeException from "../../../../../exceptions/unsupportedTypeException";
import kannadascriptModule from "../../../../../module/kannadascriptModule";
import TokenExecutor from "../../../tokenExecutor";
import { ASTNode } from "../../../types/nodeTypes";

export default abstract class Literal {
  protected _tokenExecutor: TokenExecutor;

  constructor(tokenExecutor: TokenExecutor) {
    this._tokenExecutor = tokenExecutor;
  }

  abstract getLiteral(): ASTNode;

  static getLiteralImpl(tokenType?: string): Literal {
    switch (tokenType) {
      case TokenTypes.NUMBER_TYPE:
        return kannadascriptModule.getNumericLiteral();

      case TokenTypes.BOOLEAN_TYPE:
        return kannadascriptModule.getBooleanLiteral();

      case TokenTypes.STRING_TYPE:
        return kannadascriptModule.getStringLiteral();

      case TokenTypes.khali_TYPE:
        return kannadascriptModule.getNullLiteral();

      default:
        throw new UnsupportedTypeException(
          `Token type not supproted for literal: ${tokenType}`
        );
    }
  }
}
