import Visitor from ".";
import { ASTNode } from "kannada-script-parser";

import InvalidStateException from "../../exceptions/invalidStateException";
import { getOperationValue } from "../../helpers";
import InterpreterModule from "../../module/interpreterModule";

export default class BinaryExpression implements Visitor {
  visitNode(node: ASTNode) {
    if (!node.left || !node.right || !node.operator) {
      throw new InvalidStateException(
        `Left , right or operator not found for: ${node.type}`
      );
    }

    const left = InterpreterModule.evaluate(node.left);
    const right = InterpreterModule.evaluate(node.right);

    return getOperationValue({ left, right }, node.operator);
  }
}
