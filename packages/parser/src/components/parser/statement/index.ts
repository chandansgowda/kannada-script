import { TokenTypes } from "../../../constants/bhaiLangSpec";
import bhaiLangModule from "../../../module/bhaiLangModule";
import { Token } from "../../tokenizer/types";
import TokenExecutor from "../tokenExecutor";
import { ASTNode } from "../types/nodeTypes";

export default abstract class Statement {
  protected _tokenExecutor: TokenExecutor;

  constructor(tokenExecutor: TokenExecutor) {
    this._tokenExecutor = tokenExecutor;
  }

  abstract getStatement(): ASTNode;

  static getStatementImpl(lookahead: Token): Statement {
    switch (lookahead.type) {
      case TokenTypes.BOL_BHAI_TYPE:
        return bhaiLangModule.getPrintStatement();

      case TokenTypes.SEMI_COLON_TYPE:
        return bhaiLangModule.getEmptyStatement();

      case TokenTypes.OPEN_CURLY_BRACE_TYPE:
        return bhaiLangModule.getBlockStatement();

      case TokenTypes.BHAI_YE_HAI_TYPE:
        return bhaiLangModule.getVariableStatement();

      case TokenTypes.AGAR_BHAI:
        return bhaiLangModule.getIfStatement();

      case TokenTypes.JAB_TAK_BHAI:
        return bhaiLangModule.getWhileStatement();

      case TokenTypes.BAS_KAR_BHAI:
        return bhaiLangModule.getBreakStatement();

      case TokenTypes.AGLA_DEKH_BHAI:
        return bhaiLangModule.getContinueStatement();

      default:
        return bhaiLangModule.getExpressionStatement();
    }
  }
}
