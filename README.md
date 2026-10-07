<h1 align="center">Kannada Script</h1>

<p align="center">
  <b>A toy programming language to learn coding in Kannada, written in TypeScript.</b><br>
  Kannadigarinda, Kannadigarigoskara 🔥 (Forked from BhaiLang)<br><br>
  <a href="https://kannadascript.netlify.app/#playground">Playground</a> ·
  <a href="https://kannadascript.netlify.app/#docs">Documentation</a> ·
  <a href="https://www.youtube.com/@EngineeringinKannada">Engineering in Kannada</a>
</p>

```
namaskara
  kelasa factorial(n) {
    enadru (n <= 1) {
      kodu 1;
    }
    kodu n * factorial(n - 1);
  }

  prathi (idu i = 1; i <= 5; i += 1) {
    helu i + "! =", factorial(i);
  }
matte sigona
```

Every keyword can also be written in Kannada script:

```
ನಮಸ್ಕಾರ
  ಇದು ಹೆಸರು = "ಕನ್ನಡ";
  ಹೇಳು "ನಮಸ್ಕಾರ " + ಹೆಸರು;
ಮತ್ತೆ ಸಿಗೋಣ
```

<h2 align="center">Try it</h2>

The quickest way is the <a href="https://kannadascript.netlify.app/#playground">online playground</a>: examples, sharable links,
input for `kelu()`, a one-click switch between English letters and ಕನ್ನಡ ಲಿಪಿ, and errors that point at the line.

To run `.kans` files on your computer, build the CLI from source:

```
git clone https://github.com/chandansgowda/kannada-script.git
cd kannada-script
npm install && npm run build
node packages/cli/bin/index.js hello.kans
```

<h2 align="center">Keywords</h2>

| Keyword | ಕನ್ನಡ | Meaning | Like |
| --- | --- | --- | --- |
| `namaskara` | ನಮಸ್ಕಾರ | hello, program starts | |
| `matte sigona` | ಮತ್ತೆ ಸಿಗೋಣ | see you again, program ends | |
| `helu` | ಹೇಳು | say | `console.log` |
| `idu` | ಇದು | this is | `let` |
| `enadru` | ಏನಾದ್ರು | if ever | `if` |
| `illa andre` | ಇಲ್ಲ ಅಂದ್ರೆ | if not | `else if` |
| `enu illa andre` | ಏನು ಇಲ್ಲ ಅಂದ್ರೆ | if nothing else | `else` |
| `ellivargu` | ಎಲ್ಲಿವರೆಗೂ | until when | `while` |
| `prathi` | ಪ್ರತಿ | for every | `for` |
| `saaku nilsu` | ಸಾಕು ನಿಲ್ಸು | enough, stop | `break` |
| `munde nodu` | ಮುಂದೆ ನೋಡು | look ahead | `continue` |
| `kelasa` | ಕೆಲಸ | work | `function` |
| `kodu` | ಕೊಡು | give | `return` |
| `sari` / `thappu` | ಸರಿ / ತಪ್ಪು | right / wrong | `true` / `false` |
| `khali` | ಖಾಲಿ | empty | `null` |
| `mattu` / `athava` / `alla` | ಮತ್ತು / ಅಥವಾ / ಅಲ್ಲ | and / or / not | `&&` / `\|\|` / `!` |

<h2 align="center">Documentation</h2>

<h3 align="center">General</h3>
<p align="center"><code>namaskara</code> is the entrypoint for the program and all program must end with <code>matte sigona</code>. Anything outside of it will be ignored.</p>

```
This will be ignored

namaskara
  // Write code here
  /* multi line
     comments too */
matte sigona

This too
```

