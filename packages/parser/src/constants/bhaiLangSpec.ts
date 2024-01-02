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

  khali_TYPE: "khali",

  SEMI_COLON_TYPE: ";",

  OPEN_CURLY_BRACE_TYPE: "{",

  CLOSED_CURLY_BRACE_TYPE: "}",

  OPEN_PARENTHESIS_TYPE: "(",

  CLOSED_PARENTHESIS_TYPE: ")",

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

  LOGICAL_OR: "LOGICAL_OR"
};

export const SPEC = [
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
  { regex: /^,/, tokenType: TokenTypes.COMMA_TYPE },

  //Keywords
  { regex: /^\bnamaskara\b/, tokenType: TokenTypes.HI_BHAI_TYPE },
  { regex: /^\bmatte sigona\b/, tokenType: TokenTypes.BYE_BHAI_TYPE },
  { regex: /^\bhelu\b/, tokenType: TokenTypes.BOL_BHAI_TYPE },
  { regex: /^\bidu\b/, tokenType: TokenTypes.BHAI_YE_HAI_TYPE },
  { regex: /^\benadru\b/, tokenType: TokenTypes.AGAR_BHAI },
  { regex: /^\billa andre\b/, tokenType: TokenTypes.NAHI_TO_BHAI },
  { regex: /^\benu illa andre\b/, tokenType: TokenTypes.WARNA_BHAI },
  { regex: /^\bkhali\b/, tokenType: TokenTypes.khali_TYPE },
  { regex: /^\bellivargu\b/, tokenType: TokenTypes.JAB_TAK_BHAI },
  { regex: /^\bsaaku nilsu\b/, tokenType: TokenTypes.BAS_KAR_BHAI },
  { regex: /^\bmunde nodu\b/, tokenType: TokenTypes.AGLA_DEKH_BHAI },

  // Number
  { regex: /^[+-]?([\d]*[.])?[\d]+/, tokenType: TokenTypes.NUMBER_TYPE },

  // Boolean
  { regex: /^\bsari\b/, tokenType: TokenTypes.BOOLEAN_TYPE },
  { regex: /^\bthappu\b/, tokenType: TokenTypes.BOOLEAN_TYPE },

  // Identifier
  { regex: /^\w+/, tokenType: TokenTypes.IDENTIFIER_TYPE },

  // Equality operator: ==, !=
  {regex: /^[=!]=/, tokenType: TokenTypes.EQUALITY_OPERATOR},

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

  // String
  { regex: /^"[^"]*"/, tokenType: TokenTypes.STRING_TYPE },
  { regex: /^'[^']*'/, tokenType: TokenTypes.STRING_TYPE },
];

export type Spec = typeof SPEC;
