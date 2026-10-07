import parser, { ASTNode, NodeType } from "kannada-script-parser";

import Interpreter from "../components/interpreter";
import Scope from "../components/scope";
import Visitor from "../components/visitor";
import ArrayLiteral from "../components/visitor/arrayLiteral";
import AssignmentExpression from "../components/visitor/assignmentExpression";
import BinaryExpression from "../components/visitor/binaryExpression";
import BlockStatement from "../components/visitor/blockStatement";
import BooleanLiteral from "../components/visitor/booleanLiteral";
import BreakStatement from "../components/visitor/breakStatement";
import CallExpression from "../components/visitor/callExpression";
import ContinueStatement from "../components/visitor/continueStatement";
import EmptyStatement from "../components/visitor/emptyStatement";
import ExpressionStatement from "../components/visitor/expressionStatement";
import ForStatement from "../components/visitor/forStatement";
import FunctionDeclaration from "../components/visitor/functionDeclaration";
import IdentifierExpression from "../components/visitor/identifierExpression";
import IfStatement from "../components/visitor/ifStatement";
import InitStatement from "../components/visitor/initStatement";
import LogicalExpression from "../components/visitor/logicalExpression";
import MemberExpression from "../components/visitor/memberExpression";
import NullLiteral from "../components/visitor/nullLiteral";
import NumericLiteral from "../components/visitor/numericLiteral";
import PrintStatement from "../components/visitor/printStatement";
import Program from "../components/visitor/program";
import ReturnStatement from "../components/visitor/returnStatement";
import StringLiteral from "../components/visitor/stringLiteral";
import UnaryExpression from "../components/visitor/unaryExpression";
import VariableDeclaration from "../components/visitor/variableDeclaration";
import VariableStatement from "../components/visitor/variableStatement";
import WhileStatement from "../components/visitor/whileStatement";
import InvalidStateException from "../exceptions/invalidStateException";
import RuntimeException from "../exceptions/runtimeException";

export type InterpreterOptions = {
  /** Receives every line printed by `helu`. Defaults to console.log */
  print?: (line: string) => void;
  /** Provides a line of input for `kelu()`, return null when there is none */
  input?: (prompt?: string) => string | null | undefined;
  /** Max loop iterations + function calls in one run (infinite loop guard) */
  maxSteps?: number;
  /** Max nesting of function calls (infinite recursion guard) */
  maxCallDepth?: number;
};

const DEFAULT_OPTIONS = {
  print: (line: string) => console.log(line),
  maxSteps: 1_000_000,
  maxCallDepth: 1000,
};

type ResolvedOptions = typeof DEFAULT_OPTIONS & InterpreterOptions;


export default class InterpreterModule {
  private static _visitorMap = {
    [NodeType.Program]: new Program(),
    [NodeType.InitStatement]: new InitStatement(),
    [NodeType.PrintStatement]: new PrintStatement(),
    [NodeType.EmptyStatement]: new EmptyStatement(),
    [NodeType.BlockStatement]: new BlockStatement(),
    [NodeType.VariableStatement]: new VariableStatement(),
    [NodeType.IdentifierExpression]: new IdentifierExpression(),
    [NodeType.VariableDeclaration]: new VariableDeclaration(),
    [NodeType.AssignmentExpression]: new AssignmentExpression(),
    [NodeType.ExpressionStatement]: new ExpressionStatement(),
    [NodeType.BinaryExpression]: new BinaryExpression(),
    [NodeType.LogicalExpression]: new LogicalExpression(),
    [NodeType.UnaryExpression]: new UnaryExpression(),
    [NodeType.CallExpression]: new CallExpression(),
    [NodeType.MemberExpression]: new MemberExpression(),
    [NodeType.ArrayLiteral]: new ArrayLiteral(),
    [NodeType.FunctionDeclaration]: new FunctionDeclaration(),
    [NodeType.ReturnStatement]: new ReturnStatement(),
    [NodeType.ForStatement]: new ForStatement(),
    [NodeType.StringLiteral]: new StringLiteral(),
    [NodeType.NumericLiteral]: new NumericLiteral(),
    [NodeType.BooleanLiteral]: new BooleanLiteral(),
    [NodeType.NullLiteral]: new NullLiteral(),
    [NodeType.IfStatement]: new IfStatement(),
    [NodeType.WhileStatement]: new WhileStatement(),
    [NodeType.BreakStatement]: new BreakStatement(),
    [NodeType.ContinueStatement]: new ContinueStatement(),
  } as Record<string, Visitor>;

  private static _currentScope: Scope;
  private static _interpreter: Interpreter;
  private static _options: ResolvedOptions = { ...DEFAULT_OPTIONS };
  private static _steps = 0;
  private static _callDepth = 0;
  private static _loopDepth = 0;

  static getVisitor(nodeType: string) {
    const visitor = InterpreterModule._visitorMap[nodeType];

    if (!visitor)
      throw new InvalidStateException(
        `Couldn't find any visitor object for nodeType: ${nodeType}`
      );

    return visitor;
  }

  static getInterpreter() {
    this._interpreter =
      this._interpreter ?? new Interpreter(parser, this.getCurrentScope());
    return this._interpreter;
  }

  static getCurrentScope() {
    this._currentScope = this._currentScope ?? new Scope(null);
    return this._currentScope;
  }

  static setCurrentScope(scope: Scope) {
    this._currentScope = scope;
  }

  /** Visits a node and returns its value. */
  static evaluate(node: ASTNode): unknown {
    return this.getVisitor(node.type).visitNode(node);
  }

  /** Runs `body` in a new child scope, restoring the current one afterwards. */
  static withScope<T>(body: (scope: Scope) => T, parent = this._currentScope): T {
    const previousScope = this._currentScope;
    const scope = new Scope(parent);
    this._currentScope = scope;
    try {
      return body(scope);
    } finally {
      this._currentScope = previousScope;
    }
  }

  static getOptions() {
    return this._options;
  }

  /** Prepares for a new run of a program. */
  static reset(options: InterpreterOptions = {}) {
    this._options = { ...DEFAULT_OPTIONS };
    (Object.keys(options) as (keyof InterpreterOptions)[]).forEach((key) => {
      if (options[key] !== undefined)
        (this._options as Record<string, unknown>)[key] = options[key];
    });
    this._steps = 0;
    this._callDepth = 0;
    this._loopDepth = 0;
  }

  /** Counts a loop iteration or function call against the step budget. */
  static tick() {
    if (++this._steps > this._options.maxSteps)
      throw new RuntimeException(
        `Program ${this._options.maxSteps} kintha jaasti sala odide — infinite loop irbahudu! (Too many steps, is there an infinite loop?)`
      );
  }

  static isInsideLoop() {
    return this._loopDepth > 0;
  }

  static isInsideFunction() {
    return this._callDepth > 0;
  }

  static inLoop<T>(body: () => T): T {
    this._loopDepth++;
    try {
      return body();
    } finally {
      this._loopDepth--;
    }
  }

  /** Runs a function body: loops outside the function don't count inside it. */
  static inFunctionCall<T>(name: string, body: () => T): T {
    if (this._callDepth >= this._options.maxCallDepth)
      throw new RuntimeException(
        `"${name}" kelasa ${this._options.maxCallDepth} kintha aala recursion aaytu — base case marethideya? (Maximum recursion depth exceeded)`
      );

    const loopDepth = this._loopDepth;
    this._callDepth++;
    this._loopDepth = 0;
    try {
      return body();
    } finally {
      this._callDepth--;
      this._loopDepth = loopDepth;
    }
  }
}
