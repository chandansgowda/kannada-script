import Visitor from ".";
import { ASTNode } from "kannada-script-parser";

import { runLoop } from "../../helpers/loop";
import InterpreterModule from "../../module/interpreterModule";


export default class WhileStatement implements Visitor {
  visitNode(node: ASTNode) {
    if (!node.test) return;

    InterpreterModule.withScope(() => runLoop(node.test, node.body));
  }
}
