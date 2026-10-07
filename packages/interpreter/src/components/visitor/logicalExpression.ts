import Visitor from ".";
import { ASTNode } from "kannada-script-parser";

import InvalidStateException from "../../exceptions/invalidStateException";
import nallaPointerException from "../../exceptions/nallaPointerException";
import InterpreterModule from "../../module/interpreterModule";
import { isTruthy } from "../../runtime/values";

/**
 * && (mattu) and || (athava), with short circuiting.
 */
export default class LogicalExpression implements Visitor {
  visitNode(node: ASTNode) {
    if (!node.left || !node.right || !node.operator) {
      throw new InvalidStateException(
        `Left , right or operator not found for: ${node.type}`
      );
    }

    const left = this._evaluateOperand(node.left, node.operator);

    if (node.operator === "&&" && !isTruthy(left)) return left;
    if (node.operator === "||" && isTruthy(left)) return left;

    return this._evaluateOperand(node.right, node.operator);
  }

  private _evaluateOperand(node: ASTNode, operator: string) {
    const value = InterpreterModule.evaluate(node);

    if (value === null)
      throw new nallaPointerException(
        `khali jothe "${operator}" maadoke aagalla. (khali can't be used with "${operator}")`
      );

    return value;
  }
}