<h3 align="center">Variables & types</h3>
<p align="center">Variables are declared using <code>idu</code>. Numbers and strings work like in other languages (strings support escapes like <code>\n</code> and <code>\"</code>). <code>sari</code> and <code>thappu</code> are the booleans, <code>khali</code> is null and <code>[ ]</code> creates an array. Kannada letters and digits (೦-೯) work in names and numbers.</p>

```
namaskara
  idu a = 10;
  idu b = "two", c;
  idu d = [1, 'mooru', sari, khali];
  a += 1;
  helu a, b, c, d;
matte sigona
```

<h3 align="center">Operators</h3>
<p align="center">Arithmetic <code>+ - * / %</code>, comparison <code>== != &lt; &lt;= &gt; &gt;=</code>, logical <code>mattu</code> (<code>&amp;&amp;</code>), <code>athava</code> (<code>||</code>), <code>alla</code> (<code>!</code>), and the assignments <code>= += -= *= /= %=</code>.</p>

```
namaskara
  idu a = 7;
  helu a + 3, a % 3, -a, (a > 5) mattu (a < 10), alla sari;
matte sigona
```

<h3 align="center">Built-ins</h3>
<p align="center">Use <code>helu</code> to print anything to console.</p>

```
namaskara
  helu "Hello World";
  helu 5, 'ok', khali, sari, thappu;
matte sigona
```

| Function | ಕನ್ನಡ | What it does |
| --- | --- | --- |
| `uddha(x)` | ಉದ್ದ | length of a string or array |
| `serisu(list, x)` | ಸೇರಿಸು | adds `x` to the end of an array |
| `tegi(list)` | ತೆಗಿ | removes and returns the last element |
| `sankhye(x)` | ಸಂಖ್ಯೆ | converts to a number |
| `pada(x)` | ಪದ | converts to a string |
| `poorna(x)` | ಪೂರ್ಣ | rounds down to a whole number |
| `kelu(prompt)` | ಕೇಳು | reads a line of input |

<h3 align="center">Conditionals</h3>
<p align="center">The <code>enadru</code> block runs if its condition is <code>sari</code>, otherwise the first <code>illa andre</code> block whose condition is <code>sari</code> runs, and finally the <code>enu illa andre</code> block. <code>thappu</code>, <code>khali</code>, <code>0</code> and <code>""</code> count as false.</p>

```
namaskara
  idu a = 10;
  enadru (a < 20) {
    helu "a is less than 20";
  } illa andre ( a < 25 ) {
    helu "a is less than 25";
  } enu illa andre {
    helu "a is greater than or equal to 25";
  }
matte sigona
```

<h3 align="center">Loops</h3>
<p align="center"><code>ellivargu</code> repeats while its condition is <code>sari</code>, <code>prathi</code> is a counting loop. Use <code>saaku nilsu</code> to break the loop and <code>munde nodu</code> to continue.</p>

```
namaskara
  idu a = 0;
  ellivargu (a < 10) {
    a += 1;
    enadru (a == 5) {
      munde nodu;
    }
    enadru (a == 7) {
      saaku nilsu;
    }
    helu a;
  }

  prathi (idu i = 1; i <= 3; i += 1) {
    helu i, "x 9 =", i * 9;
  }
matte sigona
```

<h3 align="center">Functions</h3>
<p align="center">Declare functions with <code>kelasa</code> and return a value with <code>kodu</code>. Functions support recursion and closures, and can be passed around as values.</p>

```
namaskara
  kelasa jodisu(a, b) {
    kodu a + b;
  }
  helu jodisu(2, 3);
matte sigona
```

<h3 align="center">Arrays & input</h3>

```
namaskara
  idu hesaru = kelu("Ninna hesaru? ");
  idu hannu = ["mavu", "bale"];
  serisu(hannu, "halasu");
  hannu[0] = "seebe";
  helu "Namaskara " + hesaru, hannu, uddha(hannu);
matte sigona
```

<h2 align="center">Development</h2>

```
npm install
npm run build   # parser, interpreter, CLI and the playground
npm run test
npm run dev     # playground at http://localhost:3000
```

<p align="center">The repo has <code>packages/parser</code> (tokenizer + recursive descent parser producing an AST), <code>packages/interpreter</code> (tree-walking interpreter), <code>packages/cli</code> and <code>apps/docs</code> (the website & playground). You can explore the abstract syntax tree (AST) of kannadascript <a href="https://kannadascript-ast.netlify.app/" target="_blank">here</a>.</p>
