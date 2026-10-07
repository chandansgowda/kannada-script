import bhaiLangModule from "./module/bhaiLangModule";

export { NodeType } from "./constants/constants";
export { KEYWORDS } from "./constants/bhaiLangSpec";
export type { ASTNode } from "./components/parser/types/nodeTypes";
export type { KannadaSyntaxError } from "./exceptions/syntaxError";
export default bhaiLangModule.getParser();
