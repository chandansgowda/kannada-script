<h1 align="center">Kannada Script</h1>

</p>
<p align="center">
  This is official repository for kannada-script (Forked from Bhai-lang)<br><br>
  <b>Kannada Script is a toy programming language written in Typescript.</b>
</p>
<br>

<h2 align="center">Installation</h2>

```
npm i -g kannadascript
```

<h2 align="center">Usage</h2>

<h4 align="left">Create a new file (<code>test.kans</code>)</h4>

<h4 align="left">Edit the file with a text editor.
You can also try out your code on <a href="https://kannadascript.js.org/#playground">Kannada Script PlayGround</a></h4>

```
namaskara
  helu "Hello anna";
matte sigona

```

<h4 align="left">Run</h4>

```
kannadascript test.kans
```

<h4 align="left">Output</h4>

```
hello anna
```

<h2 align="center">Documentation</h2>

<h3 align="center">General</h3>
<p align="center"><code>namaskara</code> is the entrypoint for the program and all program must end with <code>matte sigona</code>. Anything outside of it will be ignored.</p>

```

This will be ignored

namaskara
// Write code here
matte sigona

This too
```

<h3 align="center">Variables</h3>
<p align="center">Variables can be declared using <code>idu</code>.</p>

```

namaskara
  idu a = 10;
  idu b = "two";
  idu c = 15;
  a = a + 1;
  b = 21;
  c *= 2;
matte sigona
```

<h3 align="center">Types</h3>
<p align="center">Numbers and strings are like other languages. Null values can be denoted using <code>khali</code>. <code>sari</code> and <code>thappu</code> are the boolean values.</p>

```

namaskara
  idu a = 10;
  idu b = 10 + (15*20);
  idu c = "two";
  idu d = 'ok';
  idu e = khali;
  idu f = sari;
  idu g = thappu;
matte sigona
```

<h3 align="center">Built-ins</h3>
<p align="center">Use <code>helu</code> to print anything to console.</p>

```

namaskara
  helu "Hello World";
  idu a = 10;
  {
    idu b = 20;
    helu a + b;
  }
  helu 5, 'ok', khali , sari , thappu;
matte sigona
```

<h3 align="center">Conditionals</h3>
<p align="center">kannadascript supports if-else-if ladder construct , <code>enadru</code> block will execute if condition is <code>sari</code>, otherwise one of the subsequently added <code>illa andre</code> blocks will execute if their respective condition is <code>sari</code>, and the <code>enu illa andre</code> block will eventually execute if all of the above conditions are <code>thappu</code>

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
<p align="center">Statements inside <code>ellivargu</code> blocks are executed as long as a specified condition evaluates to sari. If the condition becomes <code>thappu</code>, statement within the loop stops executing and control passes to the statement following the loop. Use <code>saaku nilsu</code> to break the loop and <code className="language-cpp">munde nodu</code> to continue within loop.</p>

```

namaskara
  idu a = 0;
  ellivargu (a < 10) {
   a += 1;
   enadru (a == 5) {
    helu "andar se helu ", a;
    munde nodu;
   }
   enadru (a == 6) {
    saaku nilsu;
   }
   helu a;
  }
  helu "done";
matte sigona
```

<h2 align="center">Development</h2>
<p align="center">You can explore abstract syntax tree(AST) of kannadascript <a href="https://kannadascript-ast.netlify.app/" target="_blank">here</a>.</p>
