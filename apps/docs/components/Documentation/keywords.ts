import { KEYWORDS } from "kannada-script-interpreter";

export type KeywordInfo = {
  keyword: string;
  kannada: string;
  meaning: string;
  equivalent: string;
};

const row = (
  spellings: readonly string[],
  meaning: string,
  equivalent: string
): KeywordInfo => ({
  keyword: spellings[0],
  kannada: spellings[1],
  meaning,
  equivalent,
});

export const KEYWORD_TABLE: KeywordInfo[] = [
  row(KEYWORDS.namaskara, "hello — the program starts here", "program start"),
  row(KEYWORDS.matteSigona, "see you again — the program ends here", "program end"),
  row(KEYWORDS.helu, "say", "console.log"),
  row(KEYWORDS.idu, "this is", "let"),
  row(KEYWORDS.enadru, "if ever", "if"),
  row(KEYWORDS.illaAndre, "if not", "else if"),
  row(KEYWORDS.enuIllaAndre, "if nothing else", "else"),
  row(KEYWORDS.ellivargu, "until when", "while"),
  row(KEYWORDS.prathi, "for every", "for"),
  row(KEYWORDS.saakuNilsu, "enough, stop", "break"),
  row(KEYWORDS.mundeNodu, "look ahead", "continue"),
  row(KEYWORDS.kelasa, "work", "function"),
  row(KEYWORDS.kodu, "give", "return"),
  row(KEYWORDS.sari, "right", "true"),
  row(KEYWORDS.thappu, "wrong", "false"),
  row(KEYWORDS.khali, "empty", "null"),
  row(KEYWORDS.mattu, "and", "&&"),
  row(KEYWORDS.athava, "or", "||"),
  row(KEYWORDS.alla, "not", "!"),
];

export const BUILTIN_TABLE = [
  { name: "uddha(x)", kannada: "ಉದ್ದ", meaning: "length", description: "Length of a string or array" },
  { name: "serisu(list, x)", kannada: "ಸೇರಿಸು", meaning: "add", description: "Adds x to the end of the array, gives the new length" },
  { name: "tegi(list)", kannada: "ತೆಗಿ", meaning: "remove", description: "Removes the last element and gives it back" },
  { name: "sankhye(x)", kannada: "ಸಂಖ್ಯೆ", meaning: "number", description: 'Converts to a number: sankhye("42") is 42' },
  { name: "pada(x)", kannada: "ಪದ", meaning: "word", description: "Converts any value to a string" },
  { name: "poorna(x)", kannada: "ಪೂರ್ಣ", meaning: "whole", description: "Rounds down to a whole number: poorna(7 / 2) is 3" },
  { name: "kelu(prompt)", kannada: "ಕೇಳು", meaning: "ask", description: "Reads a line of input as a string" },
];
