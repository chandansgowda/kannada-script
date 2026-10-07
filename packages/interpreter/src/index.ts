import InterpreterModule from "./module/interpreterModule";

export { default as RuntimeException } from "./exceptions/runtimeException";
export { BUILTIN_NAMES } from "./runtime/builtins";
export type { InterpreterOptions } from "./module/interpreterModule";

export default InterpreterModule.getInterpreter();
