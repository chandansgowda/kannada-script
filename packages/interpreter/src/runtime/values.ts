import { ASTNode } from "kannada-script-parser";

import Scope from "../components/scope";

/** A function declared with `kelasa`. */
export class KannadaFunction {
  constructor(
    readonly name: string,
    readonly params: string[],
    readonly body: ASTNode,
    readonly closure: Scope
  ) {}
}

/** A built-in function implemented in JavaScript. */
export class NativeFunction {
  constructor(
    readonly name: string,
    // null means any number of arguments
    readonly arity: number | [number, number] | null,
    readonly implementation: (...args: unknown[]) => unknown
  ) {}
}

export const isFunction = (
  value: unknown
): value is KannadaFunction | NativeFunction =>
  value instanceof KannadaFunction || value instanceof NativeFunction;

export function typeName(value: unknown): string {
  if (value === null || value === undefined) return "khali";
  if (Array.isArray(value)) return "array";
  if (isFunction(value)) return "kelasa";
  return typeof value;
}

export function isTruthy(value: unknown): boolean {
  if (Array.isArray(value)) return true;
  return Boolean(value);
}

function formatNumber(value: number) {
  if (Number.isInteger(value) || !Number.isFinite(value)) return String(value);
  // hide floating point noise: 0.1 + 0.2 => 0.3
  return String(parseFloat(value.toPrecision(12)));
}

/**
 * How a value is shown by `helu`. Strings nested in arrays are quoted.
 */
export function formatValue(value: unknown, nested = false): string {
  if (value === null || value === undefined) return "khali";
  if (value === true) return "sari";
  if (value === false) return "thappu";
  if (typeof value === "number") return formatNumber(value);
  if (typeof value === "string") return nested ? JSON.stringify(value) : value;
  if (Array.isArray(value))
    return `[${value.map((element) => formatValue(element, true)).join(", ")}]`;
  if (isFunction(value)) return `<kelasa ${value.name}>`;
  return String(value);
}
