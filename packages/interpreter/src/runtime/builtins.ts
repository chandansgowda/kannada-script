import RuntimeException from "../exceptions/runtimeException";
import InterpreterModule from "../module/interpreterModule";

import { formatValue, NativeFunction, typeName } from "./values";

function expectArray(functionName: string, value: unknown): unknown[] {
  if (!Array.isArray(value))
    throw new RuntimeException(
      `"${functionName}" ge array beku, aadre ${typeName(value)} kottidiya. (Expected an array)`
    );
  return value;
}

const BUILTINS: { names: string[]; arity: NativeFunction["arity"]; implementation: (...args: unknown[]) => unknown }[] = [
  {
    // length of a string or array
    names: ["uddha", "ಉದ್ದ"],
    arity: 1,
    implementation: (value) => {
      if (typeof value === "string" || Array.isArray(value))
        return value.length;
      throw new RuntimeException(
        `${typeName(value)} ge uddha illa. (uddha works on strings and arrays)`
      );
    },
  },
  {
    // add an element at the end of an array, returns the new length
    names: ["serisu", "ಸೇರಿಸು"],
    arity: 2,
    implementation: (array, value) => expectArray("serisu", array).push(value),
  },
  {
    // remove the last element of an array and return it
    names: ["tegi", "ತೆಗಿ"],
    arity: 1,
    implementation: (array) => {
      const elements = expectArray("tegi", array);
      return elements.length ? elements.pop() : null;
    },
  },
  {
    // convert to number
    names: ["sankhye", "ಸಂಖ್ಯೆ"],
    arity: 1,
    implementation: (value) => {
      if (typeof value === "number") return value;
      if (typeof value === "boolean") return value ? 1 : 0;
      if (typeof value === "string" && value.trim() !== "") {
        const number = Number(value.trim());
        if (!Number.isNaN(number)) return number;
      }
      throw new RuntimeException(
        `${formatValue(value, true)} sankhye alla. (Not a number)`
      );
    },
  },
  {
    // convert to string
    names: ["pada", "ಪದ"],
    arity: 1,
    implementation: (value) => formatValue(value),
  },
  {
    // round down to a whole number
    names: ["poorna", "ಪೂರ್ಣ"],
    arity: 1,
    implementation: (value) => {
      if (typeof value !== "number")
        throw new RuntimeException(
          `"poorna" ge sankhye beku, aadre ${typeName(value)} kottidiya. (Expected a number)`
        );
      return Math.floor(value);
    },
  },
  {
    // read a line of input
    names: ["kelu", "ಕೇಳು"],
    arity: [0, 1],
    implementation: (prompt) => {
      const input = InterpreterModule.getOptions().input;
      if (!input)
        throw new RuntimeException(
          `Illi input kodoke aagalla. (Input is not supported here)`
        );
      const line = input(prompt === undefined ? undefined : formatValue(prompt));
      return line === undefined ? null : line;
    },
  },
];

export const BUILTIN_NAMES = BUILTINS.map(({ names }) => names[0]);

export function createBuiltins(): Map<string, NativeFunction> {
  const builtins = new Map<string, NativeFunction>();

  for (const { names, arity, implementation } of BUILTINS) {
    const fn = new NativeFunction(names[0], arity, implementation);
    names.forEach((name) => builtins.set(name, fn));
  }

  return builtins;
}
