import Visitor from ".";
import { ASTNode, NodeType } from "kannada-script-parser";

import InvalidStateException from "../../exceptions/invalidStateException";
import RuntimeException from "../../exceptions/runtimeException";
import { getOperationValue } from "../../helpers";
import { resolveMember } from "../../helpers/member";
import InterpreterModule from "../../module/interpreterModule";

export default class AssignmentExpression implements Visitor {
  visitNode(node: ASTNode) {
    if (!node.left || !node.right || !node.operator)
      throw new InvalidStateException(
        `left node not present while executing: ${node.type}`
      );

    if (node.left.type === NodeType.MemberExpression)
      return this._assignMember(node.left, node.right, node.operator);

    const identifier = node.left.name;
    if (!identifier)
      throw new InvalidStateException(`Invalid assignment target: ${node.type}`);

    const currentScope = InterpreterModule.getCurrentScope();
    const value = InterpreterModule.evaluate(node.right);

    const newValue =
      node.operator === "="
        ? // still validates that the variable exists
          (currentScope.get(identifier), value)
        : getOperationValue(
            { left: currentScope.get(identifier), right: value },
            node.operator
          );

    currentScope.assign(identifier, newValue);

    return newValue;
  }

  private _assignMember(target: ASTNode, right: ASTNode, operator: string) {
    const { container, index } = resolveMember(target);

    if (!Array.isArray(container))
      throw new RuntimeException(
        `String olagina aksharavannu badalisoke aagalla. (Strings can't be changed)`
      );

    const value = InterpreterModule.evaluate(right);

    container[index] =
      operator === "="
        ? value
        : getOperationValue({ left: container[index], right: value }, operator);

    return container[index];
  }
}
