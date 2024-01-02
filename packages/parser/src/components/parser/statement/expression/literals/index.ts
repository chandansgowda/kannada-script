import { TokenTypes } from "../../../../../constants/bhaiLangSpec";
import UnsupportedTypeException from "../../../../../exceptions/unsupportedTypeException";
import bhaiLangModule from "../../../../../module/bhaiLangModule";
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
        return bhaiLangModule.getNumericLiteral();

      case TokenTypes.BOOLEAN_TYPE:
        return bhaiLangModule.getBooleanLiteral();

      case TokenTypes.STRING_TYPE:
        return bhaiLangModule.getStringLiteral();

      case TokenTypes.khali_TYPE:
        return bhaiLangModule.getNullLiteral();

      default:
        throw new UnsupportedTypeException(
          `Token type not supproted for literal: ${tokenType}`
        );
    }
  }
}
