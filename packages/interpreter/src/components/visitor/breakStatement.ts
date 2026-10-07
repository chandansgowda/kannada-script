import Visitor from ".";

import RuntimeException from "../../exceptions/runtimeException";
import InterpreterModule from "../../module/interpreterModule";
import { BreakSignal } from "../../runtime/signals";


export default class BreakStatement implements Visitor {
  visitNode() {
    if (!InterpreterModule.isInsideLoop())
      throw new RuntimeException(
        `"saaku nilsu" loop olage matra barbeku. Loop elli? (break outside a loop)`
      );

    throw new BreakSignal();
  }
}
