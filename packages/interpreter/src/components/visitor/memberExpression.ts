import Visitor from ".";
import { ASTNode } from "kannada-script-parser";

import { resolveMember } from "../../helpers/member";

export default class MemberExpression implements Visitor {
  visitNode(node: ASTNode) {
    const { container, index } = resolveMember(node);
    return container[index];
  }
}
