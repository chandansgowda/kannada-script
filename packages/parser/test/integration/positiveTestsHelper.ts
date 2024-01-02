export const StatementTests = [
  // init statement tests
  {
    name: "empty init statement test, should success",
    input: `
      namaskara
      matte sigona
    `,
    output: `{"type":"Program","body":{"type":"InitStatement","body":[]}}`,
  },
  {
    name: "init statement test with semi colon, should success",
    input: `
      namaskara;
      matte sigona;
    `,
    output: `{"type":"Program","body":{"type":"InitStatement","body":[]}}`,
  },
  {
    name: "init statement test with semi colon - 2, should success",
    input: `
      namaskara;
      matte sigona
    `,
    output: `{"type":"Program","body":{"type":"InitStatement","body":[]}}`,
  },
  {
    name: "empty init statement test with random charaters initially, should success",
    input: `
      some random characters
      random random random
      namaskara
      matte sigona;
    `,
    output: `{"type":"Program","body":{"type":"InitStatement","body":[]}}`,
  },
  // empty statement tests
  {
    name: "multiple empty statements test, should success",
    input: `
      namaskara
      ;
      ;
      ;;
      matte sigona
    `,
    output: `{\"type\":\"Program\",\"body\":{\"type\":\"InitStatement\",\"body\":[{\"type\":\"EmptyStatement\"},{\"type\":\"EmptyStatement\"},{\"type\":\"EmptyStatement\"}]}}`,
  },
  // block statement tests
  {
    name: "block statement test with empty block, should success",
    input: `
      namaskara
      {}
      matte sigona
    `,
    output: `{\"type\":\"Program\",\"body\":{\"type\":\"InitStatement\",\"body\":[{\"type\":\"BlockStatement\",\"body\":[]}]}}`,
  },
  {
    name: "block statement test with empty block and semi colon, should success",
    input: `
      namaskara;
      {};
      matte sigona
    `,
    output: `{\"type\":\"Program\",\"body\":{\"type\":\"InitStatement\",\"body\":[{\"type\":\"BlockStatement\",\"body\":[]}]}}`,
  },
  {
    name: "block statement test with assignment expression inside, should success",
    input: `
      namaskara;
      {
        naam = 4;
      }
      matte sigona;
    `,
    output: `{\"type\":\"Program\",\"body\":{\"type\":\"InitStatement\",\"body\":[{\"type\":\"BlockStatement\",\"body\":[{\"type\":\"ExpressionStatement\",\"expression\":{\"type\":\"AssignmentExpression\",\"operator\":\"=\",\"left\":{\"type\":\"IdentifierExpression\",\"name\":\"naam\"},\"right\":{\"type\":\"NumericLiteral\",\"value\":4}}}]}]}}`,
  },
  {
    name: "block statement test with variable statement inside, should success",
    input: `
      namaskara
      {
        idu a = 4;
      }
      matte sigona
    `,
    output: `{\"type\":\"Program\",\"body\":{\"type\":\"InitStatement\",\"body\":[{\"type\":\"BlockStatement\",\"body\":[{\"type\":\"VariableStatement\",\"declarations\":[{\"type\":\"VariableDeclaration\",\"id\":{\"type\":\"IdentifierExpression\",\"name\":\"a\"},\"init\":{\"type\":\"NumericLiteral\",\"value\":4}}]}]}]}}`,
  },
  // print statement test
  {
    name: "print statement test with string printing, should success",
    input: `
      namaskara
      helu "puff...";
      matte sigona
    `,
    output: `{\"type\":\"Program\",\"body\":{\"type\":\"InitStatement\",\"body\":[{\"type\":\"PrintStatement\",\"expressions\":[{\"type\":\"StringLiteral\",\"value\":\"puff...\"}]}]}}`,
  },
  {
    name: "print statement test with number printing, should success",
    input: `
      namaskara
      helu 478;
      matte sigona
    `,
    output: `{\"type\":\"Program\",\"body\":{\"type\":\"InitStatement\",\"body\":[{\"type\":\"PrintStatement\",\"expressions\":[{\"type\":\"NumericLiteral\",\"value\":478}]}]}}`,
  },
  {
    name: "print statement test with boolean printing, should success",
    input: `
      namaskara
      helu sari, thappu;
      matte sigona
    `,
    output: `{\"type\":\"Program\",\"body\":{\"type\":\"InitStatement\",\"body\":[{\"type\":\"PrintStatement\",\"expressions\":[{\"type\":\"BooleanLiteral\",\"value\":\"sari\"},{\"type\":\"BooleanLiteral\",\"value\":\"thappu\"}]}]}}`,
  },
  {
    name: "print statement test with identifier printing, should success",
    input: `
      namaskara
      helu a, b, c;
      matte sigona
    `,
    output: `{\"type\":\"Program\",\"body\":{\"type\":\"InitStatement\",\"body\":[{\"type\":\"PrintStatement\",\"expressions\":[{\"type\":\"IdentifierExpression\",\"name\":\"a\"},{\"type\":\"IdentifierExpression\",\"name\":\"b\"},{\"type\":\"IdentifierExpression\",\"name\":\"c\"}]}]}}`,
  },
  {
    name: "print statement test with khali printing, should success",
    input: `
      namaskara
      helu khali;
      matte sigona
    `,
    output: `{"type":"Program","body":{"type":"InitStatement","body":[{"type":"PrintStatement","expressions":[{"type":"NullLiteral","value":"khali"}]}]}}`,
  },
  {
    name: "print statement test with variable khali printing, should success",
    input: `
      namaskara
      idu a = khali;
      helu a;
      matte sigona
    `,
    output: `{"type":"Program","body":{"type":"InitStatement","body":[{"type":"VariableStatement","declarations":[{"type":"VariableDeclaration","id":{"type":"IdentifierExpression","name":"a"},"init":{"type":"NullLiteral","value":"khali"}}]},{"type":"PrintStatement","expressions":[{"type":"IdentifierExpression","name":"a"}]}]}}`,
  },
  {
    name: "print statement test with logical AND, should success",
    input: `
      namaskara
      helu a && b;
      matte sigona
    `,
    output: `{"type":"Program","body":{"type":"InitStatement","body":[{"type":"PrintStatement","expressions":[{"type":"LogicalExpression","operator":"&&","left":{"type":"IdentifierExpression","name":"a"},"right":{"type":"IdentifierExpression","name":"b"}}]}]}}`,
  },
  {
    name: "print statement test with assignment, should success",
    input: `
      namaskara
      helu a = 9;
      matte sigona
    `,
    output: `{"type":"Program","body":{"type":"InitStatement","body":[{"type":"PrintStatement","expressions":[{"type":"AssignmentExpression","operator":"=","left":{"type":"IdentifierExpression","name":"a"},"right":{"type":"NumericLiteral","value":9}}]}]}}`,
  },
  {
    name: "print statement test with logical OR, should success",
    input: `
      namaskara
      helu 9 || 90;
      matte sigona
    `,
    output: `{"type":"Program","body":{"type":"InitStatement","body":[{"type":"PrintStatement","expressions":[{"type":"LogicalExpression","operator":"||","left":{"type":"NumericLiteral","value":9},"right":{"type":"NumericLiteral","value":90}}]}]}}`,
  },
  {
    name: "print statement test with equality operator, should success",
    input: `
      namaskara
      helu 9 == 90;
      matte sigona
    `,
    output: `{"type":"Program","body":{"type":"InitStatement","body":[{"type":"PrintStatement","expressions":[{"type":"BinaryExpression","operator":"==","left":{"type":"NumericLiteral","value":9},"right":{"type":"NumericLiteral","value":90}}]}]}}`,
  },
  // variable statement test
  {
    name: "variable statement test with basic variable declaration, should success",
    input: `
      namaskara
      idu a, b, c;
      matte sigona
    `,
    output: `{\"type\":\"Program\",\"body\":{\"type\":\"InitStatement\",\"body\":[{\"type\":\"VariableStatement\",\"declarations\":[{\"type\":\"VariableDeclaration\",\"id\":{\"type\":\"IdentifierExpression\",\"name\":\"a\"},\"init\":{\"type\":\"NullLiteral\",\"value\":\"khali\"}},{\"type\":\"VariableDeclaration\",\"id\":{\"type\":\"IdentifierExpression\",\"name\":\"b\"},\"init\":{\"type\":\"NullLiteral\",\"value\":\"khali\"}},{\"type\":\"VariableDeclaration\",\"id\":{\"type\":\"IdentifierExpression\",\"name\":\"c\"},\"init\":{\"type\":\"NullLiteral\",\"value\":\"khali\"}}]}]}}`,
  },
  {
    name: "variable statement test with basic variable declaration and initialisation, should success",
    input: `
      namaskara
      idu a = 10, b;
      matte sigona
    `,
    output: `{\"type\":\"Program\",\"body\":{\"type\":\"InitStatement\",\"body\":[{\"type\":\"VariableStatement\",\"declarations\":[{\"type\":\"VariableDeclaration\",\"id\":{\"type\":\"IdentifierExpression\",\"name\":\"a\"},\"init\":{\"type\":\"NumericLiteral\",\"value\":10}},{\"type\":\"VariableDeclaration\",\"id\":{\"type\":\"IdentifierExpression\",\"name\":\"b\"},\"init\":{\"type\":\"NullLiteral\",\"value\":\"khali\"}}]}]}}`,
  },
  {
    name: "variable statement test with multiple variable initialisation, should success",
    input: `
      namaskara
      idu a = 10, b = 5;
      matte sigona
    `,
    output: `{\"type\":\"Program\",\"body\":{\"type\":\"InitStatement\",\"body\":[{\"type\":\"VariableStatement\",\"declarations\":[{\"type\":\"VariableDeclaration\",\"id\":{\"type\":\"IdentifierExpression\",\"name\":\"a\"},\"init\":{\"type\":\"NumericLiteral\",\"value\":10}},{\"type\":\"VariableDeclaration\",\"id\":{\"type\":\"IdentifierExpression\",\"name\":\"b\"},\"init\":{\"type\":\"NumericLiteral\",\"value\":5}}]}]}}`,
  },
  {
    name: "variable statement test with multiple variable initialisation with same value, should success",
    input: `
      namaskara
      idu a = b = 5;
      matte sigona
    `,
    output: `{\"type\":\"Program\",\"body\":{\"type\":\"InitStatement\",\"body\":[{\"type\":\"VariableStatement\",\"declarations\":[{\"type\":\"VariableDeclaration\",\"id\":{\"type\":\"IdentifierExpression\",\"name\":\"a\"},\"init\":{\"type\":\"AssignmentExpression\",\"operator\":\"=\",\"left\":{\"type\":\"IdentifierExpression\",\"name\":\"b\"},\"right\":{\"type\":\"NumericLiteral\",\"value\":5}}}]}]}}`,
  },
  {
    name: "variable statement test with variable initialisation with some expression, should success",
    input: `
      namaskara
      idu a = 7 + 90;
      matte sigona
    `,
    output: `{\"type\":\"Program\",\"body\":{\"type\":\"InitStatement\",\"body\":[{\"type\":\"VariableStatement\",\"declarations\":[{\"type\":\"VariableDeclaration\",\"id\":{\"type\":\"IdentifierExpression\",\"name\":\"a\"},\"init\":{\"type\":\"BinaryExpression\",\"operator\":\"+\",\"left\":{\"type\":\"NumericLiteral\",\"value\":7},\"right\":{\"type\":\"NumericLiteral\",\"value\":90}}}]}]}}`,
  },
  {
    name: "variable statement test with variable initialisation with khali literal, should success",
    input: `
      namaskara
      idu a = khali;
      matte sigona
    `,
    output: `{"type":"Program","body":{"type":"InitStatement","body":[{"type":"VariableStatement","declarations":[{"type":"VariableDeclaration","id":{"type":"IdentifierExpression","name":"a"},"init":{"type":"NullLiteral","value":"khali"}}]}]}}`,
  },
  {
    name: "variable statement test with variable initialisation with khali literal, should success",
    input: `
      namaskara
      idu a = khali;
      matte sigona
    `,
    output: `{"type":"Program","body":{"type":"InitStatement","body":[{"type":"VariableStatement","declarations":[{"type":"VariableDeclaration","id":{"type":"IdentifierExpression","name":"a"},"init":{"type":"NullLiteral","value":"khali"}}]}]}}`,
  },
];

