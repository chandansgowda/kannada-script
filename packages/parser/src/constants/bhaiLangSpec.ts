export const TokenTypes = {
  NULL_TYPE: null,

  HI_BHAI_TYPE: "namaskara",

  BYE_BHAI_TYPE: "matte sigona",

  BOL_BHAI_TYPE: "helu",

  BHAI_YE_HAI_TYPE: "idu",

  AGAR_BHAI: "enadru",

  WARNA_BHAI: "enu illa andre",

  NAHI_TO_BHAI: "illa andre",

  JAB_TAK_BHAI: "ellivargu",

  BAS_KAR_BHAI: "saaku nilsu",

  AGLA_DEKH_BHAI: "munde nodu",

  FUNCTION_TYPE: "kelasa",

  RETURN_TYPE: "kodu",

  FOR_TYPE: "prathi",

  khali_TYPE: "khali",

  SEMI_COLON_TYPE: ";",

  OPEN_CURLY_BRACE_TYPE: "{",

  CLOSED_CURLY_BRACE_TYPE: "}",

  OPEN_PARENTHESIS_TYPE: "(",

  CLOSED_PARENTHESIS_TYPE: ")",

  OPEN_BRACKET_TYPE: "[",

  CLOSED_BRACKET_TYPE: "]",

  COMMA_TYPE: ",",

  NUMBER_TYPE: "NUMBER",

  IDENTIFIER_TYPE: "IDENTIFIER",

  SIMPLE_ASSIGN_TYPE: "SIMPLE_ASSIGN",

  COMPLEX_ASSIGN_TYPE: "COMPLEX_ASSIGN",

  ADDITIVE_OPERATOR_TYPE: "ADDITIVE_OPERATOR",

  MULTIPLICATIVE_OPERATOR_TYPE: "MULTIPLICATIVE_OPERATOR",

  RELATIONAL_OPERATOR: "RELATIONAL_OPERATOR",

  EQUALITY_OPERATOR: "EQUALITY_OPERATOR",

  STRING_TYPE: "STRING",

  BOOLEAN_TYPE: "BOOLEAN",

  LOGICAL_AND: "LOGICAL_AND",

  LOGICAL_OR: "LOGICAL_OR",

  LOGICAL_NOT: "LOGICAL_NOT",
};

export type SpecEntry = {
  regex: RegExp;
  tokenType: string | null;
  // When set, the token's value is replaced by this canonical spelling, so
  // aliases (e.g. Kannada script keywords, "mattu" for "&&") parse identically.
  canonical?: string;
};

// A keyword must not be followed by a letter, combining mark (Kannada vowel
// signs are marks), digit or underscore. `\b` only understands ASCII.
const WORD_END = "(?![\\p{L}\\p{M}\\p{N}_])";

/**
 * Builds a regex matching any of the given spellings of a keyword. Multi-word
 * keywords allow any amount of whitespace between their words.
 */
const keyword = (...spellings: string[]) =>
  new RegExp(
    `^(?:${spellings
      .map((spelling) => spelling.split(" ").join("\\s+"))
      .join("|")})${WORD_END}`,
    "u"
  );

const DIGIT = "[0-9೦-೯]";

/**
 * Every keyword with its Kannada script spellings. The first spelling is the
 * canonical one.
 */
export const KEYWORDS = {
  namaskara: ["namaskara", "ನಮಸ್ಕಾರ"],
  matteSigona: ["matte sigona", "ಮತ್ತೆ ಸಿಗೋಣ"],
  helu: ["helu", "ಹೇಳು"],
  idu: ["idu", "ಇದು"],
  enadru: ["enadru", "ಏನಾದ್ರು", "ಏನಾದರೂ"],
  illaAndre: ["illa andre", "ಇಲ್ಲ ಅಂದ್ರೆ"],
  enuIllaAndre: ["enu illa andre", "ಏನು ಇಲ್ಲ ಅಂದ್ರೆ", "ಏನೂ ಇಲ್ಲ ಅಂದ್ರೆ"],
  ellivargu: ["ellivargu", "ಎಲ್ಲಿವರೆಗೂ", "ಎಲ್ಲಿವರೆಗು"],
  saakuNilsu: ["saaku nilsu", "ಸಾಕು ನಿಲ್ಸು"],
  mundeNodu: ["munde nodu", "ಮುಂದೆ ನೋಡು"],
  kelasa: ["kelasa", "ಕೆಲಸ"],
  kodu: ["kodu", "ಕೊಡು"],
  prathi: ["prathi", "ಪ್ರತಿ"],
  khali: ["khali", "ಖಾಲಿ"],
  sari: ["sari", "ಸರಿ"],
  thappu: ["thappu", "ತಪ್ಪು"],
  mattu: ["mattu", "ಮತ್ತು"],
  athava: ["athava", "ಅಥವಾ"],
  alla: ["alla", "ಅಲ್ಲ"],
} as const;

const keywordEntry = (
  spellings: readonly string[],
  tokenType: string,
  canonical: string = spellings[0]
): SpecEntry => ({
  regex: keyword(...spellings),
  tokenType,
  canonical,
});

