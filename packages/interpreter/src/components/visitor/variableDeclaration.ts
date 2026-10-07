import Visitor from ".";
import { ASTNode } from "kannada-script-parser";

import InvalidStateException from "../../exceptions/invalidStateException";
import InterpreterModule from "../../module/interpreterModule";

export default class VariableDeclaration implements Visitor {
  visitNode(node: ASTNode) {
    if (!node.id || !node.init || !node.id.name) {
      throw new InvalidStateException(`id or init not found for ${node.type}`);
    }

    const value = InterpreterModule.evaluate(node.init);

    InterpreterModule.getCurrentScope().declare(node.id.name, value);
  }
}
