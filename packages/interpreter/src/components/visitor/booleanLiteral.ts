import Visitor from ".";
import { ASTNode } from "kannada-script-parser";

export default class BooleanLiteral implements Visitor {
  visitNode(node: ASTNode) {
    return node.value;
  }
}
