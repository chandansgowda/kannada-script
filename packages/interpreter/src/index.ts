import InterpreterModule from "./module/interpreterModule";

export { default as RuntimeException } from "./exceptions/runtimeException";
export { BUILTIN_NAMES, BUILTIN_SPELLINGS } from "./runtime/builtins";
export { KEYWORDS } from "kannada-script-parser";
export type { KannadaSyntaxError } from "kannada-script-parser";
export type { InterpreterOptions } from "./module/interpreterModule";

export default InterpreterModule.getInterpreter();
