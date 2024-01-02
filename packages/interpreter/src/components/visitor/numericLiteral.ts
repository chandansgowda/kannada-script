import Visitor from ".";
import { ASTNode } from "kannada-script-parser";

export default class NumericLiteral implements Visitor {
  visitNode(node: ASTNode) {
    return node.value;
  }
}
