import StringLiteral from "../../src/components/parser/statement/expression/literals/stringLiteral";
import UnsupportedTypeException from "../../src/exceptions/unsupportedTypeException";

jest.mock("../../src/module/kannadascriptModule");

test("test getLiteralImpl method with unsupported token", () => {
  expect(() => StringLiteral.getLiteralImpl("unsupported token type")).toThrow(
    UnsupportedTypeException
  );
});
