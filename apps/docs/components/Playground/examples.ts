export type Example = {
  id: string;
  title: string;
  kannadaTitle: string;
  description: string;
  code: string;
  /** answers for kelu(), one per line */
  input?: string;
};

export const EXAMPLES: Example[] = [
  {
    id: "namaskara",
    title: "Namaskara Jagattu",
    kannadaTitle: "ನಮಸ್ಕಾರ ಜಗತ್ತು",
    description: "Hello world, variables and a loop",
    code: `namaskara
  helu "Namaskara Jagattu! 🙏";

  idu bhashe = "Kannada";
  idu varsha = 2000;
  helu bhashe, "is more than", varsha, "years old";

  idu i = 1;
  ellivargu (i <= 3) {
    helu "Jai Karnataka", i;
    i += 1;
  }
matte sigona
`,
  },
  {
    id: "conditions",
    title: "Conditions",
    kannadaTitle: "ಷರತ್ತುಗಳು",
    description: "enadru, illa andre, enu illa andre",
    code: `namaskara
  idu marks = 72;

  enadru (marks >= 85) {
    helu "Distinction! 🎉";
  } illa andre (marks >= 60) {
    helu "First class 👏";
  } illa andre (marks >= 35) {
    helu "Pass aagidya 🙂";
  } enu illa andre {
    helu "Next time try maadu 💪";
  }

  // mattu = and, athava = or, alla = not
  idu maleyide = sari;
  idu kode = thappu;
  enadru (maleyide mattu alla kode) {
    helu "Mane olage iru!";
  }
matte sigona
`,
  },
  {
    id: "table",
    title: "Multiplication table",
    kannadaTitle: "ಮಗ್ಗಿ",
    description: "prathi loop",
    code: `namaskara
  idu n = 7;

  prathi (idu i = 1; i <= 10; i += 1) {
    helu n, "x", i, "=", n * i;
  }
matte sigona
`,
  },
  {
    id: "fizzbuzz",
    title: "Jai Karnataka FizzBuzz",
    kannadaTitle: "ಜೈ ಕರ್ನಾಟಕ",
    description: "Loops, % and munde nodu",
    code: `namaskara
  // 3 ra multiple => "Jai", 5 ra multiple => "Karnataka"
  prathi (idu i = 1; i <= 15; i += 1) {
    enadru (i % 15 == 0) {
      helu "Jai Karnataka! 💛❤️";
      munde nodu;
    }

    enadru (i % 3 == 0) {
      helu "Jai";
    } illa andre (i % 5 == 0) {
      helu "Karnataka";
    } enu illa andre {
      helu i;
    }
  }
matte sigona
`,
  },
  {
    id: "functions",
    title: "Functions",
    kannadaTitle: "ಕೆಲಸ",
    description: "kelasa, kodu and recursion",
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

  helu "2 + 3 =", jodisu(2, 3);

  prathi (idu i = 1; i <= 6; i += 1) {
    helu i + "! =", factorial(i);
  }
matte sigona
`,
  },
  {
    id: "fibonacci",
    title: "Fibonacci",
    kannadaTitle: "ಫಿಬೊನಾಚಿ",
    description: "Arrays with serisu",
    code: `namaskara
  kelasa fibonacci(count) {
    idu sankhyegalu = [0, 1];
    ellivargu (uddha(sankhyegalu) < count) {
      idu n = uddha(sankhyegalu);
      serisu(sankhyegalu, sankhyegalu[n - 1] + sankhyegalu[n - 2]);
    }
    kodu sankhyegalu;
  }

  helu fibonacci(12);
matte sigona
`,
  },
  {
    id: "arrays",
    title: "Arrays",
    kannadaTitle: "ಪಟ್ಟಿ",
    description: "Sum, max and bubble sort",
    code: `namaskara
  idu marks = [67, 92, 45, 81, 58];

  idu motta = 0;
  idu doddadu = marks[0];
  prathi (idu i = 0; i < uddha(marks); i += 1) {
    motta += marks[i];
    enadru (marks[i] > doddadu) {
      doddadu = marks[i];
    }
  }
  helu "Motta:", motta, "| Average:", motta / uddha(marks), "| Max:", doddadu;

  // bubble sort
  prathi (idu i = 0; i < uddha(marks); i += 1) {
    prathi (idu j = 0; j < uddha(marks) - i - 1; j += 1) {
      enadru (marks[j] > marks[j + 1]) {
        idu temp = marks[j];
        marks[j] = marks[j + 1];
        marks[j + 1] = temp;
      }
    }
  }
  helu "Sorted:", marks;
matte sigona
`,
  },
  {
    id: "primes",
    title: "Prime numbers",
    kannadaTitle: "ಅವಿಭಾಜ್ಯ ಸಂಖ್ಯೆ",
    description: "Nested loops and saaku nilsu",
    code: `namaskara
  kelasa prime_aa(n) {
    enadru (n < 2) {
      kodu thappu;
    }
    prathi (idu d = 2; d * d <= n; d += 1) {
      enadru (n % d == 0) {
        kodu thappu;
      }
    }
    kodu sari;
  }

  idu primes = [];
  prathi (idu n = 1; uddha(primes) < 15; n += 1) {
    enadru (prime_aa(n)) {
      serisu(primes, n);
    }
  }
  helu "Modala 15 primes:", primes;
matte sigona
`,
  },
  {
    id: "pattern",
    title: "Star pyramid",
    kannadaTitle: "ನಕ್ಷತ್ರ",
    description: "Strings and nested loops",
    code: `namaskara
  idu ethara = 5;

  prathi (idu i = 1; i <= ethara; i += 1) {
    idu saalu = "";
    prathi (idu s = 0; s < ethara - i; s += 1) {
      saalu += " ";
    }
    prathi (idu k = 0; k < 2 * i - 1; k += 1) {
      saalu += "*";
    }
    helu saalu;
  }
matte sigona
`,
  },
  {
    id: "palindrome",
    title: "Palindrome",
    kannadaTitle: "ಪಾಲಿಂಡ್ರೋಮ್",
    description: "Indexing into strings",
    code: `namaskara
  kelasa ulta(shabda) {
    idu result = "";
    prathi (idu i = uddha(shabda) - 1; i >= 0; i -= 1) {
      result += shabda[i];
    }
    kodu result;
  }

  idu padagalu = ["malayalam", "kannada", "nayan", "dodda"];
  prathi (idu i = 0; i < uddha(padagalu); i += 1) {
    idu p = padagalu[i];
    enadru (ulta(p) == p) {
      helu p, "=> palindrome ✅";
    } enu illa andre {
      helu p, "=> alla ❌ (" + ulta(p) + ")";
    }
  }
matte sigona
`,
  },
  {
    id: "input",
    title: "Ask for input",
    kannadaTitle: "ಕೇಳು",
    description: "kelu() reads from the Input tab",
    input: "Chandan\n24",
    code: `namaskara
  // answers come from the "Input" tab, one per line
  idu hesaru = kelu("Ninna hesaru enu? ");
  idu vayassu = sankhye(kelu("Ninna vayassu eshtu? "));

  helu "Namaskara " + hesaru + "! 🙏";
  helu "10 varsha aadmele nimage", vayassu + 10, "varsha aagutte.";
matte sigona
`,
  },
  {
    id: "closures",
    title: "Counter (closures)",
    kannadaTitle: "ಎಣಿಕೆ",
    description: "Functions that remember",
    code: `namaskara
  kelasa counter_maadu() {
    idu count = 0;
    kelasa next() {
      count += 1;
      kodu count;
    }
    kodu next;
  }

  idu ondu = counter_maadu();
  idu eradu = counter_maadu();

  ondu();
  ondu();
  helu "ondu:", ondu(), "| eradu:", eradu();
matte sigona
`,
  },
  {
    id: "kannada-lipi",
    title: "Written in ಕನ್ನಡ ಲಿಪಿ",
    kannadaTitle: "ಕನ್ನಡ ಲಿಪಿ",
    description: "Keywords and names in Kannada script",
    code: `ನಮಸ್ಕಾರ
  ಕೆಲಸ ವರ್ಗ(ಸಂ) {
    ಕೊಡು ಸಂ * ಸಂ;
  }

  ಇದು ಹಣ್ಣುಗಳು = ["ಮಾವು", "ಬಾಳೆ", "ಹಲಸು"];

  ಪ್ರತಿ (ಇದು ಐ = ೦; ಐ < ಉದ್ದ(ಹಣ್ಣುಗಳು); ಐ += ೧) {
    ಹೇಳು ಐ + ೧, ಹಣ್ಣುಗಳು[ಐ];
  }

  ಏನಾದ್ರು (ವರ್ಗ(೫) == ೨೫ ಮತ್ತು ಸರಿ) {
    ಹೇಳು "೫ ರ ವರ್ಗ", ವರ್ಗ(೫);
  }
ಮತ್ತೆ ಸಿಗೋಣ
`,
  },
];

export const DEFAULT_EXAMPLE = EXAMPLES[0];
