import { ASTNode } from "kannada-script-parser";

import InterpreterModule from "../module/interpreterModule";
import { BreakSignal, ContinueSignal } from "../runtime/signals";
import { isTruthy } from "../runtime/values";

/**
 * Runs a loop body until the test fails or `saaku nilsu` is used.
 */
export function runLoop(
  test: ASTNode | null | undefined,
  body: ASTNode | ASTNode[] | undefined,
  update?: ASTNode | null
) {
  InterpreterModule.inLoop(() => {
    while (!test || isTruthy(InterpreterModule.evaluate(test))) {
      InterpreterModule.tick();

      try {
        if (body && !Array.isArray(body)) InterpreterModule.evaluate(body);
      } catch (signal) {
        if (signal instanceof BreakSignal) break;
        if (!(signal instanceof ContinueSignal)) throw signal;
      }

      if (update) InterpreterModule.evaluate(update);
    }
  });
}
