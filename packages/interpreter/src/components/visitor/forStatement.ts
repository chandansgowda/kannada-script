import Visitor from ".";
import { ASTNode } from "kannada-script-parser";

import { runLoop } from "../../helpers/loop";
import InterpreterModule from "../../module/interpreterModule";


export default class ForStatement implements Visitor {
  visitNode(node: ASTNode) {
    // the loop variable lives in its own scope
    InterpreterModule.withScope(() => {
      if (node.init) InterpreterModule.evaluate(node.init);

      runLoop(node.test, node.body, node.update);
    });
  }
}
