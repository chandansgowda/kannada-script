import Visitor from ".";

export default class NullLiteral implements Visitor {
  visitNode() {
    return null;
  }
}
