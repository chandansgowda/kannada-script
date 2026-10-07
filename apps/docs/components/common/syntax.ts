import Prism from "prismjs";
import { BUILTIN_SPELLINGS, KEYWORDS } from "kannada-script-interpreter";

// `\b` only understands ASCII, these work for Kannada letters & vowel signs
const NOT_WORD_BEFORE = "(?<![\\p{L}\\p{M}\\p{N}_])";
const NOT_WORD_AFTER = "(?![\\p{L}\\p{M}\\p{N}_])";

const escapeRegex = (text: string) =>
  text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const spellingsPattern = (spellings: readonly string[]) =>
  [...spellings]
    // longest first, so "enu illa andre" wins over "illa andre"
    .sort((a, b) => b.length - a.length)
    .map((spelling) => spelling.split(" ").map(escapeRegex).join("\\s+"))
    .join("|");

const wordRegex = (spellings: readonly string[]) =>
  new RegExp(
    `${NOT_WORD_BEFORE}(?:${spellingsPattern(spellings)})${NOT_WORD_AFTER}`,
    "u"
  );

const { sari, thappu, khali, ...otherKeywords } = KEYWORDS;

export const kannadascriptSyntax: Prism.Grammar = {
  comment: [
    { pattern: /\/\*[\s\S]*?(?:\*\/|$)/, greedy: true },
    { pattern: /\/\/.*/, greedy: true },
  ],
  string: {
    pattern: /(["'])(?:\\[\s\S]|(?!\1)[^\\])*\1?/,
    greedy: true,
  },
  keyword: wordRegex(Object.values(otherKeywords).flat()),
  boolean: wordRegex([...sari, ...thappu]),
  null: wordRegex(khali),
  builtin: wordRegex(BUILTIN_SPELLINGS.flat()),
  function: new RegExp(
    `${NOT_WORD_BEFORE}[\\p{L}_][\\p{L}\\p{M}\\p{N}_]*(?=\\s*\\()`,
    "u"
  ),
  number: new RegExp(
    `${NOT_WORD_BEFORE}(?:[0-9\u0CE6-\u0CEF]*\\.)?[0-9\u0CE6-\u0CEF]+`,
    "u"
  ),
  operator: /[-+*/%]=?|[=!]=?|[<>]=?|&&|\|\|/,
  punctuation: /[{}[\];(),]/,
};

Prism.languages.kannadascript = kannadascriptSyntax;

export const highlightCode = (code: string) =>
  Prism.highlight(code, kannadascriptSyntax, "kannadascript");