export const SPEC: SpecEntry[] = [
  // Whitespcaes
  { regex: /^\s+/, tokenType: TokenTypes.NULL_TYPE },

  // singke line Comments
  { regex: /^\/\/.*/, tokenType: TokenTypes.NULL_TYPE },

  // multi line comments
  { regex: /^\/\*[\s\S]*?\*\//, tokenType: TokenTypes.NULL_TYPE },

  // Symbols, delimiters
  { regex: /^;/, tokenType: TokenTypes.SEMI_COLON_TYPE },
  { regex: /^\{/, tokenType: TokenTypes.OPEN_CURLY_BRACE_TYPE },
  { regex: /^\}/, tokenType: TokenTypes.CLOSED_CURLY_BRACE_TYPE },
  { regex: /^\(/, tokenType: TokenTypes.OPEN_PARENTHESIS_TYPE },
  { regex: /^\)/, tokenType: TokenTypes.CLOSED_PARENTHESIS_TYPE },
  { regex: /^\[/, tokenType: TokenTypes.OPEN_BRACKET_TYPE },
  { regex: /^\]/, tokenType: TokenTypes.CLOSED_BRACKET_TYPE },
  { regex: /^,/, tokenType: TokenTypes.COMMA_TYPE },

  //Keywords
  keywordEntry(KEYWORDS.namaskara, TokenTypes.HI_BHAI_TYPE),
  keywordEntry(KEYWORDS.matteSigona, TokenTypes.BYE_BHAI_TYPE),
  keywordEntry(KEYWORDS.helu, TokenTypes.BOL_BHAI_TYPE),
  keywordEntry(KEYWORDS.idu, TokenTypes.BHAI_YE_HAI_TYPE),
  keywordEntry(KEYWORDS.enadru, TokenTypes.AGAR_BHAI),
  keywordEntry(KEYWORDS.illaAndre, TokenTypes.NAHI_TO_BHAI),
  keywordEntry(KEYWORDS.enuIllaAndre, TokenTypes.WARNA_BHAI),
  keywordEntry(KEYWORDS.khali, TokenTypes.khali_TYPE),
  keywordEntry(KEYWORDS.ellivargu, TokenTypes.JAB_TAK_BHAI),
  keywordEntry(KEYWORDS.saakuNilsu, TokenTypes.BAS_KAR_BHAI),
  keywordEntry(KEYWORDS.mundeNodu, TokenTypes.AGLA_DEKH_BHAI),
  keywordEntry(KEYWORDS.kelasa, TokenTypes.FUNCTION_TYPE),
  keywordEntry(KEYWORDS.kodu, TokenTypes.RETURN_TYPE),
  keywordEntry(KEYWORDS.prathi, TokenTypes.FOR_TYPE),
  keywordEntry(KEYWORDS.mattu, TokenTypes.LOGICAL_AND, "&&"),
  keywordEntry(KEYWORDS.athava, TokenTypes.LOGICAL_OR, "||"),
  keywordEntry(KEYWORDS.alla, TokenTypes.LOGICAL_NOT, "!"),

  // Number (signs are handled by the parser as unary operators, so `a-1`
  // is a subtraction). Kannada digits (೦-೯) are supported too.
  {
    regex: new RegExp(`^(?:${DIGIT}*\\.)?${DIGIT}+`),
    tokenType: TokenTypes.NUMBER_TYPE,
  },

  // Boolean
  keywordEntry(KEYWORDS.sari, TokenTypes.BOOLEAN_TYPE),
  keywordEntry(KEYWORDS.thappu, TokenTypes.BOOLEAN_TYPE),

  // Identifier: letters from any script (so Kannada names work), digits, _
  { regex: /^[\p{L}_][\p{L}\p{M}\p{N}_]*/u, tokenType: TokenTypes.IDENTIFIER_TYPE },

  // Equality operator: ==, !=
  {regex: /^[=!]=/, tokenType: TokenTypes.EQUALITY_OPERATOR},

  // logical not: !
  { regex: /^!/, tokenType: TokenTypes.LOGICAL_NOT },

  // Assignment operators: =, *=, /=, +=, -=
  { regex: /^=/, tokenType: TokenTypes.SIMPLE_ASSIGN_TYPE },
  { regex: /^[\*\%\/\+\-]=/, tokenType: TokenTypes.COMPLEX_ASSIGN_TYPE },

  // operator
  { regex: /^[+\-]/, tokenType: TokenTypes.ADDITIVE_OPERATOR_TYPE },
  { regex: /^[*\/\%]/, tokenType: TokenTypes.MULTIPLICATIVE_OPERATOR_TYPE },
  {regex: /^[><]=?/, tokenType: TokenTypes.RELATIONAL_OPERATOR},

  // logical operators: &&, ||
  {regex: /^&&/, tokenType: TokenTypes.LOGICAL_AND},
  {regex: /^\|\|/, tokenType: TokenTypes.LOGICAL_OR},

  // String (supports escapes like \" \n \t \\)
  { regex: /^"(?:[^"\\]|\\[\s\S])*"/, tokenType: TokenTypes.STRING_TYPE },
  { regex: /^'(?:[^'\\]|\\[\s\S])*'/, tokenType: TokenTypes.STRING_TYPE },
];

export type Spec = SpecEntry[];