export const ExpressionsTests = [
  // assignment expression tests
  {
    name: "simple assignment expression test with only one identifer, should success",
    input: `
      namaskara
      a = 4;
      matte sigona
    `,
    output: `{\"type\":\"Program\",\"body\":{\"type\":\"InitStatement\",\"body\":[{\"type\":\"ExpressionStatement\",\"expression\":{\"type\":\"AssignmentExpression\",\"operator\":\"=\",\"left\":{\"type\":\"IdentifierExpression\",\"name\":\"a\"},\"right\":{\"type\":\"NumericLiteral\",\"value\":4}}}]}}`,
  },
  {
    name: "complex assignment expression test with only one identifer, should success",
    input: `
      namaskara
      a *= 4;
      matte sigona
    `,
    output: `{\"type\":\"Program\",\"body\":{\"type\":\"InitStatement\",\"body\":[{\"type\":\"ExpressionStatement\",\"expression\":{\"type\":\"AssignmentExpression\",\"operator\":\"*=\",\"left\":{\"type\":\"IdentifierExpression\",\"name\":\"a\"},\"right\":{\"type\":\"NumericLiteral\",\"value\":4}}}]}}`,
  },
  {
    name: "float number assignment expression test, should success",
    input: `
      namaskara
      a = 1.2;
      matte sigona
    `,
    output: `{\"type\":\"Program\",\"body\":{\"type\":\"InitStatement\",\"body\":[{\"type\":\"ExpressionStatement\",\"expression\":{\"type\":\"AssignmentExpression\",\"operator\":\"=\",\"left\":{\"type\":\"IdentifierExpression\",\"name\":\"a\"},\"right\":{\"type\":\"NumericLiteral\",\"value\":1.2}}}]}}`,
  },
  {
    name: "float number assignment expression test with negative number, should success",
    input: `
      namaskara
      a = -1.2;
      matte sigona
    `,
    output: `{\"type\":\"Program\",\"body\":{\"type\":\"InitStatement\",\"body\":[{\"type\":\"ExpressionStatement\",\"expression\":{\"type\":\"AssignmentExpression\",\"operator\":\"=\",\"left\":{\"type\":\"IdentifierExpression\",\"name\":\"a\"},\"right\":{\"type\":\"NumericLiteral\",\"value\":-1.2}}}]}}`,
  },
  {
    name: "float number assignment expression test without digits before decimal point, should success",
    input: `
      namaskara
      a = .6;
      matte sigona
    `,
    output: `{\"type\":\"Program\",\"body\":{\"type\":\"InitStatement\",\"body\":[{\"type\":\"ExpressionStatement\",\"expression\":{\"type\":\"AssignmentExpression\",\"operator\":\"=\",\"left\":{\"type\":\"IdentifierExpression\",\"name\":\"a\"},\"right\":{\"type\":\"NumericLiteral\",\"value\":0.6}}}]}}`,
  },
  {
    name: "float number assignment expression test with negative number and without digits before decimal point, should success",
    input: `
      namaskara
      a = -.6;
      matte sigona
    `,
    output: `{\"type\":\"Program\",\"body\":{\"type\":\"InitStatement\",\"body\":[{\"type\":\"ExpressionStatement\",\"expression\":{\"type\":\"AssignmentExpression\",\"operator\":\"=\",\"left\":{\"type\":\"IdentifierExpression\",\"name\":\"a\"},\"right\":{\"type\":\"NumericLiteral\",\"value\":-0.6}}}]}}`,
  },
  // paranthesized expression tests
  {
    name: "paranthesized expression test with one parenthesis and simple expression, should success",
    input: `
      namaskara
      (a + 4);
      matte sigona
    `,
    output: `{\"type\":\"Program\",\"body\":{\"type\":\"InitStatement\",\"body\":[{\"type\":\"ExpressionStatement\",\"expression\":{\"type\":\"BinaryExpression\",\"operator\":\"+\",\"left\":{\"type\":\"IdentifierExpression\",\"name\":\"a\"},\"right\":{\"type\":\"NumericLiteral\",\"value\":4}}}]}}`,
  },
  {
    name: "paranthesized expression test with one parenthesis and complex expression, should success",
    input: `
      namaskara
      (a + 4) * 10 + (5 - 4);
      matte sigona
    `,
    output: `{\"type\":\"Program\",\"body\":{\"type\":\"InitStatement\",\"body\":[{\"type\":\"ExpressionStatement\",\"expression\":{\"type\":\"BinaryExpression\",\"operator\":\"+\",\"left\":{\"type\":\"BinaryExpression\",\"operator\":\"*\",\"left\":{\"type\":\"BinaryExpression\",\"operator\":\"+\",\"left\":{\"type\":\"IdentifierExpression\",\"name\":\"a\"},\"right\":{\"type\":\"NumericLiteral\",\"value\":4}},\"right\":{\"type\":\"NumericLiteral\",\"value\":10}},\"right\":{\"type\":\"BinaryExpression\",\"operator\":\"-\",\"left\":{\"type\":\"NumericLiteral\",\"value\":5},\"right\":{\"type\":\"NumericLiteral\",\"value\":4}}}}]}}`,
  },
  {
    name: "paranthesized expression test with multiple parenthesis, should success",
    input: `
      namaskara
      (a * (4 + 8) + 10);
      matte sigona
    `,
    output: `{\"type\":\"Program\",\"body\":{\"type\":\"InitStatement\",\"body\":[{\"type\":\"ExpressionStatement\",\"expression\":{\"type\":\"BinaryExpression\",\"operator\":\"+\",\"left\":{\"type\":\"BinaryExpression\",\"operator\":\"*\",\"left\":{\"type\":\"IdentifierExpression\",\"name\":\"a\"},\"right\":{\"type\":\"BinaryExpression\",\"operator\":\"+\",\"left\":{\"type\":\"NumericLiteral\",\"value\":4},\"right\":{\"type\":\"NumericLiteral\",\"value\":8}}},\"right\":{\"type\":\"NumericLiteral\",\"value\":10}}}]}}`,
  },
  {
    name: "paranthesized expression test with assignment expression, should success",
    input: `
    namaskara
    (x = 9);
    matte sigona;
    `,
    output: `{"type":"Program","body":{"type":"InitStatement","body":[{"type":"ExpressionStatement","expression":{"type":"AssignmentExpression","operator":"=","left":{"type":"IdentifierExpression","name":"x"},"right":{"type":"NumericLiteral","value":9}}}]}}`,
  },
  {
    name: "paranthesized expression test with assignment expression, should success",
    input: `
    namaskara
    (x >= 9);
    matte sigona;
    `,
    output: `{"type":"Program","body":{"type":"InitStatement","body":[{"type":"ExpressionStatement","expression":{"type":"BinaryExpression","operator":">=","left":{"type":"IdentifierExpression","name":"x"},"right":{"type":"NumericLiteral","value":9}}}]}}`,
  },
  // khali and boolean expression test
  {
    name: "complex expression test with one khali operand, should success",
    input: `
        namaskara
        (khali * (4 + 8 + 10));
        matte sigona
      `,
    output: `{"type":"Program","body":{"type":"InitStatement","body":[{"type":"ExpressionStatement","expression":{"type":"BinaryExpression","operator":"*","left":{"type":"NullLiteral","value":"khali"},"right":{"type":"BinaryExpression","operator":"+","left":{"type":"BinaryExpression","operator":"+","left":{"type":"NumericLiteral","value":4},"right":{"type":"NumericLiteral","value":8}},"right":{"type":"NumericLiteral","value":10}}}}]}}`,
  },
  {
    name: "complex expression test with one khali operand and one boolean operand, should success",
    input: `
        namaskara
        (khali * (sari + 8 + 10));
        matte sigona
      `,
    output: `{"type":"Program","body":{"type":"InitStatement","body":[{"type":"ExpressionStatement","expression":{"type":"BinaryExpression","operator":"*","left":{"type":"NullLiteral","value":"khali"},"right":{"type":"BinaryExpression","operator":"+","left":{"type":"BinaryExpression","operator":"+","left":{"type":"BooleanLiteral","value":"sari"},"right":{"type":"NumericLiteral","value":8}},"right":{"type":"NumericLiteral","value":10}}}}]}}`,
  },
  {
    name: "complex expression test with one khali operand and one boolean operand - 2, should success",
    input: `
        namaskara
        (sari * (khali + 8 + 10));
        matte sigona
      `,
    output: `{"type":"Program","body":{"type":"InitStatement","body":[{"type":"ExpressionStatement","expression":{"type":"BinaryExpression","operator":"*","left":{"type":"BooleanLiteral","value":"sari"},"right":{"type":"BinaryExpression","operator":"+","left":{"type":"BinaryExpression","operator":"+","left":{"type":"NullLiteral","value":"khali"},"right":{"type":"NumericLiteral","value":8}},"right":{"type":"NumericLiteral","value":10}}}}]}}`,
  },
  {
    name: "complex expression test with one khali operand and one boolean operand - 3, should success",
    input: `
        namaskara
        (khali + sari);
        matte sigona
      `,
    output: `{"type":"Program","body":{"type":"InitStatement","body":[{"type":"ExpressionStatement","expression":{"type":"BinaryExpression","operator":"+","left":{"type":"NullLiteral","value":"khali"},"right":{"type":"BooleanLiteral","value":"sari"}}}]}}`,
  },
  {
    name: "complex expression test with one boolean operand, should success",
    input: `
        namaskara
        (sari * (4 + 8 + 10));
        matte sigona
      `,
    output: `{"type":"Program","body":{"type":"InitStatement","body":[{"type":"ExpressionStatement","expression":{"type":"BinaryExpression","operator":"*","left":{"type":"BooleanLiteral","value":"sari"},"right":{"type":"BinaryExpression","operator":"+","left":{"type":"BinaryExpression","operator":"+","left":{"type":"NumericLiteral","value":4},"right":{"type":"NumericLiteral","value":8}},"right":{"type":"NumericLiteral","value":10}}}}]}}`,
  },
  {
    name: "expression test with only boolean operand, should success",
    input: `
        namaskara
        sari + thappu;
        matte sigona
      `,
    output: `{"type":"Program","body":{"type":"InitStatement","body":[{"type":"ExpressionStatement","expression":{"type":"BinaryExpression","operator":"+","left":{"type":"BooleanLiteral","value":"sari"},"right":{"type":"BooleanLiteral","value":"thappu"}}}]}}`,
  },
  {
    name: "multiplicative expression test with only boolean operand, should success",
    input: `
        namaskara
        sari * thappu;
        matte sigona
      `,
    output: `{"type":"Program","body":{"type":"InitStatement","body":[{"type":"ExpressionStatement","expression":{"type":"BinaryExpression","operator":"*","left":{"type":"BooleanLiteral","value":"sari"},"right":{"type":"BooleanLiteral","value":"thappu"}}}]}}`,
  },
  {
    name: "division expression test with only boolean operand, should success",
    input: `
        namaskara
        sari / thappu;
        matte sigona
      `,
    output: `{"type":"Program","body":{"type":"InitStatement","body":[{"type":"ExpressionStatement","expression":{"type":"BinaryExpression","operator":"/","left":{"type":"BooleanLiteral","value":"sari"},"right":{"type":"BooleanLiteral","value":"thappu"}}}]}}`,
  },
  {
    name: "print statement test with expression containing khali, should success",
    input: `
        namaskara
        helu khali + 5;
        matte sigona;
      `,
    output: `{"type":"Program","body":{"type":"InitStatement","body":[{"type":"PrintStatement","expressions":[{"type":"BinaryExpression","operator":"+","left":{"type":"NullLiteral","value":"khali"},"right":{"type":"NumericLiteral","value":5}}]}]}}`,
  },
  // logical expression test
  {
    name: `logical "&&" test with sari thappu, should success`,
    input: `
        namaskara
        enadru (sari && thappu);
        matte sigona;
      `,
    output: `{"type":"Program","body":{"type":"InitStatement","body":[{"type":"IfStatement","test":{"type":"LogicalExpression","operator":"&&","left":{"type":"BooleanLiteral","value":"sari"},"right":{"type":"BooleanLiteral","value":"thappu"}},"consequent":{"type":"EmptyStatement"},"alternates":[]}]}}`,
  },
  {
    name: `logical "&&" test with expression, should success`,
    input: `
        namaskara
        enadru (a + b && d);
        matte sigona;
      `,
    output: `{"type":"Program","body":{"type":"InitStatement","body":[{"type":"IfStatement","test":{"type":"LogicalExpression","operator":"&&","left":{"type":"BinaryExpression","operator":"+","left":{"type":"IdentifierExpression","name":"a"},"right":{"type":"IdentifierExpression","name":"b"}},"right":{"type":"IdentifierExpression","name":"d"}},"consequent":{"type":"EmptyStatement"},"alternates":[]}]}}`,
  },
  {
    name: `logical "&&" test in variable declaration, should success`,
    input: `
        namaskara
        idu a = b && d;
        matte sigona;
      `,
    output: `{"type":"Program","body":{"type":"InitStatement","body":[{"type":"VariableStatement","declarations":[{"type":"VariableDeclaration","id":{"type":"IdentifierExpression","name":"a"},"init":{"type":"LogicalExpression","operator":"&&","left":{"type":"IdentifierExpression","name":"b"},"right":{"type":"IdentifierExpression","name":"d"}}}]}]}}`,
  },
  // logical OR
  {
    name: `logical "||" test with sari thappu, should success`,
    input: `
        namaskara
        enadru (sari || thappu);
        matte sigona;
      `,
    output: `{"type":"Program","body":{"type":"InitStatement","body":[{"type":"IfStatement","test":{"type":"LogicalExpression","operator":"||","left":{"type":"BooleanLiteral","value":"sari"},"right":{"type":"BooleanLiteral","value":"thappu"}},"consequent":{"type":"EmptyStatement"},"alternates":[]}]}}`,
  },
  {
    name: `logical "||" test with expression, should success`,
    input: `
        namaskara
        enadru (a + b || d);
        matte sigona;
      `,
    output: `{"type":"Program","body":{"type":"InitStatement","body":[{"type":"IfStatement","test":{"type":"LogicalExpression","operator":"||","left":{"type":"BinaryExpression","operator":"+","left":{"type":"IdentifierExpression","name":"a"},"right":{"type":"IdentifierExpression","name":"b"}},"right":{"type":"IdentifierExpression","name":"d"}},"consequent":{"type":"EmptyStatement"},"alternates":[]}]}}`,
  },
  {
    name: `logical "||" test in variable declaration, should success`,
    input: `
        namaskara
        idu a = b || d;
        matte sigona;
      `,
    output: `{"type":"Program","body":{"type":"InitStatement","body":[{"type":"VariableStatement","declarations":[{"type":"VariableDeclaration","id":{"type":"IdentifierExpression","name":"a"},"init":{"type":"LogicalExpression","operator":"||","left":{"type":"IdentifierExpression","name":"b"},"right":{"type":"IdentifierExpression","name":"d"}}}]}]}}`,
  },
  {
    name: `identifier name starting with "sari", should success`,
    input: `
      namaskara
      idu sariValue = sari;
      matte sigona
    `,
    output: `{"type":"Program","body":{"type":"InitStatement","body":[{"type":"VariableStatement","declarations":[{"type":"VariableDeclaration","id":{"type":"IdentifierExpression","name":"sariValue"},"init":{"type":"BooleanLiteral","value":"sari"}}]}]}}`,
  },
  {
    name: `identifier name starting with "thappu", should success`,
    input: `
      namaskara
      idu thappuValue = 10;
      matte sigona
    `,
    output: `{"type":"Program","body":{"type":"InitStatement","body":[{"type":"VariableStatement","declarations":[{"type":"VariableDeclaration","id":{"type":"IdentifierExpression","name":"thappuValue"},"init":{"type":"NumericLiteral","value":10}}]}]}}`,
  },
];

