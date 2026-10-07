import { NodeType } from "../../src/constants/constants";
import bhaiLangModule from "../../src/module/bhaiLangModule";

const parse = (body: string) =>
  bhaiLangModule.getParser().parse(`namaskara\n${body}\nmatte sigona`);

// body of the init statement
const statements = (body: string) =>
  (parse(body).body as any).body as any[];

const expressionOf = (body: string) => statements(body)[0].expression;

describe("subtraction & unary operators", () => {
  test("a-1 is a subtraction, not a & -1", () => {
    expect(expressionOf("a-1;")).toEqual({
      type: NodeType.BinaryExpression,
      operator: "-",
      left: { type: NodeType.IdentifierExpression, name: "a" },
      right: { type: NodeType.NumericLiteral, value: 1 },
    });
  });

  test("signed number literals are folded", () => {
    expect(expressionOf("-5;")).toEqual({
      type: NodeType.NumericLiteral,
      value: -5,
    });
    expect(expressionOf("- -5;")).toEqual({
      type: NodeType.NumericLiteral,
      value: 5,
    });
  });

  test("unary minus on identifier", () => {
    expect(expressionOf("-a;")).toEqual({
      type: NodeType.UnaryExpression,
      operator: "-",
      argument: { type: NodeType.IdentifierExpression, name: "a" },
    });
  });

  test("! and alla are logical not", () => {
    const expected = {
      type: NodeType.UnaryExpression,
      operator: "!",
      argument: { type: NodeType.BooleanLiteral, value: "sari" },
    };
    expect(expressionOf("!sari;")).toEqual(expected);
    expect(expressionOf("alla sari;")).toEqual(expected);
  });

  test("unary binds tighter than multiplication", () => {
    expect(expressionOf("-a * 2;").operator).toBe("*");
  });

  test("mattu / athava are && / ||", () => {
    const expression = expressionOf("a mattu b athava c;");
    expect(expression.type).toBe(NodeType.LogicalExpression);
    expect(expression.operator).toBe("||");
    expect(expression.left.operator).toBe("&&");
  });
});

describe("literals", () => {
  test("string escapes", () => {
    expect(expressionOf(String.raw`"a\"b\n\tc\\";`).value).toBe('a"b\n\tc\\');
    expect(expressionOf(String.raw`'it\'s';`).value).toBe("it's");
  });

  test("unknown escapes are kept", () => {
    expect(expressionOf(String.raw`"C:\path";`).value).toBe("C:\\path");
  });

  test("kannada digits", () => {
    expect(expressionOf("೧೨.೫;").value).toBe(12.5);
  });

  test("array literal with trailing comma", () => {
    expect(expressionOf("[1, 'a', [],];")).toEqual({
      type: NodeType.ArrayLiteral,
      elements: [
        { type: NodeType.NumericLiteral, value: 1 },
        { type: NodeType.StringLiteral, value: "a" },
        { type: NodeType.ArrayLiteral, elements: [] },
      ],
    });
  });
});

describe("calls & indexing", () => {
  test("call with arguments", () => {
    expect(expressionOf("jodisu(1, b);")).toEqual({
      type: NodeType.CallExpression,
      callee: { type: NodeType.IdentifierExpression, name: "jodisu" },
      arguments: [
        { type: NodeType.NumericLiteral, value: 1 },
        { type: NodeType.IdentifierExpression, name: "b" },
      ],
    });
  });

  test("chained index and call", () => {
    const expression = expressionOf("a[0][1]();");
    expect(expression.type).toBe(NodeType.CallExpression);
    expect(expression.callee.type).toBe(NodeType.MemberExpression);
    expect(expression.callee.object.type).toBe(NodeType.MemberExpression);
  });

  test("index assignment", () => {
    const expression = expressionOf("a[i] += 2;");
    expect(expression.type).toBe(NodeType.AssignmentExpression);
    expect(expression.left.type).toBe(NodeType.MemberExpression);
  });

  test("call result is not assignable", () => {
    expect(() => parse("f() = 2;")).toThrow(SyntaxError);
  });
});

describe("functions", () => {
  test("function declaration with return", () => {
    const [declaration] = statements(`
      kelasa jodisu(a, b) {
        kodu a + b;
      }`);
    expect(declaration.type).toBe(NodeType.FunctionDeclaration);
    expect(declaration.id).toEqual({
      type: NodeType.IdentifierExpression,
      name: "jodisu",
    });
    expect(declaration.params.map((param: any) => param.name)).toEqual([
      "a",
      "b",
    ]);
    expect(declaration.body.body[0]).toEqual({
      type: NodeType.ReturnStatement,
      argument: {
        type: NodeType.BinaryExpression,
        operator: "+",
        left: { type: NodeType.IdentifierExpression, name: "a" },
        right: { type: NodeType.IdentifierExpression, name: "b" },
      },
    });
  });

  test("empty return", () => {
    const [declaration] = statements(`kelasa f() { kodu; }`);
    expect(declaration.params).toEqual([]);
    expect(declaration.body.body[0]).toEqual({
      type: NodeType.ReturnStatement,
      argument: null,
    });
  });

  test("duplicate params", () => {
    expect(() => parse(`kelasa f(a, a) {}`)).toThrow(SyntaxError);
  });

  test("function body must be a block", () => {
    expect(() => parse(`kelasa f() kodu 1;`)).toThrow(SyntaxError);
  });
});

