import RuntimeException from "../exceptions/runtimeException";


export default class Scope {
  _variables: Map<string, unknown> = new Map();
  _parentScope: Scope | null;

  constructor(parentScope: Scope | null, variables?: Map<string, unknown>) {
    this._parentScope = parentScope;
    if (variables) this._variables = variables;
  }

  get(identifier: string): unknown {
    if (this._variables.has(identifier)) {
      return this._variables.get(identifier);
    }

    if (this._parentScope !== null) {
      return this._parentScope.get(identifier);
    }

    throw new RuntimeException(
      `Variable "${identifier}" create maadu modlu. ("${identifier}" is not defined)`
    );
  }

  assign(identifier: string, value: unknown) {
    if (this._variables.has(identifier)) {
      this._variables.set(identifier, value);
      return;
    }

    if (this._parentScope !== null) {
      this._parentScope.assign(identifier, value);
      return;
    }

    throw new RuntimeException(
      `Variable "${identifier}" create maadu modlu amele upayogisu. ("${identifier}" is not defined, declare it with idu)`
    );
  }

  declare(identifier: string, value: unknown) {
    if (this._variables.has(identifier)) {
      throw new RuntimeException(
        `Variable "${identifier}" avagle create madidiya. Check maadu. ("${identifier}" is already declared)`
      );
    }

    this._variables.set(identifier, value);
  }
}
