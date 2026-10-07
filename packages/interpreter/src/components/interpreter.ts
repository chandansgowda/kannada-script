import parser from "kannada-script-parser";

import InvalidStateException from "../exceptions/invalidStateException";
import RuntimeException from "../exceptions/runtimeException";
import InterpreterModule, { InterpreterOptions } from "../module/interpreterModule";
import { createBuiltins } from "../runtime/builtins";
import { BreakSignal, ContinueSignal, ReturnSignal } from "../runtime/signals";

import Scope from "./scope";

export default class Interpreter {
  _parser: typeof parser;
  _scope: Scope;

  constructor(parserObj: typeof parser, scope: Scope) {
    this._parser = parserObj;
    this._scope = scope;
  }

  interpret(code: string, options?: InterpreterOptions) {
    InterpreterModule.reset(options);

    // built-ins live in the parent scope, so programs can shadow them
    const builtinsScope = new Scope(null, createBuiltins());
    InterpreterModule.setCurrentScope(new Scope(builtinsScope));

    try {
      const ast = this._parser.parse(code);
      InterpreterModule.getVisitor(ast.type).visitNode(ast);
    } catch (error) {
      throw this._toUserError(error);
    } finally {
      // reset the scope for next run
      InterpreterModule.setCurrentScope(new Scope(null));
    }
  }

  private _toUserError(error: unknown) {
    if (error instanceof RangeError)
      return new RuntimeException(
        `Kelasa thumba aala recursion aaytu — base case marethideya? (Maximum recursion depth exceeded)`
      );

    if (
      error instanceof BreakSignal ||
      error instanceof ContinueSignal ||
      error instanceof ReturnSignal
    )
      return new InvalidStateException(`Unhandled control flow signal`);

    return error;
  }
}