describe("prathi loop", () => {
  test("full for loop", () => {
    const [loop] = statements(`prathi (idu i = 0; i < 3; i += 1) { helu i; }`);
    expect(loop.type).toBe(NodeType.ForStatement);
    expect(loop.init.type).toBe(NodeType.VariableStatement);
    expect(loop.test.operator).toBe("<");
    expect(loop.update.operator).toBe("+=");
    expect(loop.body.type).toBe(NodeType.BlockStatement);
  });

  test("all parts optional", () => {
    const [loop] = statements(`prathi (;;) { saaku nilsu; }`);
    expect(loop.init).toBeNull();
    expect(loop.test).toBeNull();
    expect(loop.update).toBeNull();
  });

  test("expression init", () => {
    const [loop] = statements(`prathi (i = 0; i < 3;) {}`);
    expect(loop.init.type).toBe(NodeType.AssignmentExpression);
  });
});

describe("kannada script keywords", () => {
  test("a program written in Kannada script", () => {
    const ast = bhaiLangModule.getParser().parse(`
      ನಮಸ್ಕಾರ
        ಇದು ಹೆಸರು = "ಕನ್ನಡ";
        ಏನಾದ್ರು (ಹೆಸರು == "ಕನ್ನಡ" ಮತ್ತು ಸರಿ) {
          ಹೇಳು ಹೆಸರು;
        } ಏನೂ ಇಲ್ಲ ಅಂದ್ರೆ {
          ಹೇಳು ಖಾಲಿ;
        }
      ಮತ್ತೆ ಸಿಗೋಣ
    `);
    const body = (ast.body as any).body;
    expect(body[0].declarations[0].id.name).toBe("ಹೆಸರು");
    expect(body[1].type).toBe(NodeType.IfStatement);
    expect(body[1].test.operator).toBe("&&");
    // canonical boolean value
    expect(body[1].test.right).toEqual({
      type: NodeType.BooleanLiteral,
      value: "sari",
    });
    expect(body[1].alternates).toHaveLength(1);
  });

  test("keywords are not matched inside longer names", () => {
    const [statement] = statements("idu idukki = heluva;");
    expect(statement.declarations[0].id.name).toBe("idukki");
    expect(statement.declarations[0].init.name).toBe("heluva");
  });

  test("multi word keywords allow extra whitespace", () => {
    expect(() =>
      bhaiLangModule.getParser().parse(`namaskara matte   sigona`)
    ).not.toThrow();
  });
});

describe("program boundaries", () => {
  test("text outside the program is never tokenized", () => {
    expect(() =>
      bhaiLangModule
        .getParser()
        .parse(`don't @ tokenize "this\nnamaskara\nmatte sigona\n'neither @ this`)
    ).not.toThrow();
  });

  test("missing namaskara", () => {
    expect(() => bhaiLangModule.getParser().parse(`helu 1;`)).toThrow(
      /namaskara/
    );
  });

  test("missing matte sigona", () => {
    expect(() => bhaiLangModule.getParser().parse(`namaskara helu 1;`)).toThrow(
      /matte sigona/
    );
  });
});

describe("error positions", () => {
  const errorOf = (code: string) => {
    try {
      bhaiLangModule.getParser().parse(code);
    } catch (error) {
      return error as SyntaxError & { line?: number; column?: number };
    }
    throw new Error("expected a syntax error");
  };

  test("unexpected token reports line & column", () => {
    const error = errorOf(`namaskara\n  idu a = 5 6;\nmatte sigona`);
    expect(error).toBeInstanceOf(SyntaxError);
    expect(error.line).toBe(2);
    expect(error.column).toBe(12);
    expect(error.message).toMatch(/Line 2:12/);
  });

  test("missing semicolon points at the end of the statement", () => {
    const error = errorOf(`namaskara\n  idu a = 5 // five\n\n  helu a;\nmatte sigona`);
    expect(error.line).toBe(2);
    expect(error.column).toBe(12);
    expect(error.message).toMatch(/Missing ";"/);
  });

  test("unexpected token other than semicolon", () => {
    const error = errorOf(`namaskara\n  enadru x {}\nmatte sigona`);
    expect(error.line).toBe(2);
    expect(error.column).toBe(10);
    expect(error.message).toMatch(/Expected "\(" but found "x"/);
  });

  test("unexpected character reports line & column", () => {
    const error = errorOf(`namaskara\n\n    helu @;\nmatte sigona`);
    expect(error.line).toBe(3);
    expect(error.column).toBe(10);
  });

  test("unterminated string", () => {
    const error = errorOf(`namaskara\n helu "abc;\nmatte sigona`);
    expect(error.message).toMatch(/Unterminated string/);
    expect(error.line).toBe(2);
  });

  test("missing expression", () => {
    const error = errorOf(`namaskara\n idu a = ;\nmatte sigona`);
    expect(error.message).toMatch(/expected an expression/i);
    expect(error.line).toBe(2);
  });
});
