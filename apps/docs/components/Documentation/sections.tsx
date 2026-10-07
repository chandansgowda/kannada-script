import React from "react";

const C = ({ children }: { children: React.ReactNode }) => (
  <code className="inline-code">{children}</code>
);

export type DocSection = {
  id: string;
  title: string;
  description: React.ReactNode;
  code?: string;
  input?: string;
  runnable?: boolean;
};

export const DOC_SECTIONS: DocSection[] = [
  {
    id: "getting-started",
    title: "Getting started",
    description: (
      <>
        Every program starts with <C>namaskara</C> and ends with <C>matte sigona</C>.
        Anything outside of them is ignored, so you can write notes there. Statements end
        with a <C>;</C>.
      </>
    ),
    code: `This line is ignored

namaskara
  helu "Namaskara Jagattu!";
matte sigona

This too`,
  },
  {
    id: "comments",
    title: "Comments",
    description: (
      <>
        Use <C>{"//"}</C> for a single line comment and <C>{"/* ... */"}</C> for comments spanning
        multiple lines. In the playground, <kbd className="kbd">Ctrl</kbd> +{" "}
        <kbd className="kbd">/</kbd> comments out the selected lines.
      </>
    ),
    code: `namaskara
  // idu ondu comment
  /*
    Idu
    dodda comment
  */
  helu "Comments are ignored";
matte sigona`,
  },
  {
    id: "variables",
    title: "Variables",
    description: (
      <>
        Create variables with <C>idu</C> (&quot;this is&quot;). Several can be declared at
        once, separated by commas. A variable declared without a value is <C>khali</C>. Use{" "}
        <C>=</C> to change a value and <C>+=</C>, <C>-=</C>, <C>*=</C>, <C>/=</C>,{" "}
        <C>%=</C> to update it.
      </>
    ),
    code: `namaskara
  idu a = 10;
  idu b = "two", c;
  a = a + 1;
  a *= 2;
  helu a, b, c;
matte sigona`,
  },
  {
    id: "types",
    title: "Types",
    description: (
      <>
        Numbers and strings work like in other languages, strings can use{" "}
        <C>&quot;double&quot;</C> or <C>&apos;single&apos;</C> quotes and escapes like{" "}
        <C>\n</C>, <C>\t</C> and <C>\&quot;</C>. <C>sari</C> and <C>thappu</C> are the
        booleans, <C>khali</C> means empty (null), and <C>[ ]</C> makes an array.
      </>
    ),
    code: `namaskara
  idu sankhye = 10 + (15 * 20) / 4;
  idu dashamaamsha = 3.14;
  idu shabda = "Namaskara \\"anna\\"";
  idu nijavaa = sari;
  idu sullu = thappu;
  idu enuilla = khali;
  idu patti = [1, "eradu", sari];
  helu sankhye, dashamaamsha, shabda;
  helu nijavaa, sullu, enuilla, patti;
matte sigona`,
  },
  {
    id: "printing",
    title: "Printing",
    description: (
      <>
        <C>helu</C> (&quot;say&quot;) prints values. Separate several values with commas and
        they are printed on one line with spaces in between.
      </>
    ),
    code: `namaskara
  helu "Hello World";
  idu a = 10;
  {
    idu b = 20;
    helu a + b;
  }
  helu 5, 'ok', khali, sari, thappu;
matte sigona`,
  },
  {
    id: "operators",
    title: "Operators",
    description: (
      <>
        Arithmetic: <C>+</C> <C>-</C> <C>*</C> <C>/</C> <C>%</C>. Comparison: <C>==</C>{" "}
        <C>!=</C> <C>&lt;</C> <C>&lt;=</C> <C>&gt;</C> <C>&gt;=</C>. Logical: <C>mattu</C>{" "}
        (and, <C>&amp;&amp;</C>), <C>athava</C> (or, <C>||</C>) and <C>alla</C> (not,{" "}
        <C>!</C>). Adding a string to a number joins them.
      </>
    ),
    code: `namaskara
  idu a = 7;
  helu a + 3, a - 3, a * 3, a / 2, a % 3, -a;
  helu a > 5, a == 7, a != 7;
  helu (a > 5) mattu (a < 10), sari athava thappu, alla sari;
  helu "Score: " + a;
matte sigona`,
  },
  {
    id: "conditionals",
    title: "Conditionals",
    description: (
      <>
        <C>enadru</C> (if) runs a block when its condition is <C>sari</C>. Add any number of{" "}
        <C>illa andre</C> (else if) blocks and finish with an optional <C>enu illa andre</C>{" "}
        (else). <C>thappu</C>, <C>khali</C>, <C>0</C> and <C>&quot;&quot;</C> count as false,
        everything else as true.
      </>
    ),
    code: `namaskara
  idu a = 10;
  enadru (a < 20) {
    helu "a is less than 20";
  } illa andre (a < 25) {
    helu "a is less than 25";
  } enu illa andre {
    helu "a is greater than or equal to 25";
  }
matte sigona`,
  },
  {
    id: "while-loops",
    title: "ellivargu loops",
    description: (
      <>
        <C>ellivargu</C> (&quot;until when&quot;, while) repeats its block as long as the
        condition is <C>sari</C>. Use <C>saaku nilsu</C> (&quot;enough, stop&quot;) to leave
        the loop and <C>munde nodu</C> (&quot;look ahead&quot;) to skip to the next round.
      </>
    ),
    code: `namaskara
  idu a = 0;
  ellivargu (a < 10) {
    a += 1;
    enadru (a == 5) {
      helu "loop olaginda helu", a;
      munde nodu;
    }
    enadru (a == 7) {
      saaku nilsu;
    }
    helu a;
  }
  helu "done";
matte sigona`,
  },
  {
    id: "for-loops",
    title: "prathi loops",
    description: (
      <>
        <C>prathi</C> (&quot;for every&quot;) is a counting loop:{" "}
        <C>prathi (start; condition; step)</C>. The loop variable only exists inside the loop.
        Every part is optional, <C>prathi (;;)</C> loops until <C>saaku nilsu</C>.
      </>
    ),
    code: `namaskara
  prathi (idu i = 1; i <= 5; i += 1) {
    helu i, "x 9 =", i * 9;
  }
matte sigona`,
  },
  {
    id: "functions",
    title: "Functions",
    description: (
      <>
        Create functions with <C>kelasa</C> (&quot;work&quot;) and give back a value with{" "}
        <C>kodu</C> (&quot;give&quot;). A function without <C>kodu</C> gives <C>khali</C>.
        Functions can call themselves (recursion), be stored in variables and passed to other
        functions.
      </>
    ),
    code: `namaskara
  kelasa jodisu(a, b) {
    kodu a + b;
  }

  kelasa factorial(n) {
    enadru (n <= 1) {
      kodu 1;
    }
    kodu n * factorial(n - 1);
  }

  helu jodisu(2, 3);
  helu factorial(5);
matte sigona`,
  },
  {
    id: "arrays",
    title: "Arrays",
    description: (
      <>
        Arrays hold a list of values: <C>[1, 2, 3]</C>. Read and change elements with{" "}
        <C>list[index]</C>, indexes start at 0. Strings can be indexed too. Use{" "}
        <C>uddha</C>, <C>serisu</C> and <C>tegi</C> to get the length, add and remove
        elements.
      </>
    ),
    code: `namaskara
  idu hannu = ["mavu", "bale"];
  serisu(hannu, "halasu");
  hannu[0] = "seebe";

  prathi (idu i = 0; i < uddha(hannu); i += 1) {
    helu i, hannu[i];
  }
  helu hannu, "Kannada"[0];
matte sigona`,
  },
  {
    id: "builtins",
    title: "Built-in functions",
    description: (
      <>
        Kannada Script comes with a few helpful functions. Each one also has a Kannada script
        name, e.g. <C>ಉದ್ದ</C> for <C>uddha</C>. See the table in{" "}
        <a href="#keywords" className="font-semibold text-primary hover:underline">
          Keywords
        </a>
        .
      </>
    ),
    code: `namaskara
  helu uddha("namaskara"), uddha([1, 2]);
  helu sankhye("41") + 1, pada(41) + 1;
  helu poorna(7 / 2);

  idu stack = [];
  serisu(stack, 1);
  serisu(stack, 2);
  helu tegi(stack), stack;
matte sigona`,
  },
  {
    id: "input",
    title: "Input",
    description: (
      <>
        <C>kelu</C> (&quot;ask&quot;) reads a line of input and gives it as a string, use{" "}
        <C>sankhye</C> to turn it into a number. In the playground, answers come from the{" "}
        <b className="text-neutral-200">Input</b> tab (one per line), otherwise the browser
        asks you.
      </>
    ),
    code: `namaskara
  idu hesaru = kelu("Ninna hesaru? ");
  idu a = sankhye(kelu("Ondu sankhye: "));
  helu "Namaskara " + hesaru + "!", a, "x 2 =", a * 2;
matte sigona`,
    input: "Chandan\n21",
  },
  {
    id: "kannada-script",
    title: "Write in ಕನ್ನಡ ಲಿಪಿ",
    description: (
      <>
        Every keyword can also be written in Kannada script, and variable names can use
        Kannada letters and digits (<C>೦</C>–<C>೯</C>). Mix both as you like. The{" "}
        <b className="font-kannada text-neutral-200">ಕನ್ನಡ ಲಿಪಿ</b> button in the playground converts a program
        between the two.
      </>
    ),
    code: `ನಮಸ್ಕಾರ
  ಇದು ಹೆಸರು = "ಕನ್ನಡ";
  ಏನಾದ್ರು (ಉದ್ದ(ಹೆಸರು) > ೨) {
    ಹೇಳು "ನಮಸ್ಕಾರ " + ಹೆಸರು;
  } ಏನೂ ಇಲ್ಲ ಅಂದ್ರೆ {
    ಹೇಳು ಖಾಲಿ;
  }
ಮತ್ತೆ ಸಿಗೋಣ`,
  },
  {
    id: "errors",
    title: "Errors",
    description: (
      <>
        When something goes wrong, Kannada Script tells you what happened, in Kannada with an
        English hint. Syntax errors show the line and column, in the playground that line is
        highlighted and you can jump to it. Infinite loops and runaway recursion are stopped
        automatically.
      </>
    ),
    code: `namaskara
  idu a = 10
  helu a;
matte sigona`,
  },
];
