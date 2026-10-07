// Control flow is implemented by throwing these signals; loops and function
// calls catch them. They are not errors and never reach the user.

export class BreakSignal {}

export class ContinueSignal {}

export class ReturnSignal {
  constructor(readonly value: unknown) {}
}
