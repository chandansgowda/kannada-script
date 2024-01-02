import Statement from ".";

import { TokenTypes } from "../../../constants/kannadascriptSpec";
import { NodeType } from "../../../constants/constants";
import { ASTNode } from "../types/nodeTypes";


export default class BreakStatement extends Statement {
    getStatement(): ASTNode {
        this._tokenExecutor.eatTokenAndForwardLookahead(TokenTypes.BAS_KAR_BHAI);

        return {
            type: NodeType.BreakStatement
        }
    }
}