export const IfStatementTests = [
  {
    name: "if statement success test - 1: only if",
    input: `
    namaskara
    enadru (sari) {
    }
    matte sigona;
      `,
    output: `{"type":"Program","body":{"type":"InitStatement","body":[{"type":"IfStatement","test":{"type":"BooleanLiteral","value":"sari"},"consequent":{"type":"BlockStatement","body":[]},"alternates":[]}]}}`,
  },
  {
    name: "if statement success test - 2: if else both",
    input: `
    namaskara
    enadru (sari) {
    } enu illa andre {

    }
    matte sigona;
      `,
    output: `{"type":"Program","body":{"type":"InitStatement","body":[{"type":"IfStatement","test":{"type":"BooleanLiteral","value":"sari"},"consequent":{"type":"BlockStatement","body":[]},"alternates":[{"type":"BlockStatement","body":[]}]}]}}`,
  },
  {
    name: "if statement success test - 3: if only with comarison condn",
    input: `
    namaskara
    idu x = 9;
    enadru (x >= 9) {
      x = 5;
    }
    matte sigona;
      `,
    output: `{"type":"Program","body":{"type":"InitStatement","body":[{"type":"VariableStatement","declarations":[{"type":"VariableDeclaration","id":{"type":"IdentifierExpression","name":"x"},"init":{"type":"NumericLiteral","value":9}}]},{"type":"IfStatement","test":{"type":"BinaryExpression","operator":">=","left":{"type":"IdentifierExpression","name":"x"},"right":{"type":"NumericLiteral","value":9}},"consequent":{"type":"BlockStatement","body":[{"type":"ExpressionStatement","expression":{"type":"AssignmentExpression","operator":"=","left":{"type":"IdentifierExpression","name":"x"},"right":{"type":"NumericLiteral","value":5}}}]},"alternates":[]}]}}`,
  },
  {
    name: "if statement success test - 4: if only with equality condn",
    input: `
    namaskara
    idu x = 9;
    enadru (x == 9) {
      x = 5;
    }
    matte sigona;
      `,
    output: `{"type":"Program","body":{"type":"InitStatement","body":[{"type":"VariableStatement","declarations":[{"type":"VariableDeclaration","id":{"type":"IdentifierExpression","name":"x"},"init":{"type":"NumericLiteral","value":9}}]},{"type":"IfStatement","test":{"type":"BinaryExpression","operator":"==","left":{"type":"IdentifierExpression","name":"x"},"right":{"type":"NumericLiteral","value":9}},"consequent":{"type":"BlockStatement","body":[{"type":"ExpressionStatement","expression":{"type":"AssignmentExpression","operator":"=","left":{"type":"IdentifierExpression","name":"x"},"right":{"type":"NumericLiteral","value":5}}}]},"alternates":[]}]}}`,
  },
  {
    name: "if statement success test - 4: if only with equality condn",
    input: `
    namaskara
    idu x = 9;
    enadru (x == 9) {
      x = 5;
    }
    matte sigona;
      `,
    output: `{"type":"Program","body":{"type":"InitStatement","body":[{"type":"VariableStatement","declarations":[{"type":"VariableDeclaration","id":{"type":"IdentifierExpression","name":"x"},"init":{"type":"NumericLiteral","value":9}}]},{"type":"IfStatement","test":{"type":"BinaryExpression","operator":"==","left":{"type":"IdentifierExpression","name":"x"},"right":{"type":"NumericLiteral","value":9}},"consequent":{"type":"BlockStatement","body":[{"type":"ExpressionStatement","expression":{"type":"AssignmentExpression","operator":"=","left":{"type":"IdentifierExpression","name":"x"},"right":{"type":"NumericLiteral","value":5}}}]},"alternates":[]}]}}`,
  },
  {
    name: "if statement success test - 5: if only with inequality condn",
    input: `
    namaskara
    idu x = 9;
    enadru (x != 9) {
      x = 5;
    }
    matte sigona;
      `,
    output: `{"type":"Program","body":{"type":"InitStatement","body":[{"type":"VariableStatement","declarations":[{"type":"VariableDeclaration","id":{"type":"IdentifierExpression","name":"x"},"init":{"type":"NumericLiteral","value":9}}]},{"type":"IfStatement","test":{"type":"BinaryExpression","operator":"!=","left":{"type":"IdentifierExpression","name":"x"},"right":{"type":"NumericLiteral","value":9}},"consequent":{"type":"BlockStatement","body":[{"type":"ExpressionStatement","expression":{"type":"AssignmentExpression","operator":"=","left":{"type":"IdentifierExpression","name":"x"},"right":{"type":"NumericLiteral","value":5}}}]},"alternates":[]}]}}`,
  },
  {
    name: "if statement success test - 6: else with only expression statement",
    input: `
    namaskara
    idu x = 9;
    enadru (x != 9) {
      x = 5;
    } enu illa andre (x >= 9);
    matte sigona;
      `,
    output: `{"type":"Program","body":{"type":"InitStatement","body":[{"type":"VariableStatement","declarations":[{"type":"VariableDeclaration","id":{"type":"IdentifierExpression","name":"x"},"init":{"type":"NumericLiteral","value":9}}]},{"type":"IfStatement","test":{"type":"BinaryExpression","operator":"!=","left":{"type":"IdentifierExpression","name":"x"},"right":{"type":"NumericLiteral","value":9}},"consequent":{"type":"BlockStatement","body":[{"type":"ExpressionStatement","expression":{"type":"AssignmentExpression","operator":"=","left":{"type":"IdentifierExpression","name":"x"},"right":{"type":"NumericLiteral","value":5}}}]},"alternates":[{"type":"ExpressionStatement","expression":{"type":"BinaryExpression","operator":">=","left":{"type":"IdentifierExpression","name":"x"},"right":{"type":"NumericLiteral","value":9}}}]}]}}`,
  },
  {
    name: "if statement success test - 7: with block",
    input: `
    namaskara
    idu x = 9;
    enadru (x != 9)
      x = 5;
    enu illa andre (x >= 9);
    matte sigona;
      `,
    output: `{"type":"Program","body":{"type":"InitStatement","body":[{"type":"VariableStatement","declarations":[{"type":"VariableDeclaration","id":{"type":"IdentifierExpression","name":"x"},"init":{"type":"NumericLiteral","value":9}}]},{"type":"IfStatement","test":{"type":"BinaryExpression","operator":"!=","left":{"type":"IdentifierExpression","name":"x"},"right":{"type":"NumericLiteral","value":9}},"consequent":{"type":"ExpressionStatement","expression":{"type":"AssignmentExpression","operator":"=","left":{"type":"IdentifierExpression","name":"x"},"right":{"type":"NumericLiteral","value":5}}},"alternates":[{"type":"ExpressionStatement","expression":{"type":"BinaryExpression","operator":">=","left":{"type":"IdentifierExpression","name":"x"},"right":{"type":"NumericLiteral","value":9}}}]}]}}`,
  },
  {
    name: "else-if statement success test - 1: if-else-if one level ladder",
    input: `
    namaskara
    enadru (sari) {
    } illa andre (sari) {
    }
    matte sigona;
      `,
    output: `{"type":"Program","body":{"type":"InitStatement","body":[{"type":"IfStatement","test":{"type":"BooleanLiteral","value":"sari"},"consequent":{"type":"BlockStatement","body":[]},"alternates":[{"type":"IfStatement","test":{"type":"BooleanLiteral","value":"sari"},"consequent":{"type":"BlockStatement","body":[]}}]}]}}`
  },
  {
    name: "else-if statement success test - 2: if-else-if one level ladder with else",
    input: `
    namaskara
    enadru (sari) {
    } illa andre (sari) {
    } enu illa andre {
    }
    matte sigona;
      `,
    output: `{"type":"Program","body":{"type":"InitStatement","body":[{"type":"IfStatement","test":{"type":"BooleanLiteral","value":"sari"},"consequent":{"type":"BlockStatement","body":[]},"alternates":[{"type":"IfStatement","test":{"type":"BooleanLiteral","value":"sari"},"consequent":{"type":"BlockStatement","body":[]}},{"type":"BlockStatement","body":[]}]}]}}`
  },
  {
    name: "else-if statement success test - 3: if-else-if multiple levels ladder",
    input: `
    namaskara
    enadru (sari) {
    } illa andre (sari) {
    } illa andre (sari) {
    } illa andre (sari) {
    } illa andre (sari) {
    }
    matte sigona;
      `,
    output: `{"type":"Program","body":{"type":"InitStatement","body":[{"type":"IfStatement","test":{"type":"BooleanLiteral","value":"sari"},"consequent":{"type":"BlockStatement","body":[]},"alternates":[{"type":"IfStatement","test":{"type":"BooleanLiteral","value":"sari"},"consequent":{"type":"BlockStatement","body":[]}},{"type":"IfStatement","test":{"type":"BooleanLiteral","value":"sari"},"consequent":{"type":"BlockStatement","body":[]}},{"type":"IfStatement","test":{"type":"BooleanLiteral","value":"sari"},"consequent":{"type":"BlockStatement","body":[]}},{"type":"IfStatement","test":{"type":"BooleanLiteral","value":"sari"},"consequent":{"type":"BlockStatement","body":[]}}]}]}}`
  },
  {
    name: "else-if statement success test - 4: if-else-if multiple levels ladder with else",
    input: `
    namaskara
    enadru (sari) {
    } illa andre (sari) {
    } illa andre (sari) {
    } illa andre (sari) {
    } illa andre (sari) {
    } enu illa andre {
    }
    matte sigona;
      `,
    output: `{"type":"Program","body":{"type":"InitStatement","body":[{"type":"IfStatement","test":{"type":"BooleanLiteral","value":"sari"},"consequent":{"type":"BlockStatement","body":[]},"alternates":[{"type":"IfStatement","test":{"type":"BooleanLiteral","value":"sari"},"consequent":{"type":"BlockStatement","body":[]}},{"type":"IfStatement","test":{"type":"BooleanLiteral","value":"sari"},"consequent":{"type":"BlockStatement","body":[]}},{"type":"IfStatement","test":{"type":"BooleanLiteral","value":"sari"},"consequent":{"type":"BlockStatement","body":[]}},{"type":"IfStatement","test":{"type":"BooleanLiteral","value":"sari"},"consequent":{"type":"BlockStatement","body":[]}},{"type":"BlockStatement","body":[]}]}]}}`
  },
];

