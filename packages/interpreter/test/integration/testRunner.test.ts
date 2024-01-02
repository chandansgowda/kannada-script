import { RuntimeException } from "../../src";
import Interpreter from "../../src/components/interpreter";
import InterpreterModule from "../../src/module/interpreterModule";

import { NegativeTestCases } from "./negativeTestsProvider";
import {
  NoOutputPositiveTests,
  WithOutputPositiveTests
} from "./positiveTestsProvider";


let interpreter: Interpreter = InterpreterModule.getInterpreter();

console.log = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

NoOutputPositiveTests.forEach((testCase) => {
  test(testCase.name, () => {
    expect(() => interpreter.interpret(testCase.input)).not.toThrowError();
  });
});

WithOutputPositiveTests.forEach((testCase) => {
  test(testCase.name, () => {
    expect(() => interpreter.interpret(testCase.input)).not.toThrowError();

    expect(console.log).toHaveBeenCalledWith(testCase.output);
  });
});

NegativeTestCases.forEach((testCase) => {
  test(testCase.name, () => {
    expect(() => interpreter.interpret(testCase.input)).toThrowError(
      testCase.exception
    );
  });
});

test("test redeclaring & printing variables in different scopes", () => {
  expect(() =>
    interpreter.interpret(`namaskara;
    idu a = 4;
    {
      idu a = 90;
      helu a;
    }
    helu a;
    matte sigona;`)
  ).not.toThrowError();
  expect(console.log).toHaveBeenCalledWith("90");
  expect(console.log).toHaveBeenCalledWith("4");
});

test("test assigning variable in parent scope", () => {
  expect(() =>
    interpreter.interpret(`namaskara;
    idu a = 4;
    {
      a = 90;
      helu a;
    }
    helu a;
    matte sigona;`)
  ).not.toThrowError();
  expect(console.log).toHaveBeenCalledWith("90");
  expect(console.log).toHaveBeenCalledWith("90");
});

test("test accessing variable in parent scope", () => {
  expect(() =>
    interpreter.interpret(`namaskara;
    idu a = 4;
    {
      helu a;
    }
    helu a;
    matte sigona;`)
  ).not.toThrowError();
  expect(console.log).toHaveBeenCalledWith("4");
  expect(console.log).toHaveBeenCalledWith("4");
});

test("whileStatement test with 2 times loop, should success", () => {
  expect(() =>
    interpreter.interpret(`
    namaskara;
    idu a = 0;
    ellivargu (a < 2) {
      helu "anna";
      a += 1;
    }
    matte sigona;`)
  ).not.toThrowError();
  expect(console.log).toHaveBeenCalledWith("anna");
  expect(console.log).toHaveBeenCalledWith("anna");
});

test("whileStatement test with nested loops - 2, should success", () => {
  expect(() =>
    interpreter.interpret(`
    namaskara;
    idu a = 0, b = 0;
    ellivargu (a < 2) {
      ellivargu (b < 1) {
        helu "anna";
        b += 1;
      }
      a += 1;
    }
    matte sigona;
    `)
  ).not.toThrowError();
  expect(console.log).toHaveBeenCalledWith("anna");
});

test("whileStatement test with nested loops - 3, should success", () => {
  expect(() =>
    interpreter.interpret(`
    namaskara;
    idu a = 0;
    ellivargu (a < 2) {
      idu b = 0;
      ellivargu (b < 2) {
        helu "anna";
        b += 1;
        enadru (b == 1)
          saaku nilsu;
      }
      a += 1;
    }
    matte sigona;
    `)
  ).not.toThrowError();
  expect(console.log).toHaveBeenCalledWith("anna");
  expect(console.log).toHaveBeenCalledWith("anna");
});


test("whileStatement test with nested loops - 4, should success", () => {
  expect(() =>
    interpreter.interpret(`
    namaskara
    idu a = 0;
    ellivargu (a < 10) {
      helu a;
      a += 1;
      enadru (a == 6) {
        saaku nilsu;
      }
    }
    helu "done";
    matte sigona
    `)
  ).not.toThrowError();
  expect(console.log).toHaveBeenCalledWith("0");
  expect(console.log).toHaveBeenCalledWith("1");
  expect(console.log).toHaveBeenCalledWith("2");
  expect(console.log).toHaveBeenCalledWith("3");
  expect(console.log).toHaveBeenCalledWith("4");
  expect(console.log).toHaveBeenCalledWith("5");
});

test("whileStatement test with nested loops - 5, should success", () => {
  expect(() =>
    interpreter.interpret(`
    namaskara
    idu a = 0;
    ellivargu (a < 10) {
      helu a;
      a += 1;
      enadru (a == 6)
        saaku nilsu;
    }
    helu "done";
    matte sigona
    `)
  ).not.toThrowError();
  expect(console.log).toHaveBeenCalledWith("0");
  expect(console.log).toHaveBeenCalledWith("1");
  expect(console.log).toHaveBeenCalledWith("2");
  expect(console.log).toHaveBeenCalledWith("3");
  expect(console.log).toHaveBeenCalledWith("4");
  expect(console.log).toHaveBeenCalledWith("5");
});

test("whileStatement test with nested loops - 6, should success", () => {
  expect(() =>
    interpreter.interpret(`
    namaskara
    idu a = 0;
    ellivargu (a < 10) {
      helu a;
      a += 1;
      enadru (a == 3) {
        saaku nilsu;
      }
      helu "2 baar hi chapunga";
    }
    helu "done";
    matte sigona
    `)
  ).not.toThrowError();
  expect(console.log).toHaveBeenCalledWith("0");
  expect(console.log).toHaveBeenCalledWith("1");
  expect(console.log).toHaveBeenCalledWith("2");
  expect(console.log).toHaveBeenCalledWith("2 baar hi chapunga");
  expect(console.log).toHaveBeenCalledWith("2 baar hi chapunga");
});

test("whileStatement test with infinite loop, should throw runtime exception after 5000 executions", () => {
  expect(() =>
    interpreter.interpret(`
    namaskara

    ellivargu (sari) {
      helu "anna";
    }
    matte sigona;

    `)
  ).toThrowError(RuntimeException);

  expect(console.log).toHaveBeenCalledTimes(5001);
  expect(console.log).toHaveBeenCalledWith("anna");
});

test("if-else ladders one after the other, should be evaluated separately", () => {
  expect(() =>
    interpreter.interpret(`
    namaskara
    idu x = 6;
    enadru (x < 5) {
      helu "x < 5";
    } illa andre (x < 8) {
      helu "x < 8";
    } enadru (x < 4) {
      helu "x < 4";
    } enu illa andre {
      helu "x > 4";
    }
    matte sigona;

    `)
  ).not.toThrowError();

  expect(console.log).toHaveBeenCalledWith("x < 8");
  expect(console.log).toHaveBeenCalledWith("x > 4");
});

// test("jest", () => {
//     interpreter.interpret(`
//     namaskara
//     idu a = 0;
//     ellivargu (a < 10) {
//       helu a;
//       a += 1;
//       enadru (a == 3) {
//         saaku nilsu;
//       }
//       helu "2 baar hi chapunga";
//     }
//     helu "done";
//     matte sigona
//     `);
// });
