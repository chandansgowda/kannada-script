import { NodeType } from "../../../../constants/constants";
import kannadascriptModule from "../../../../module/kannadascriptModule";
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
        return kannadascriptModule.getAdditiveExpression();

      case NodeType.MultiplicativeExpression:
        return kannadascriptModule.getMultiplicativeExpression();

      case NodeType.PrimaryExpression:
        return kannadascriptModule.getPrimaryExpression();

      case NodeType.ParanthesizedExpression:
        return kannadascriptModule.getParanthesizedExpression();

      case NodeType.AssignmentExpression:
        return kannadascriptModule.getAssignmentExpression();

      case NodeType.EqualityExpression:
        return kannadascriptModule.getEqualityExpression();

      case NodeType.LogicalANDExpression:
        return kannadascriptModule.getLogicalANDExpression();

      case NodeType.LogicalORExpression:
        return kannadascriptModule.getLogicalORExpression();

      case NodeType.RelationalExpression:
        return kannadascriptModule.getRelationalExpression();

      default:
        return kannadascriptModule.getIndentifierExpression();
    }
  }

  protected getBinaryExpression(
    downstreamExpressionType: keyof typeof NodeType,
    operatorToken: string
  ) {
    return this._getExpression(downstreamExpressionType, operatorToken, NodeType.BinaryExpression);
  }

  protected getLogicalExpression(
    downstreamExpressionType: keyof typeof NodeType,
    operatorToken: string
    ) {
    return this._getExpression(downstreamExpressionType, operatorToken, NodeType.LogicalExpression);
  }

  private _getExpression(
    downstreamExpressionType: keyof typeof NodeType,
    operatorToken: string,
    expressionType: keyof typeof NodeType
    ) {
    let left = Expression.getExpressionImpl(downstreamExpressionType).getExpression();

    while (this._tokenExecutor.getLookahead()?.type === operatorToken) {
      const operator =
        this._tokenExecutor.eatTokenAndForwardLookahead(operatorToken);
      const right =
        Expression.getExpressionImpl(downstreamExpressionType).getExpression();

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
