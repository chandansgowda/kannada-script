import kannadascriptModule from "./module/kannadascriptModule";

export { NodeType } from "./constants/constants";
export type { ASTNode } from "./components/parser/types/nodeTypes";
export default kannadascriptModule.getParser();
