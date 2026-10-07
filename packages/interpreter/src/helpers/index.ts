import InvalidStateException from "../exceptions/invalidStateException";
import nallaPointerException from "../exceptions/nallaPointerException";
import RuntimeException from "../exceptions/runtimeException";
import { typeName } from "../runtime/values";

// operators which work on any type of operands
const UNTYPED_OPERATORS = ["=", "==", "!=", "&&", "||"];


export function checkNumberOperands(operands: {
  left: unknown;
  right: unknown;
}): operands is { left: number; right: number } {
  return (
    typeof operands.left === "number" && typeof operands.right === "number"
  );
}

export function checkStringOperands(operands: {
  left: unknown;
  right: unknown;
}): operands is { left: string; right: string } {
  return (
    typeof operands.left === "string" && typeof operands.right === "string"
  );
}

export function checkNumberAndStringOperands(operands: {
  left: unknown;
  right: unknown;
}): operands is { left: string; right: string } {
  return (
    (typeof operands.left === "string" && typeof operands.right === "number") || (typeof operands.right === "string" && typeof operands.left === "number")
  );
} 

export function getOperationValue(
  operands: { left: unknown; right: unknown },
  operator: string
) {
  // created lazily: building an Error captures a stack trace, which is slow
  const exception = () => new RuntimeException(
    `"${operator}" jothe ${typeName(operands.left)} mattu ${typeName(operands.right)} hondikolalla. ` +
      `(Can't use "${operator}" with ${typeName(operands.left)} and ${typeName(operands.right)})`
  );

  if (!UNTYPED_OPERATORS.includes(operator)) {
    if (operands.left === null || operands.right === null)
      throw new nallaPointerException(
        `khali jothe "${operator}" maadoke aagalla. (khali can't be used with "${operator}")`
      );

    if (typeof operands.left === "boolean" || typeof operands.right === "boolean")
      throw new RuntimeException(
        `sari/thappu jothe "${operator}" maadoke aagalla. (Booleans can't be used with "${operator}")`
      );
  }

  switch (operator) {
    case "=":
      return operands.right;

    case "+=":
    case "+":
      if (checkNumberOperands(operands)) {
        return operands.left + operands.right;
      }

      if (checkStringOperands(operands)) {
        return operands.left + operands.right;
      }

      if (checkNumberAndStringOperands(operands)) {
        return operands.left.toString() + operands.right.toString();
      }

      throw exception();

    case "-=":
    case "-":
      if (checkNumberOperands(operands)) {
        return operands.left - operands.right;
      }

      throw exception();

    case "*=":
    case "*":
      if (checkNumberOperands(operands)) {
        return operands.left * operands.right;
      }

      throw exception();

    case "/=":
    case "/":
      if (operands.right === 0) {
        throw new RuntimeException(
          `Sonne (0) inda bhaagisoke aagalla! (Division by zero)`
        );
      }
      
      if (checkNumberOperands(operands)) {
        return operands.left / operands.right;
      }

      throw exception();
    
    case "%=":
    case "%":
      if (operands.right === 0) {
        throw new RuntimeException(
          `Sonne (0) inda sheshaa kanDu hidiyoke aagalla! (Modulo by zero)`
        );
      }

      if (checkNumberOperands(operands)) {
        return operands.left % operands.right;
      }

      throw exception();

    case "==":
      
      return operands.left === operands.right;
    
    case "!=":

      return operands.left !== operands.right;
    
    case ">":
      if (checkNumberOperands(operands)) {
        return operands.left > operands.right;
      }

      throw exception();
    
    case "<":
      if (checkNumberOperands(operands)) {
        return operands.left < operands.right;
      }

      throw exception();
    
    case ">=":
      if (checkNumberOperands(operands)) {
        return operands.left >= operands.right;
      }

      throw exception();

    case "<=":
      if (checkNumberOperands(operands)) {
        return operands.left <= operands.right;
      }

      throw exception();

    case "&&":
      return operands.left && operands.right;

    case "||":
      return operands.left || operands.right;

    default:
      throw new InvalidStateException(`Unsupported operator: ${operator}`);
  }
}
