import bhaiLangModule from "./module/bhaiLangModule";

export { NodeType } from "./constants/constants";
export type { ASTNode } from "./components/parser/types/nodeTypes";
export default bhaiLangModule.getParser();
