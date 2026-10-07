import Visitor from ".";

import RuntimeException from "../../exceptions/runtimeException";
import InterpreterModule from "../../module/interpreterModule";
import { ContinueSignal } from "../../runtime/signals";


export default class ContinueStatement implements Visitor {
  visitNode() {
    if (!InterpreterModule.isInsideLoop())
      throw new RuntimeException(
        `"munde nodu" loop olage matra barbeku. Loop elli? (continue outside a loop)`
      );

    throw new ContinueSignal();
  }
}
