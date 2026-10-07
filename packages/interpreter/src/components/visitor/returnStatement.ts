import Visitor from ".";
import { ASTNode } from "kannada-script-parser";

import RuntimeException from "../../exceptions/runtimeException";
import InterpreterModule from "../../module/interpreterModule";
import { ReturnSignal } from "../../runtime/signals";


export default class ReturnStatement implements Visitor {
  visitNode(node: ASTNode) {
    if (!InterpreterModule.isInsideFunction())
      throw new RuntimeException(
        `"kodu" kelasa olage matra barbeku. (return outside a function)`
      );

    throw new ReturnSignal(
      node.argument ? InterpreterModule.evaluate(node.argument) : null
    );
  }
}
