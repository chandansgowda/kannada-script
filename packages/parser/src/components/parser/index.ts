import { KEYWORDS } from "../../constants/bhaiLangSpec";
import { Tokenizer } from "../tokenizer/types";
import Program from "./program";
import TokenExecutor from "./tokenExecutor";

// Finds the first "namaskara" that is a whole word, anything before it is
// ignored without being tokenized.
const PROGRAM_START = new RegExp(
  `(?<![\\p{L}\\p{M}\\p{N}_])(?:${KEYWORDS.namaskara.join("|")})(?![\\p{L}\\p{M}\\p{N}_])`,
  "u"
);

export class Parser {
  private _tokenizer: Tokenizer;
  private _program: Program;
  private _tokenExecutor: TokenExecutor;
  private _stringToTokenize: string;

  constructor(
    tokenizer: Tokenizer,
    program: Program,
    tokenExecutor: TokenExecutor
  ) {
    this._tokenizer = tokenizer;
    this._program = program;
    this._tokenExecutor = tokenExecutor;
    this._stringToTokenize = "";
  }

  parse(stringToTokenize: string) {
    this._stringToTokenize = stringToTokenize;

    this._tokenizer.initTokenizer(this._stringToTokenize);

    const programStart = PROGRAM_START.exec(this._stringToTokenize);
    this._tokenizer.setCursor(
      programStart ? programStart.index : this._stringToTokenize.length
    );

    // initliaze look ahead
    this._tokenExecutor.setLookahead(this._tokenizer.getNextToken());

    return this._program.getProgram();
  }
}
