import { RuntimeException } from "../../src";
import nallaPointerException from "../../src/exceptions/nallaPointerException";

export const NegativeTestCases = [
  {
    name: "interpreter assigning variable before declaration test, should throw an exception",
    input: `
          namaskara;
          a = 4;
          matte sigona;
        `,
    exception: RuntimeException,
  },
  {
    name: "interpreter assigning variable before declaration test with addition, should throw an exception",
    input: `
          namaskara;
          a += 4;
          matte sigona;
        `,
    exception: RuntimeException,
  },
  {
    name: "interpreter assigning variable before declaration test with subtraction, should throw an exception",
    input: `
          namaskara;
          a -= 4;
          matte sigona;
        `,
    exception: RuntimeException,
  },
  {
    name: "interpreter assigning variable before declaration test with multiplication, should throw an exception",
    input: `
          namaskara;
          a -= 4;
          matte sigona;
        `,
    exception: RuntimeException,
  },
  {
    name: "interpreter assigning variable before declaration test with division, should throw an exception",
    input: `
          namaskara;
          a /= 4;
          matte sigona;
        `,
    exception: RuntimeException,
  },
  {
    name: "interpreter assigning variable before declaration test - 2, should throw an exception",
    input: `
          namaskara;
          a;
          matte sigona;
        `,
    exception: RuntimeException,
  },
  {
    name: "interpreter adding two variables before declaration test, should throw an exception",
    input: `
          namaskara;
          a + b;
          matte sigona;
        `,
    exception: RuntimeException,
  },
  {
    name: "interpreter adding variable with constant before declaration test, should throw an exception",
    input: `
          namaskara;
          a + 4;
          matte sigona;
        `,
    exception: RuntimeException,
  },
  {
    name: "interpreter subtracting variable with constant before declaration test, should throw an exception",
    input: `
          namaskara;
          a - 4;
          matte sigona;
        `,
    exception: RuntimeException,
  },
  {
    name: "interpreter subtracting two variables before declaration test, should throw an exception",
    input: `
          namaskara;
          a - b;
          matte sigona;
        `,
    exception: RuntimeException,
  },
  {
    name: "interpreter multiplying variable with constant before declaration test, should throw an exception",
    input: `
          namaskara;
          a * 4;
          matte sigona;
        `,
    exception: RuntimeException,
  },
  {
    name: "interpreter multiplying two variables before declaration test, should throw an exception",
    input: `
          namaskara;
          a * b;
          matte sigona;
        `,
    exception: RuntimeException,
  },
  {
    name: "interpreter dividing variable with constant before declaration test, should throw an exception",
    input: `
          namaskara;
          a / 4;
          matte sigona;
        `,
    exception: RuntimeException,
  },
  {
    name: "interpreter dividing two variables before declaration test, should throw an exception",
    input: `
          namaskara;
          a / b;
          matte sigona;
        `,
    exception: RuntimeException,
  },
  {
    name: "interpreter printing variable before declaration test, should throw an exception",
    input: `
          namaskara;
          helu a;
          matte sigona;
        `,
    exception: RuntimeException,
  },
  {
    name: "interpreter printing multiple variables before declaration test, should throw an exception",
    input: `
          namaskara;
          helu a, b;
          matte sigona;
        `,
    exception: RuntimeException,
  },
  {
    name: "interpreter printing multiple variables with only one of them declared, should throw an exception",
    input: `
          namaskara;
          idu a = 8;
          helu a, b;
          matte sigona;
        `,
    exception: RuntimeException,
  },
  {
    name: "interpreter declaring multiple variables with chain assignment, should throw an exception",
    input: `
          namaskara;
          idu a = b = 8;
          matte sigona;
        `,
    exception: RuntimeException,
  },
  {
    name: "interpreter re declare already declared variable, should throw an exception",
    input: `
        namaskara;
        idu a;
        a = 9;
        idu a = 0;
        matte sigona;
      `,
    exception: RuntimeException,
  },
  // cases with khali
  {
    name: "interpreter use khali variable in expression, should throw an exception",
    input: `
      namaskara;
      idu a;
      helu a + 9;
      matte sigona;
    `,
    exception: nallaPointerException,
  },
  {
    name: "interpreter use khali variable in expression - 2, should throw an exception",
    input: `
      namaskara;
      idu a = khali;
      helu a + 9;
      matte sigona;
    `,
    exception: nallaPointerException,
  },
  {
    name: "interpreter use khali in variable initialisation expression, should throw an exception",
    input: `
      namaskara;
      idu a = khali + 80;
      matte sigona;
    `,
    exception: nallaPointerException,
  },
  {
    name: "interpreter use khali in variable initialisation expression - 2, should throw an exception",
    input: `
      namaskara;
      idu a = khali + "jam";
      matte sigona;
    `,
    exception: nallaPointerException,
  },
  {
    name: "interpreter use khali variable in another variable initialisation expression, should throw an exception",
    input: `
      namaskara;
      idu a;
      idu b = a + "hello";
      matte sigona;
    `,
    exception: nallaPointerException,
  },
  {
    name: "interpreter use khali variable in complex expression, should throw an exception",
    input: `
      namaskara;
      idu a;
      idu b = ((a*9) * a + "hello");
      matte sigona;
    `,
    exception: nallaPointerException,
  },
  // sari - thappu case
  {
    name: "interpreter use sari variable in expression, should throw an exception",
    input: `
      namaskara;
      idu a = sari;
      helu a + 9;
      matte sigona;
    `,
    exception: RuntimeException,
  },
  {
    name: "interpreter use thappu variable in expression, should throw an exception",
    input: `
      namaskara;
      idu a = thappu;
      helu a + 9;
      matte sigona;
    `,
    exception: RuntimeException,
  },
  {
    name: "interpreter use sari in variable initialisation expression, should throw an exception",
    input: `
      namaskara;
      idu a = sari + 80;
      matte sigona;
    `,
    exception: RuntimeException,
  },
  {
    name: "interpreter use thappu in variable initialisation expression, should throw an exception",
    input: `
      namaskara;
      idu a = thappu + 80;
      matte sigona;
    `,
    exception: RuntimeException,
  },
  {
    name: "interpreter use sari variable in another variable initialisation expression, should throw an exception",
    input: `
      namaskara;
      idu a = sari;
      idu b = a + "hello";
      matte sigona;
    `,
    exception: RuntimeException,
  },
  {
    name: "interpreter use thappu variable in complex expression, should throw an exception",
    input: `
      namaskara;
      idu a = thappu;
      idu b = ((a*9) * a + "hello");
      matte sigona;
    `,
    exception: RuntimeException,
  },
  // ##########

  {
    name: "complex expression test with one khali operand, should throw an exception",
    input: `
        namaskara
        (khali * (4 + 8 + 10));
        matte sigona
      `,
    output: nallaPointerException,
  },
  {
    name: "complex expression test with one khali operand and one boolean operand, should throw an exception",
    input: `
        namaskara
        (khali * (sari + 8 + 10));
        matte sigona
      `,
    output: RuntimeException,
  },
  {
    name: "complex expression test with one khali operand and one boolean operand - 2, should throw khali pointer exception",
    input: `
        namaskara
        (sari * (khali + 8 + 10));
        matte sigona
      `,
    output: nallaPointerException,
  },
  {
    name: "complex expression test with one khali operand and one boolean operand - 3, should throw khali pointer exception",
    input: `
        namaskara
        (khali + sari);
        matte sigona
      `,
    output: nallaPointerException,
  },
  {
    name: "complex expression test with one boolean operand, should throw an exception",
    input: `
        namaskara
        (sari * (4 + 8 + 10));
        matte sigona
      `,
    output: RuntimeException,
  },
  {
    name: "additive expression test with only boolean operand, should throw an exception",
    input: `
        namaskara
        sari + thappu;
        matte sigona
      `,
    output: RuntimeException,
  },
  {
    name: "additive expression test with only variable boolean operand, should throw an exception",
    input: `
        namaskara
        idu a = sari, b = thappu;
        a + b;
        matte sigona
      `,
    output: RuntimeException,
  },
  {
    name: "multiplicative expression test with only boolean operand, should throw an exception",
    input: `
        namaskara
        sari * thappu;
        matte sigona
      `,
    output: RuntimeException,
  },
  {
    name: "multiplicative expression test with only variable boolean operand, should throw an exception",
    input: `
        namaskara
        idu a = sari, b = thappu;
        a * b;
        matte sigona
      `,
    output: RuntimeException,
  },
  {
    name: "division expression test with only boolean operand, should throw an exception",
    input: `
        namaskara
        sari / thappu;
        matte sigona
      `,
    output: RuntimeException,
  },
  {
    name: "division expression test with only variable boolean operand, should throw an exception",
    input: `
        namaskara
        idu a = sari, b = thappu;
        a / b;
        matte sigona
      `,
    output: RuntimeException,
  },
  {
    name: "print statement test with expression containing khali, should throw an exception",
    input: `
        namaskara
        helu khali + 5;
        matte sigona;
      `,
    output: nallaPointerException,
  },
  {
    name: "complex assign test with expression containing khali, should throw an exception",
    input: `
        namaskara
        idu a;
        a *= 5;
        matte sigona;
      `,
    output: nallaPointerException,
  },
  {
    name: "complex assign test with expression containing sari, should throw an exception",
    input: `
        namaskara
        idu a = sari;
        a *= 5;
        matte sigona;
      `,
    output: nallaPointerException,
  },
  {
    name: "complex assign test with expression containing khali - 2, should throw an exception",
    input: `
        namaskara
        idu a = khali;
        a /= 5;
        matte sigona;
      `,
    output: nallaPointerException,
  },
  // while loop negative tests
  {
    name: "infinite while loop, should throw an exception",
    input: `
        namaskara
        ellivargu (sari) {

        }
        matte sigona;
      `,
    output: RuntimeException,
  },
  {
    name: "infinite condition while loop, should throw an exception",
    input: `
        namaskara
        idu a = 0;
        ellivargu (a < 2) {
          helu "anna";
        }
        matte sigona;
      `,
    output: RuntimeException,
  },
  {
    name: "invalid use of break, should throw an exception",
    input: `
        namaskara
        idu a = 0;
        enadru (sari)
          saaku nilsu;
        matte sigona;
      `,
    output: RuntimeException,
  },
  // logical expression negative tests
  {
    name: "use of khali with &&, should throw an exception",
    input: `
        namaskara
        helu khali && 90;
        matte sigona;
      `,
    output: nallaPointerException,
  },
  {
    name: "use of khali variable with &&, should throw an exception",
    input: `
        namaskara
        idu a;
        helu a && 90;
        matte sigona;
      `,
    output: nallaPointerException,
  },
  // modulus operator test
  {
    name: `modulus operator test with invalid operand, should throw an exception`,
    input: `
      namaskara;
      helu "sari" % 9;
      matte sigona;
    `,
    output: RuntimeException,
  },
  // continue in loop test
  {
    name: "infinite condition while loop with continue, should throw an exception",
    input: `
        namaskara
        idu a = 0;
        ellivargu (a < 2) {
          munde nodu;
          a = 5;
        }
        matte sigona;
      `,
    output: RuntimeException,
  },
  {
    name: "invalid use of continue, should throw an exception",
    input: `
        namaskara
        idu a = 0;
        enadru (sari)
          munde nodu
        matte sigona;
      `,
    output: RuntimeException,
  },
];
