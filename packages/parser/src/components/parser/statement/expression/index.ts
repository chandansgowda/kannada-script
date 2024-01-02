import { NodeType } from "../../../../constants/constants";
import bhaiLangModule from "../../../../module/bhaiLangModule";
import TokenExecutor from "../../tokenExecutor";
import { ASTNode } from "../../types/nodeTypes";

export default abstract class Expression {
  protected _tokenExecutor: TokenExecutor;

  constructor(tokenExecutor: TokenExecutor) {
    this._tokenExecutor = tokenExecutor;
  }

  abstract getExpression(): ASTNode;

  static getExpressionImpl(expressionType: keyof typeof NodeType): Expression {
    switch (expressionType) {
      case NodeType.AdditiveExpression:
        return bhaiLangModule.getAdditiveExpression();

      case NodeType.MultiplicativeExpression:
        return bhaiLangModule.getMultiplicativeExpression();

      case NodeType.PrimaryExpression:
        return bhaiLangModule.getPrimaryExpression();

      case NodeType.ParanthesizedExpression:
        return bhaiLangModule.getParanthesizedExpression();

      case NodeType.AssignmentExpression:
        return bhaiLangModule.getAssignmentExpression();

      case NodeType.EqualityExpression:
        return bhaiLangModule.getEqualityExpression();

      case NodeType.LogicalANDExpression:
        return bhaiLangModule.getLogicalANDExpression();

      case NodeType.LogicalORExpression:
        return bhaiLangModule.getLogicalORExpression();

      case NodeType.RelationalExpression:
        return bhaiLangModule.getRelationalExpression();

      default:
        return bhaiLangModule.getIndentifierExpression();
    }
  }

  protected getBinaryExpression(
    downstreamExpressionType: keyof typeof NodeType,
    operatorToken: string
  ) {
    return this._getExpression(
      downstreamExpressionType,
      operatorToken,
      NodeType.BinaryExpression
    );
  }

  protected getLogicalExpression(
    downstreamExpressionType: keyof typeof NodeType,
    operatorToken: string
  ) {
    return this._getExpression(
      downstreamExpressionType,
      operatorToken,
      NodeType.LogicalExpression
    );
  }

  private _getExpression(
    downstreamExpressionType: keyof typeof NodeType,
    operatorToken: string,
    expressionType: keyof typeof NodeType
  ) {
    let left = Expression.getExpressionImpl(
      downstreamExpressionType
    ).getExpression();

    while (this._tokenExecutor.getLookahead()?.type === operatorToken) {
      const operator =
        this._tokenExecutor.eatTokenAndForwardLookahead(operatorToken);
      const right = Expression.getExpressionImpl(
        downstreamExpressionType
      ).getExpression();

      left = {
        type: expressionType,
        operator: operator.value,
        left,
        right,
      };
    }

    return left;
  }
}
