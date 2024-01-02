export const NoOutputPositiveTests = [
  // init statement tests
  {
    name: "interpreter empty init statement test, should success",
    input: `
      namaskara
      matte sigona
    `,
  },
  {
    name: "interpreter empty init statement test with random charaters initially, should success",
    input: `
      some random characters
      random random random
      namaskara
      matte sigona
    `,
  },
  // empty statement tests
  {
    name: "interpreter empty statement test, should success",
    input: `
      namaskara
      ;
      matte sigona
    `,
  },
  {
    name: "interpreter multiple empty statements test, should success",
    input: `
      namaskara
      ;
      ;
      ;;
      matte sigona
    `,
  },
  // block statement tests
  {
    name: "interpreter block statement test with empty block, should success",
    input: `
      namaskara
      {};
      matte sigona
    `,
  },
  {
    name: "interpreter block statement test with variable statement inside, should success",
    input: `
      namaskara
      {
        idu a = 4;
      }
      matte sigona
    `,
  },
  // variable statement test
  {
    name: "interpreter variable statement test with basic variable declaration, should success",
    input: `
      namaskara
      idu a, b, c;
      matte sigona
    `,
  },
  {
    name: "interpreter variable statement test with basic variable declaration and initialisation, should success",
    input: `
      namaskara
      idu a = 10, b = "crap";
      matte sigona
    `,
  },
  {
    name: "interpreter variable statement test with multiple variable initialisation, should success",
    input: `
      namaskara
      idu a = 10, b = 5;
      matte sigona
    `,
  },
  {
    name: "interpreter variable statement test with variable initialisation with some expression, should success",
    input: `
      namaskara
      idu a = 7 + 90;
      matte sigona
    `,
  },
  // assignment expression tests
  {
    name: "simple assignment expression test with only one identifer, should success",
    input: `
      namaskara
      idu a = sari;
      a = 4;
      matte sigona
    `,
  },
  {
    name: "complex assignment expression test with only one identifer, should success",
    input: `
      namaskara
      idu a = 2;
      a *= 4;
      matte sigona
    `,
  },
  // paranthesized expression tests
  {
    name: "paranthesized expression test with one parenthesis and simple expression, should success",
    input: `
      namaskara
      idu a = 2;
      (a + 4);
      matte sigona
    `,
  },
  {
    name: "paranthesized expression test with one parenthesis and complex expression, should success",
    input: `
      namaskara
      idu a = 2;
      (a + 4) * 10 + (5 - 4);
      matte sigona
    `,
  },
  {
    name: "paranthesized expression test with multiple parenthesis, should success",
    input: `
      namaskara
      idu a = 2;
      (a * (4 + 8) + 10);
      matte sigona
    `,
  },
  // if statement test
  {
    name: "paranthesized expression test with multiple parenthesis, should success",
    input: `
    namaskara
    idu x = 9;
    enadru (x != 9) {
      x = 5;
      helu x;
    } enu illa andre (x >= 9);
    matte sigona;
    `,
  },
];

