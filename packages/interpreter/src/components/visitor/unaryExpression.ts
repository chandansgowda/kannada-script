import Visitor from ".";
import { ASTNode } from "kannada-script-parser";

import InvalidStateException from "../../exceptions/invalidStateException";
import nallaPointerException from "../../exceptions/nallaPointerException";
import RuntimeException from "../../exceptions/runtimeException";
import InterpreterModule from "../../module/interpreterModule";
import { isTruthy, typeName } from "../../runtime/values";

export default class UnaryExpression implements Visitor {
  visitNode(node: ASTNode) {
    if (!node.argument || !node.operator)
      throw new InvalidStateException(
        `argument or operator not found for: ${node.type}`
      );

    const value = InterpreterModule.evaluate(node.argument);

    if (node.operator === "!") return !isTruthy(value);

    if (value === null)
      throw new nallaPointerException(
        `khali jothe "${node.operator}" maadoke aagalla. (khali can't be used with "${node.operator}")`
      );

    if (typeof value !== "number")
      throw new RuntimeException(
        `"${node.operator}" ${typeName(value)} jothe hondikolalla. (Can't use unary "${node.operator}" with ${typeName(value)})`
      );

    return node.operator === "-" ? -value : value;
  }
}
