import { ASTNode } from "kannada-script-parser";

export default interface Visitor {
  visitNode(node: ASTNode): unknown;
}
