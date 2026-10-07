import { RuntimeException } from "../../src";
import nallaPointerException from "../../src/exceptions/nallaPointerException";
import InterpreterModule from "../../src/module/interpreterModule";
import { InterpreterOptions } from "../../src/module/interpreterModule";

const interpreter = InterpreterModule.getInterpreter();

/** Runs the body inside namaskara/matte sigona and returns printed lines. */
const run = (body: string, options: InterpreterOptions = {}) => {
  const output: string[] = [];
  interpreter.interpret(`namaskara\n${body}\nmatte sigona`, {
    print: (line) => output.push(line),
    ...options,
  });
  return output;
};

describe("values & printing", () => {
  test("booleans keep their type when copied (regression)", () => {
    expect(run(`idu a = sari; idu b = a; helu b == sari, b;`)).toEqual([
      "sari sari",
    ]);
  });

  test("boolean assignment keeps its type (regression)", () => {
    expect(run(`idu a = 1; a = thappu; helu a == thappu;`)).toEqual(["sari"]);
  });

  test("khali copies", () => {
    expect(run(`idu a; idu b = a; helu b, b == khali;`)).toEqual([
      "khali sari",
    ]);
  });

  test("floating point noise is hidden", () => {
    expect(run(`helu 0.1 + 0.2;`)).toEqual(["0.3"]);
  });

  test("arrays and functions are printable", () => {
    expect(
      run(`kelasa f() {} helu [1, "a", [sari, khali]], f, uddha;`)
    ).toEqual(['[1, "a", [sari, khali]] <kelasa f> <kelasa uddha>']);
  });

  test("print goes to console.log by default", () => {
    const log = jest.spyOn(console, "log").mockImplementation(() => {});
    interpreter.interpret(`namaskara helu "hi"; matte sigona`);
    expect(log).toHaveBeenCalledWith("hi");
    log.mockRestore();
  });
});

describe("operators", () => {
  test("subtraction without spaces (regression)", () => {
    expect(run(`idu a = 5; helu a-1, a -1, 10-a-1;`)).toEqual(["4 4 4"]);
  });

  test("unary minus and not", () => {
    expect(run(`idu a = 3; helu -a, - -a, !sari, alla thappu, !0;`)).toEqual([
      "-3 3 thappu sari sari",
    ]);
  });

  test("mattu / athava short circuit", () => {
    expect(
      run(`
        kelasa boom() { helu "boom"; kodu sari; }
        helu thappu mattu boom();
        helu sari athava boom();
        helu sari mattu 5;
      `)
    ).toEqual(["thappu", "sari", "5"]);
  });

  test("conditions use truthiness", () => {
    expect(
      run(`
        enadru (1) { helu "1 is sari"; }
        enadru ("") { helu "never"; } enu illa andre { helu "empty is thappu"; }
        enadru (khali) { helu "never"; }
        enadru ([]) { helu "arrays are sari"; }
      `)
    ).toEqual(["1 is sari", "empty is thappu", "arrays are sari"]);
  });

  test("modulo by zero", () => {
    expect(() => run(`helu 5 % 0;`)).toThrow(RuntimeException);
  });

  test("unary minus on string", () => {
    expect(() => run(`helu -"a";`)).toThrow(RuntimeException);
  });

  test("unary minus on khali", () => {
    expect(() => run(`helu -khali;`)).toThrow(nallaPointerException);
  });
});

describe("strings", () => {
  test("escapes", () => {
    expect(run(String.raw`helu "a\tb", "say \"hi\"";`)).toEqual([
      'a\tb say "hi"',
    ]);
  });

  test("indexing", () => {
    expect(run(`idu s = "kannada"; helu s[0], s[uddha(s) - 1];`)).toEqual([
      "k a",
    ]);
  });

  test("strings are immutable", () => {
    expect(() => run(`idu s = "abc"; s[0] = "x";`)).toThrow(RuntimeException);
  });
});

