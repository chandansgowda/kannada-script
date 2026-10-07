import Visitor from ".";
import { ASTNode } from "kannada-script-parser";

import InvalidStateException from "../../exceptions/invalidStateException";
import InterpreterModule from "../../module/interpreterModule";
import { formatValue } from "../../runtime/values";


export default class PrintStatement implements Visitor {
  visitNode(node: ASTNode) {
    if (!node.expressions)
      throw new InvalidStateException(
        `No expressions to print: ${node.expressions}`
      );

    const value = node.expressions
      .map((expression: ASTNode) =>
        formatValue(InterpreterModule.evaluate(expression))
      )
      .join(" ");

    InterpreterModule.getOptions().print(value);
  }
}