export const WithOutputPositiveTests = [
  {
    name: "variable assignment test with multiple variables, should success",
    input: `
      namaskara;
      idu a , b;
      a = b = 60;
      helu a, b;
      matte sigona
    `,
    output: "60 60",
  },
  {
    name: `binaryExpression print test with khali and "==", should success`,
    input: `
      namaskara;
      idu a;
      enadru (a == khali) {
        helu a;
      }
      matte sigona
    `,
    output: "khali",
  },
  {
    name: `binaryExpression print test with khali without any operator, should success`,
    input: `
      namaskara;
      idu a;
      enadru (a) {
        helu a;
      } enu illa andre {
        helu "not khali";
      }
      matte sigona
    `,
    output: "not khali",
  },
  {
    name: `binaryExpression print test - comparing khali with khali "==", should success`,
    input: `
      namaskara;
      enadru (khali == khali) {
        helu "hai khali";
      }
      matte sigona
    `,
    output: "hai khali",
  },
  {
    name: `binaryExpression print test with comparing khali with var "a", should success`,
    input: `
      namaskara;
      idu a;
      enadru (khali == a) {
        helu "hai khali";
      }
      matte sigona
    `,
    output: "hai khali",
  },
  {
    name: `binaryExpression print test with comparing khali with var "a" explicit initialization, should success`,
    input: `
      namaskara;
      idu a = khali;
      enadru (khali == a) {
        helu "hai khali";
      }
      matte sigona
    `,
    output: "hai khali",
  },
  {
    name: `binaryExpression print test with comparing khali with string khali, should success`,
    input: `
      namaskara;
      idu a = khali;
      enadru ("khali" == a) {
        helu "hai khali";
      } enu illa andre {
        helu "not khali";
      }
      matte sigona
    `,
    output: "not khali",
  },
  {
    name: `binaryExpression print test with comparing khali with string khali, should success`,
    input: `
      namaskara;
      idu a = "khali";
      enadru (khali == a) {
        helu "hai khali";
      } enu illa andre {
        helu "not khali";
      }
      matte sigona
    `,
    output: "not khali",
  },
  {
    name: `binaryExpression print test with comparing khali with string null, should success`,
    input: `
      namaskara;
      idu a = "null";
      enadru (khali == a) {
        helu "hai khali";
      } enu illa andre {
        helu "not khali";
      }
      matte sigona
    `,
    output: "not khali",
  },
  {
    name: `binaryExpression print test with khali var "a" & "b" - 0, should success`,
    input: `
      namaskara;
      idu a;
      idu b;
      enadru (a == b) {
        helu "hai khali";
      } enu illa andre {
        helu "nahi khali";
      }
      matte sigona
    `,
    output: "hai khali",
  },
  {
    name: `binaryExpression print test with khali var "a" & "b" - 1, should success`,
    input: `
      namaskara;
      idu a;
      idu b = khali;
      enadru (a == b) {
        helu "hai khali";
      } enu illa andre {
        helu "nahi khali";
      }
      matte sigona
    `,
    output: "hai khali",
  },
  {
    name: `binaryExpression print test with khali var "a" & "b" -2, should success`,
    input: `
      namaskara;
      idu a;
      idu b = "khali";
      enadru (a == b) {
        helu "hai khali";
      } enu illa andre {
        helu "nahi khali";
      }
      matte sigona
    `,
    output: "nahi khali",
  },
  // Boolean test
  {
    name: `binaryExpression print test with boolean expression - sari, should success`,
    input: `
      namaskara;
      idu a = sari;
      enadru (sari == a) {
        helu "hai sari";
      } enu illa andre {
        helu "nahi sari";
      }
      matte sigona
    `,
    output: "hai sari",
  },
  {
    name: `binaryExpression print test with boolean expression - thappu, should success`,
    input: `
      namaskara;
      idu a = thappu;
      enadru (thappu == a) {
        helu "hai thappu";
      } enu illa andre {
        helu "nahi thappu";
      }
      matte sigona
    `,
    output: "hai thappu",
  },
  {
    name: `binaryExpression print test with boolean expression - sari with string sari, should success`,
    input: `
      namaskara;
      idu a = "sari";
      enadru (sari == a) {
        helu "hai sari";
      } enu illa andre {
        helu "nahi sari";
      }
      matte sigona
    `,
    output: "nahi sari",
  },
  {
    name: `binaryExpression print test with boolean expression - sari expression, should success`,
    input: `
      namaskara;
      idu a = 7;
      enadru (sari == (a > 5)) {
        helu "hai sari";
      } enu illa andre {
        helu "nahi sari";
      }
      matte sigona
    `,
    output: "hai sari",
  },
  {
    name: `binaryExpression print test with boolean expression - sari expression & string "sari", should success`,
    input: `
      namaskara;
      idu a = 7;
      enadru ("sari" == (a > 5)) {
        helu "hai sari";
      } enu illa andre {
        helu "nahi sari";
      }
      matte sigona
    `,
    output: "nahi sari",
  },
  {
    name: `binaryExpression print test with boolean expression - sari expression & two expressions, should success`,
    input: `
      namaskara;
      idu a = sari;
      enadru ("sari" == (a == sari)) {
        helu "hai sari";
      } enu illa andre {
        helu "nahi sari";
      }
      matte sigona
    `,
    output: "nahi sari",
  },
  {
    name: `binaryExpression print test with boolean expression - sari expression -3, should success`,
    input: `
      namaskara;
      idu a = sari;
      enadru ((a == sari) == (a == sari)) {
        helu "hai sari";
      } enu illa andre {
        helu "nahi sari";
      }
      matte sigona
    `,
    output: "hai sari",
  },
  {
    name: `binaryExpression print test with boolean expression - sari expression - 4, should success`,
    input: `
      namaskara;
      idu a;
      enadru ((a == khali) == (a == sari)) {
        helu "hai sari";
      } enu illa andre {
        helu "nahi sari";
      }
      matte sigona
    `,
    output: "nahi sari",
  },
  {
    name: `binaryExpression print test with boolean expression - sari expression - 5, should success`,
    input: `
      namaskara;
      idu a;
      enadru ((a == khali) == (a == sari)) {
        helu "hai sari";
      } enu illa andre {
        helu "nahi sari";
      }
      matte sigona
    `,
    output: "nahi sari",
  },
  {
    name: `binaryExpression print test with boolean expression - sari expression - 5, should success`,
    input: `
      namaskara;
      idu a;
      idu b = thappu;
      enadru (a == b) {
        helu "hai sari";
      } enu illa andre {
        helu "nahi sari";
      }
      matte sigona
    `,
    output: "nahi sari",
  },
  {
    name: `binaryExpression print test with boolean expression - thappu variables comparison, should success`,
    input: `
      namaskara;
      idu a = thappu;
      idu b = thappu;
      enadru (a == b) {
        helu "hai thappu";
      } enu illa andre {
        helu "nahi thappu";
      }
      matte sigona
    `,
    output: "hai thappu",
  },
  {
    name: `binaryExpression print test with boolean expression - thappu variables comparison with string thappu, should success`,
    input: `
      namaskara;
      idu a = "thappu";
      idu b = thappu;
      enadru (a == b) {
        helu "hai thappu";
      } enu illa andre {
        helu "nahi thappu";
      }
      matte sigona
    `,
    output: "nahi thappu",
  },
  {
    name: "float value addition with integer value test, should success",
    input: `
      namaskara
      idu a = 1.2, b = 2;
      helu a + b;
      matte sigona
    `,
    output: "3.2"
  },
  {
    name: "float value addition with float value value test, should success",
    input: `
      namaskara
      idu a = 1.2, b = 2.3;
      helu a + b;
      matte sigona
    `,
    output: "3.5"
  },
  {
    name: "printStatement test with multiple expressions, should success",
    input: `
      namaskara;
      idu a = 2, b = 60;
      helu (a * (4 + 8) + 10), b;
      matte sigona
    `,
    output: "34 60",
  },
  {
    name: "printStatement test with multiple expressions and re assigning value of one variable, should success",
    input: `
      namaskara;
      idu a = 2, b = 60;

      a = b + 3;
      helu a, b;
      matte sigona
    `,
    output: "63 60",
  },
  {
    name: "printStatement test with multiple expressions & without any variables, should success",
    input: `
      namaskara;
      helu "hello", sari, thappu;
      matte sigona
    `,
    output: "hello sari thappu",
  },
  {
    name: "printStatement test with khali, should success",
    input: `
      namaskara;
      helu khali;
      matte sigona;
    `,
    output: "khali",
  },
  {
    name: "printStatement test with khali as second parameter, should success",
    input: `
      namaskara;
      helu 10, khali;
      matte sigona;
    `,
    output: "10 khali",
  },
  {
    name: "printStatement test with string concatenation, should success",
    input: `
      namaskara;
      helu "hello" + "crap";
      matte sigona;
    `,
    output: "hellocrap",
  },
  {
    name: "printStatement test with multiple expresions including khali, should success",
    input: `
      namaskara;
      idu a = 70;
      helu 6*5, khali, "jamtara", a;
      matte sigona;
    `,
    output: "30 khali jamtara 70",
  },
  {
    name: "printStatement test with khali variable, should success",
    input: `
      namaskara;
      idu a;
      helu a;
      matte sigona;
    `,
    output: "khali",
  },
  {
    name: `printStatement test with string "undefined", should success`,
    input: `
      namaskara;
      helu "undefined";
      matte sigona;
    `,
    output: "undefined",
  },
  {
    name: `printStatement test with khali variable, should success`,
    input: `
      namaskara;
      idu a;
      helu a;
      matte sigona;
    `,
    output: "khali",
  },
  {
    name: `printStatement test with sari variable, should success`,
    input: `
      namaskara;
      idu a = sari;
      helu a;
      matte sigona;
    `,
    output: "sari",
  },
  {
    name: `printStatement test with thappu variable, should success`,
    input: `
      namaskara;
      idu a = thappu;
      helu a;
      matte sigona;
    `,
    output: "thappu",
  },
  {
    name: `printStatement test with assignment expression, should success`,
    input: `
      namaskara;
      idu a;
      helu a = 90;
      matte sigona;
    `,
    output: "90",
  },
  {
    name: `printStatement test with logical AND, should success`,
    input: `
      namaskara;
      helu 9 && 10;
      matte sigona;
    `,
    output: "10",
  },
  {
    name: `printStatement test with logical OR, should success`,
    input: `
      namaskara;
      helu 9 || 10;
      matte sigona;
    `,
    output: "9",
  },
  {
    name: `printStatement test with logical - 1, should success`,
    input: `
      namaskara;
      helu thappu && sari;
      matte sigona;
    `,
    output: "thappu",
  },
  {
    name: `printStatement test with logical - 2, should success`,
    input: `
    namaskara;
    idu a = sari;
    helu a && thappu;
    matte sigona;
    `,
    output: "thappu",
  },
  {
    name: `printStatement test with logical - 3, should success`,
    input: `
    namaskara;
    idu a = sari;
    helu a && sari;
    matte sigona;
    `,
    output: "sari",
  },
  {
    name: `printStatement test with equality, should success`,
    input: `
      namaskara;
      helu 9 == 10;
      matte sigona;
    `,
    output: "thappu",
  },
  {
    name: `printStatement test with inequality, should success`,
    input: `
      namaskara;
      helu 9 != 10;
      matte sigona;
    `,
    output: "sari",
  },
  {
    name: `printStatement test with logical OR, should success`,
    input: `
      namaskara;
      helu 9 || 10;
      matte sigona;
    `,
    output: "9",
  },
  {
    name: `printStatement test with logical OR - 2, should success`,
    input: `
      namaskara;
      helu thappu || sari;
      matte sigona;
    `,
    output: "sari",
  },
  {
    name: `printStatement test with boolean sari thappu and logical, should success`,
    input: `
      namaskara;
      helu sari != 10;
      matte sigona;
    `,
    output: "sari",
  },
  {
    name: `printStatement test with boolean sari and string "sari", should success`,
    input: `
      namaskara;
      helu "sari" == sari;
      matte sigona;
    `,
    output: "thappu",
  },
  // while statement / loop tests
  {
    name: `whileStatement test with 1 time loop, should success`,
    input: `
      namaskara;
      idu a = 0;
      ellivargu (a < 1) {
        helu "anna";
        a += 1;
      }
      matte sigona;
    `,
    output: "anna",
  },
  {
    name: `whileStatement test with single break statement, should success`,
    input: `
      namaskara;
      ellivargu (sari)
        saaku nilsu;
      helu "end";
      matte sigona;
    `,
    output: "end",
  },
  {
    name: `whileStatement test with nested loops, should success`,
    input: `
      namaskara;
      idu a = 0;
      ellivargu (a < 2) {
        ellivargu (sari)
          saaku nilsu;
        helu "hello";
        enadru (sari)
          saaku nilsu;
      }
      matte sigona;
    `,
    output: "hello",
  },
  {
    name: `whileStatement with multiple breaks, should success`,
    input: `
      namaskara;
      idu a = 0;
      ellivargu (a < 2) {
        helu "hello";
        enadru (sari)
          saaku nilsu;
        saaku nilsu;
        saaku nilsu;
      }
      matte sigona;
    `,
    output: "hello",
  },
  // if statement tests
  {
    name: `if statement success test - 1: only if, should success`,
    input: `
    namaskara
    enadru (sari) {
      helu "anna";
    }
    matte sigona;
    `,
    output: "anna",
  },
  {
    name: `if statement success test - 2: if else both, should success`,
    input: `
    namaskara
    enadru (sari) {
      helu "sari";
    } enu illa andre {
      helu "thappu";
    }
    matte sigona;
    `,
    output: "sari",
  },
  {
    name: `if statement success test - 3: if only with comarison condn, should success`,
    input: `
    namaskara
    idu x = 9;
    enadru (x >= 9) {
      x = 5;
      helu x;
    }
    matte sigona;
    `,
    output: "5",
  },
  // else-if statement tests
  {
    name: `else-if statement success test - 1: if with one else-if, should success`,
    input: `
    namaskara
    enadru (thappu) {
      helu "thappu";
    } illa andre (sari) {
      helu "sari";
    }
    matte sigona;
    `,
    output: "sari",
  },
  {
    name: `else-if statement success test - 2: if with multiple else-ifs, should success`,
    input: `
    namaskara
    idu x = 10;
    enadru (x < 5) {
      helu "x < 5";
    } illa andre (x < 8) {
      helu "x < 8";
    } illa andre (x < 12) {
      helu "x < 12";
    } illa andre (x < 15) {
      helu "x < 15";
    }
    matte sigona;
    `,
    output: "x < 12",
  },
  {
    name: `else-if statement success test - 3: nested if-else-if ladder, should success`,
    input: `
    namaskara
    idu a = 15;
    enadru (a < 0) {
      helu "a < 0";
    } illa andre (a > 0) {
      enadru (a < 10) {
        helu "a < 10";
      } illa andre (a < 20) {
        helu "a < 20";
      }
    }
    matte sigona
    `,
    output: "a < 20",
  },
  {
    name: `else-if statement success test - 4: if-else-if ladder evaluating to else, should success`,
    input: `
    namaskara
    idu x = 15;
    enadru (x < 5) {
      helu "x < 5";
    } illa andre (x < 8) {
      helu "x < 8";
    } illa andre (x < 12) {
      helu "x < 12";
    } enu illa andre {
      helu "x > 12";
    }
    matte sigona;
    `,
    output: "x > 12",
  },
  // logical expression test
  {
    name: `logical "&&" test with sari thappu, should success`,
    input: `
        namaskara
        enadru (sari && thappu) {
          helu "sari";
        } enu illa andre {
          helu "thappu";
        }
        matte sigona;
      `,
    output: `thappu`,
  },
  // modulus operator test
  {
    name: `modulus operator "%" test, should success`,
    input: `
        namaskara
        helu 90 % 9;
        matte sigona;
      `,
    output: `0`,
  },
  {
    name: `modulus operator "%" test - 2, should success`,
    input: `
        namaskara
        helu 27 % 5;
        matte sigona;
      `,
    output: `2`,
  },
  {
    name: `modulus operator "%" test - 2, should success`,
    input: `
        namaskara
        helu 5 % 20;
        matte sigona;
      `,
    output: `5`,
  },
  {
    name: `whileStatement test with single continue statement, should success`,
    input: `
      namaskara;
      idu a = 5;
      idu step = 0;
      ellivargu (a > 0) {
        step += 1;
        enadru (a % 2 != 0){
          a -= 2;
          munde nodu;
        }
        a -= 1;
      }
      helu step;
      matte sigona;
    `,
    output: "3",
  },
  {
    name: `whileStatement test with multiple continue statement, should success`,
    input: `
      namaskara;
      idu a = 5;
      idu step = 0;
      ellivargu (a > 0) {
        step += 1;
        enadru (a % 2 == 0){
          a -= 2;
          munde nodu;
        }
        a -= 1;
        munde nodu;
        helu "oye oye oye.. yha tk nhi aana tha anna";
      }
      helu step;
      matte sigona;
    `,
    output: "3",
  },
  {
    // step:  1 => 2
    // a: 10 => 7 => 6 => 3 => 2 => -1
    name: `whileStatement test with single continue statement without block, should success`,
    input: `
      namaskara;
      idu a = 10;
      idu step = 0;
      ellivargu (a > 0) {
        enadru (a % 2 == 0){
          a -= 3;
          munde nodu;
        }
        a -= 1;
        enadru (step == 1) munde nodu
        step += 1;
      }
      helu step;
      matte sigona;
    `,
    output: "1",
  },
];