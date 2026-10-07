import Visitor from ".";
import { ASTNode } from "kannada-script-parser";

import InterpreterModule from "../../module/interpreterModule";

export default class ArrayLiteral implements Visitor {
  visitNode(node: ASTNode) {
    return (node.elements ?? []).map((element) =>
      InterpreterModule.evaluate(element)
    );
  }
}
