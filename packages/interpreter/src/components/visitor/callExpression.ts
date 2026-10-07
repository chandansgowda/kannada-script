import Visitor from ".";
import { ASTNode, NodeType } from "kannada-script-parser";

import InvalidStateException from "../../exceptions/invalidStateException";
import RuntimeException from "../../exceptions/runtimeException";
import InterpreterModule from "../../module/interpreterModule";
import { ReturnSignal } from "../../runtime/signals";
import {
  formatValue,
  KannadaFunction,
  NativeFunction,
  typeName,
} from "../../runtime/values";

export default class CallExpression implements Visitor {
  visitNode(node: ASTNode) {
    if (!node.callee)
      throw new InvalidStateException(`callee not found for: ${node.type}`);

    const callee = InterpreterModule.evaluate(node.callee);
    const args = (node.arguments ?? []).map((argument) =>
      InterpreterModule.evaluate(argument)
    );

    if (callee instanceof NativeFunction) {
      this._checkArity(callee.name, callee.arity, args.length);
      return callee.implementation(...args);
    }

    if (callee instanceof KannadaFunction) {
      this._checkArity(callee.name, callee.params.length, args.length);
      return this._callFunction(callee, args);
    }

    const name =
      node.callee.type === NodeType.IdentifierExpression
        ? `"${node.callee.name}"`
        : formatValue(callee, true);

    throw new RuntimeException(
      `${name} kelasa alla, call maadoke aagalla. (${typeName(callee)} is not a function)`
    );
  }

  private _callFunction(fn: KannadaFunction, args: unknown[]) {
    InterpreterModule.tick();

    return InterpreterModule.inFunctionCall(fn.name, () =>
      InterpreterModule.withScope((scope) => {
        fn.params.forEach((param, i) => scope.declare(param, args[i]));

        try {
          InterpreterModule.evaluate(fn.body);
        } catch (signal) {
          if (signal instanceof ReturnSignal) return signal.value;
          throw signal;
        }

        return null;
      }, fn.closure)
    );
  }

  private _checkArity(
    name: string,
    arity: NativeFunction["arity"],
    count: number
  ) {
    if (arity === null) return;

    const [min, max] = typeof arity === "number" ? [arity, arity] : arity;

    if (count < min || count > max) {
      const expected = min === max ? `${min}` : `${min}-${max}`;
      throw new RuntimeException(
        `"${name}" ge ${expected} value(s) beku, aadre ${count} kottidiya. (Expected ${expected} argument(s) but got ${count})`
      );
    }
  }
}
