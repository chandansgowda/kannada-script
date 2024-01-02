import Visitor from ".";
import { ASTNode } from "kannada-script-parser";

export default class EmptyStatement implements Visitor {
  visitNode(_: ASTNode) {
    return;
  }
}
