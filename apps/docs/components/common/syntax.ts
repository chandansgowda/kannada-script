import Prism, { languages } from "prismjs";


export const kannadascriptSyntax = languages.extend("clike", {
  comment: [
    {
      pattern: /(^|[^\\:])\/\/.*/,
      lookbehind: true,
      greedy: true,
    },
    {
      pattern: /\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/,
      lookbehind: true,
      greedy: true,
    },
  ],
  string: {
    pattern: /(["'])((?:\\\1|(?:(?!\1)).)*)(\1)/,
    greedy: true,
  },
  keyword: /\b(?:namaskara|matte sigona|helu|idu|khali|enadru|illa andre|enu illa andre|ellivargu|saaku nilsu|munde nodu)\b/,
  boolean: /\b(?:sari|thappu)\b/,
  number: /(?:(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[-+]?\d+)?)i?/i,
  operator:
    /[*/%^!=]=?|~|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,
});

Prism.languages.kannadascript = kannadascriptSyntax;
