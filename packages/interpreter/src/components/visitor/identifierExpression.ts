import Visitor from ".";
import { ASTNode } from "kannada-script-parser";

import InvalidStateException from "../../exceptions/invalidStateException";
import InterpreterModule from "../../module/interpreterModule";

export default class IdentifierExpression implements Visitor {
  visitNode(node: ASTNode) {
    if (!node.name) {
      throw new InvalidStateException(`Invalid node name for: ${node.type}`);
    }

    let value = InterpreterModule.getCurrentScope().get(node.name);

    if (value === null) value = "khali";
    else if (value === true) value = "sari";
    else if (value === false) value = "thappu";

    return value;
  }
}
