import { BUILTIN_SPELLINGS, KEYWORDS } from "kannada-script-interpreter";

export type Script = "latin" | "kannada";

const NOT_WORD_BEFORE = "(?<![\\p{L}\\p{M}\\p{N}_])";
const NOT_WORD_AFTER = "(?![\\p{L}\\p{M}\\p{N}_])";

// [latin spelling, kannada spellings...]
const SPELLINGS: readonly (readonly string[])[] = [
  ...Object.values(KEYWORDS),
  ...BUILTIN_SPELLINGS,
];

const toMatcher = (pairs: [string, string][]) => {
  const lookup = new Map(
    pairs.map(([from, to]) => [from.replace(/\s+/g, " "), to])
  );
  const pattern = pairs
    .map(([from]) => from)
    .sort((a, b) => b.length - a.length)
    .map((from) => from.split(" ").join("\\s+"))
    .join("|");

  return {
    regex: new RegExp(`${NOT_WORD_BEFORE}(?:${pattern})${NOT_WORD_AFTER}`, "gu"),
    replace: (match: string) => lookup.get(match.replace(/\s+/g, " ")) ?? match,
  };
};

const MATCHERS: Record<Script, ReturnType<typeof toMatcher>> = {
  kannada: toMatcher(
    SPELLINGS.map(([latin, kannada]) => [latin, kannada] as [string, string])
  ),
  latin: toMatcher(
    SPELLINGS.flatMap(([latin, ...kannada]) =>
      kannada.map((spelling) => [spelling, latin] as [string, string])
    )
  ),
};

// strings and comments are left untouched
const PROTECTED = /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)|"(?:\\[\s\S]|[^"\\])*"?|'(?:\\[\s\S]|[^'\\])*'?/g;

/**
 * Rewrites keywords & built-in names to the given script, e.g.
 * `helu` <-> `ಹೇಳು`. Variable names, strings and comments are not changed.
 */
export function transliterate(code: string, to: Script): string {
  const { regex, replace } = MATCHERS[to];
  let result = "";
  let last = 0;

  for (const match of Array.from(code.matchAll(PROTECTED))) {
    const index = match.index ?? 0;
    result += code.slice(last, index).replace(regex, replace) + match[0];
    last = index + match[0].length;
  }

  return result + code.slice(last).replace(regex, replace);
}

/** Which script the program's keywords are mostly written in. */
export function detectScript(code: string): Script {
  const kannada = code.match(MATCHERS.latin.regex)?.length ?? 0;
  const latin = code.match(MATCHERS.kannada.regex)?.length ?? 0;
  return kannada > latin ? "kannada" : "latin";
}
