import { ASTNode } from "kannada-script-parser";

import InvalidStateException from "../exceptions/invalidStateException";
import nallaPointerException from "../exceptions/nallaPointerException";
import RuntimeException from "../exceptions/runtimeException";
import InterpreterModule from "../module/interpreterModule";
import { formatValue, typeName } from "../runtime/values";

/**
 * Evaluates `object[property]` and validates the index.
 */
export function resolveMember(node: ASTNode): {
  container: unknown[] | string;
  index: number;
} {
  if (!node.object || !node.property)
    throw new InvalidStateException(
      `object or property not found for: ${node.type}`
    );

  const container = InterpreterModule.evaluate(node.object);
  const index = InterpreterModule.evaluate(node.property);

  if (container === null)
    throw new nallaPointerException(
      `khali ge index maadoke aagalla. (Can't index khali)`
    );

  if (!Array.isArray(container) && typeof container !== "string")
    throw new RuntimeException(
      `${typeName(container)} ge index maadoke aagalla. (Only arrays and strings can be indexed)`
    );

  if (typeof index !== "number" || !Number.isInteger(index))
    throw new RuntimeException(
      `Index poorna sankhye irbeku, ${formatValue(index, true)} alla. (Index must be a whole number)`
    );

  if (index < 0 || index >= container.length)
    throw new RuntimeException(
      `Index ${index} horage hogide, uddha ${container.length} matra. (Index out of range)`
    );

  return { container, index };
}