describe("loops", () => {
  test("prathi loop", () => {
    expect(
      run(`prathi (idu i = 0; i < 3; i += 1) { helu i; }`)
    ).toEqual(["0", "1", "2"]);
  });

  test("prathi loop variable is scoped to the loop", () => {
    expect(() =>
      run(`prathi (idu i = 0; i < 1; i += 1) {} helu i;`)
    ).toThrow(RuntimeException);
  });

  test("munde nodu in prathi still runs the update", () => {
    expect(
      run(`
        prathi (idu i = 0; i < 5; i += 1) {
          enadru (i % 2 == 0) { munde nodu; }
          helu i;
        }`)
    ).toEqual(["1", "3"]);
  });

  test("saaku nilsu in nested blocks", () => {
    expect(
      run(`
        idu i = 0;
        ellivargu (sari) {
          i += 1;
          { { enadru (i == 3) { saaku nilsu; } } }
        }
        helu i;`)
    ).toEqual(["3"]);
  });

  test("munde nodu as the last statement of an if (regression)", () => {
    expect(
      run(`
        idu a = 0;
        ellivargu (a < 4) {
          a += 1;
          enadru (a == 2) { helu "skip"; munde nodu; }
          helu a;
        }`)
    ).toEqual(["1", "skip", "3", "4"]);
  });

  test("break only affects the innermost loop", () => {
    expect(
      run(`
        prathi (idu i = 0; i < 2; i += 1) {
          prathi (;;) { saaku nilsu; }
          helu i;
        }`)
    ).toEqual(["0", "1"]);
  });

  test("infinite prathi loop is stopped", () => {
    expect(() => run(`prathi (;;) {}`, { maxSteps: 100 })).toThrow(
      RuntimeException
    );
  });
});

describe("functions", () => {
  test("declare, call and return", () => {
    expect(
      run(`
        kelasa jodisu(a, b) { kodu a + b; }
        helu jodisu(2, 3);`)
    ).toEqual(["5"]);
  });

  test("no return gives khali", () => {
    expect(run(`kelasa f() { idu x = 1; } helu f();`)).toEqual(["khali"]);
  });

  test("recursion", () => {
    expect(
      run(`
        kelasa factorial(n) {
          enadru (n <= 1) { kodu 1; }
          kodu n * factorial(n - 1);
        }
        helu factorial(10);`)
    ).toEqual(["3628800"]);
  });

  test("return from inside a loop", () => {
    expect(
      run(`
        kelasa first(list, target) {
          prathi (idu i = 0; i < uddha(list); i += 1) {
            enadru (list[i] == target) { kodu i; }
          }
          kodu -1;
        }
        helu first([5, 6, 7], 6), first([5], 9);`)
    ).toEqual(["1 -1"]);
  });

  test("closures capture their scope", () => {
    expect(
      run(`
        kelasa counter() {
          idu count = 0;
          kelasa next() { count += 1; kodu count; }
          kodu next;
        }
        idu c = counter();
        c(); c();
        helu c();`)
    ).toEqual(["3"]);
  });

  test("functions are values", () => {
    expect(
      run(`
        kelasa twice(f, x) { kodu f(f(x)); }
        kelasa double(x) { kodu x * 2; }
        helu twice(double, 3);`)
    ).toEqual(["12"]);
  });

  test("scope is restored after a call", () => {
    expect(
      run(`
        idu x = "global";
        kelasa f() { idu x = "local"; kodu x; }
        helu f(), x;`)
    ).toEqual(["local global"]);
  });

  test("wrong number of arguments", () => {
    expect(() => run(`kelasa f(a) {} f();`)).toThrow(/Expected 1 argument/);
  });

  test("calling a non function", () => {
    expect(() => run(`idu a = 5; a();`)).toThrow(/is not a function/);
  });

  test("kodu outside a function", () => {
    expect(() => run(`kodu 5;`)).toThrow(RuntimeException);
  });

  test("saaku nilsu inside a function doesn't break the caller's loop", () => {
    expect(() =>
      run(`
        kelasa f() { saaku nilsu; }
        ellivargu (sari) { f(); }`)
    ).toThrow(RuntimeException);
  });

  test("infinite recursion is stopped", () => {
    expect(() =>
      run(`kelasa f(n) { kodu f(n + 1); } f(0);`)
    ).toThrow(/recursion/);
  });

  test("interpreter keeps working after an error inside a function", () => {
    expect(() =>
      run(`kelasa f() { prathi (;;) { kodu nodu; } } f();`)
    ).toThrow(RuntimeException);
    expect(run(`idu nodu = 1; helu nodu;`)).toEqual(["1"]);
  });
});

