import Visitor from ".";
import { ASTNode } from "kannada-script-parser";

import InterpreterModule from "../../module/interpreterModule";
import { isTruthy } from "../../runtime/values";


export default class IfStatement implements Visitor {

  private evaluateNode(node: ASTNode | undefined) {
    if (node) {
      InterpreterModule.withScope(() => InterpreterModule.evaluate(node));
    }
  }

  visitNode(node: ASTNode) {
    const test = node.test;
    if (!test) return;

    if (isTruthy(InterpreterModule.evaluate(test))) {
      this.evaluateNode(node.consequent);
      return;
    }

    for (const alternate of node.alternates ?? []) {
      // "illa andre" nodes have a test but no alternates of their own
      if (!alternate.test || alternate.alternates) {
        // Reached the "enu illa andre" node in the alternate list, simply evaluate it
        this.evaluateNode(alternate);
        return;
      }

      // Evaluate the "test" condition of the "illa andre" node
      if (isTruthy(InterpreterModule.evaluate(alternate.test))) {
        this.evaluateNode(alternate.consequent);
        return;
      }
    }
  }
}