export const WhileStatementTests = [
  {
    name: "while statement success test: only if",
    input: `
    namaskara
    ellivargu (sari) {
    }
    matte sigona;
      `,
    output: `{"type":"Program","body":{"type":"InitStatement","body":[{"type":"WhileStatement","test":{"type":"BooleanLiteral","value":"sari"},"body":{"type":"BlockStatement","body":[]}}]}}`,
  },
  {
    name: "while statement success test: with some body",
    input: `
    namaskara
    ellivargu (x > 9) {
      helu "hello";
    }
    matte sigona;
      `,
    output: `{"type":"Program","body":{"type":"InitStatement","body":[{"type":"WhileStatement","test":{"type":"BinaryExpression","operator":">","left":{"type":"IdentifierExpression","name":"x"},"right":{"type":"NumericLiteral","value":9}},"body":{"type":"BlockStatement","body":[{"type":"PrintStatement","expressions":[{"type":"StringLiteral","value":"hello"}]}]}}]}}`,
  },
  {
    name: "while statement success test: with single statement",
    input: `
    namaskara
    ellivargu (x > 9)
      helu "hello";
    matte sigona;
      `,
    output: `{"type":"Program","body":{"type":"InitStatement","body":[{"type":"WhileStatement","test":{"type":"BinaryExpression","operator":">","left":{"type":"IdentifierExpression","name":"x"},"right":{"type":"NumericLiteral","value":9}},"body":{"type":"PrintStatement","expressions":[{"type":"StringLiteral","value":"hello"}]}}]}}`,
  },
  {
    name: "while statement success test: with single statement as body and statement outside of body",
    input: `
    namaskara
    ellivargu (x > 9)
      helu "hello";
    idu a = 90;
    matte sigona;
      `,
    output: `{"type":"Program","body":{"type":"InitStatement","body":[{"type":"WhileStatement","test":{"type":"BinaryExpression","operator":">","left":{"type":"IdentifierExpression","name":"x"},"right":{"type":"NumericLiteral","value":9}},"body":{"type":"PrintStatement","expressions":[{"type":"StringLiteral","value":"hello"}]}},{"type":"VariableStatement","declarations":[{"type":"VariableDeclaration","id":{"type":"IdentifierExpression","name":"a"},"init":{"type":"NumericLiteral","value":90}}]}]}}`,
  },
  {
    name: "while statement success test: with break statement",
    input: `
    namaskara
    ellivargu (x > 9) {
      saaku nilsu;
    }
    idu a = 90;
    matte sigona;
      `,
    output: `{"type":"Program","body":{"type":"InitStatement","body":[{"type":"WhileStatement","test":{"type":"BinaryExpression","operator":">","left":{"type":"IdentifierExpression","name":"x"},"right":{"type":"NumericLiteral","value":9}},"body":{"type":"BlockStatement","body":[{"type":"BreakStatement"},{"type":"EmptyStatement"}]}},{"type":"VariableStatement","declarations":[{"type":"VariableDeclaration","id":{"type":"IdentifierExpression","name":"a"},"init":{"type":"NumericLiteral","value":90}}]}]}}`,
  },
  {
    name: "while statement success test: with continue statement",
    input: `
    namaskara
    ellivargu (x > 9) {
      munde nodu;
    }
    idu a = 90;
    matte sigona;
      `,
    output: `{"type":"Program","body":{"type":"InitStatement","body":[{"type":"WhileStatement","test":{"type":"BinaryExpression","operator":">","left":{"type":"IdentifierExpression","name":"x"},"right":{"type":"NumericLiteral","value":9}},"body":{"type":"BlockStatement","body":[{"type":"ContinueStatement"},{"type":"EmptyStatement"}]}},{"type":"VariableStatement","declarations":[{"type":"VariableDeclaration","id":{"type":"IdentifierExpression","name":"a"},"init":{"type":"NumericLiteral","value":90}}]}]}}`,
  },
];
