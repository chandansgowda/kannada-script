import Visitor from ".";
import { ASTNode } from "kannada-script-parser";

import InvalidStateException from "../../exceptions/invalidStateException";
import InterpreterModule from "../../module/interpreterModule";
import { KannadaFunction } from "../../runtime/values";

export default class FunctionDeclaration implements Visitor {
  visitNode(node: ASTNode) {
    const name = node.id?.name;

    if (!name || !node.body || Array.isArray(node.body))
      throw new InvalidStateException(`Invalid function declaration`);

    const scope = InterpreterModule.getCurrentScope();

    scope.declare(
      name,
      new KannadaFunction(
        name,
        (node.params ?? []).map((param) => param.name ?? ""),
        node.body,
        scope
      )
    );
  }
}