describe("arrays", () => {
  test("index read and write", () => {
    expect(
      run(`
        idu a = [1, 2, 3];
        a[0] = 10;
        a[1] += 5;
        helu a, a[2];`)
    ).toEqual(["[10, 7, 3] 3"]);
  });

  test("nested arrays", () => {
    expect(run(`idu m = [[1, 2], [3, 4]]; m[1][0] = 9; helu m;`)).toEqual([
      "[[1, 2], [9, 4]]",
    ]);
  });

  test("index out of range", () => {
    expect(() => run(`idu a = [1]; helu a[1];`)).toThrow(/out of range/);
    expect(() => run(`idu a = [1]; helu a[-1];`)).toThrow(/out of range/);
  });

  test("index must be an integer", () => {
    expect(() => run(`idu a = [1]; helu a[0.5];`)).toThrow(RuntimeException);
    expect(() => run(`idu a = [1]; helu a["0"];`)).toThrow(RuntimeException);
  });

  test("indexing a number", () => {
    expect(() => run(`idu a = 1; helu a[0];`)).toThrow(RuntimeException);
  });
});

describe("built-ins", () => {
  test("uddha, serisu, tegi", () => {
    expect(
      run(`
        idu a = [];
        serisu(a, 1);
        helu serisu(a, 2), uddha(a), tegi(a), a, uddha("ಕನ್ನಡ") > 0, tegi([]);`)
    ).toEqual(["2 2 2 [1] sari khali"]);
  });

  test("sankhye, pada, poorna", () => {
    expect(
      run(`helu sankhye(" 42 ") + 1, pada(4) + 2, poorna(7 / 2), poorna(-0.5);`)
    ).toEqual(["43 42 3 -1"]);
  });

  test("sankhye rejects non numbers", () => {
    expect(() => run(`sankhye("abc");`)).toThrow(RuntimeException);
    expect(() => run(`sankhye("");`)).toThrow(RuntimeException);
  });

  test("kannada names for built-ins", () => {
    expect(run(`helu ಉದ್ದ([1, 2]);`)).toEqual(["2"]);
  });

  test("built-ins can be shadowed", () => {
    expect(run(`idu uddha = 3; helu uddha;`)).toEqual(["3"]);
  });

  test("kelu reads input", () => {
    const lines = ["Chandan", "5"];
    const prompts: (string | undefined)[] = [];
    expect(
      run(
        `
        idu name = kelu("Hesaru? ");
        idu n = sankhye(kelu());
        helu "Namaskara " + name, n * 2, kelu();`,
        {
          input: (prompt) => {
            prompts.push(prompt);
            return lines.shift() ?? null;
          },
        }
      )
    ).toEqual(["Namaskara Chandan 10 khali"]);
    expect(prompts).toEqual(["Hesaru? ", undefined, undefined]);
  });

  test("kelu without an input provider", () => {
    expect(() => run(`kelu();`)).toThrow(RuntimeException);
  });

  test("wrong arity for built-ins", () => {
    expect(() => run(`uddha();`)).toThrow(RuntimeException);
    expect(() => run(`kelu(1, 2);`)).toThrow(RuntimeException);
  });
});

describe("kannada script", () => {
  test("a full program in Kannada script", () => {
    expect(
      interpreterRun(`
        ನಮಸ್ಕಾರ
          ಇದು ಹೆಸರು = "ಕನ್ನಡ";
          ಕೆಲಸ ಹಲೋ(ಯಾರು) {
            ಕೊಡು "ನಮಸ್ಕಾರ " + ಯಾರು;
          }
          ಪ್ರತಿ (ಇದು i = ೧; i <= ೨; i += ೧) {
            ಹೇಳು ಹಲೋ(ಹೆಸರು), i;
          }
          ಏನಾದ್ರು (ಸರಿ ಮತ್ತು ಅಲ್ಲ ತಪ್ಪು) { ಹೇಳು ಸರಿ; }
        ಮತ್ತೆ ಸಿಗೋಣ
      `)
    ).toEqual(["ನಮಸ್ಕಾರ ಕನ್ನಡ 1", "ನಮಸ್ಕಾರ ಕನ್ನಡ 2", "sari"]);
  });
});

function interpreterRun(code: string) {
  const output: string[] = [];
  interpreter.interpret(code, { print: (line) => output.push(line) });
  return output;
}
