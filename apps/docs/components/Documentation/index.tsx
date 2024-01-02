import Snippet from "./Snippet";


/* This example requires Tailwind CSS v2.0+ */
const features = [
  {
    name: "General",
    description: (
      <>
        <code className="language-cpp">namaskara</code> is the entrypoint for the
        program and all program must end with{" "}
        <code className="language-cpp">matte sigona</code>. Anything outside of it
        will be ignored.
      </>
    ),
    code: `This will be ignored

namaskara
  // Write code here
matte sigona

This too
    `,
  },
  {
    name: "Variables",
    description: (
      <>
        Variables can be declared using{" "}
        <code className="language-cpp">idu</code>.
      </>
    ),
    code: `namaskara
    idu a = 10;
    idu b = "two";
    idu c = 15;
    a = a + 1;
    b = 21;
    c *= 2;
matte sigona
    `,
  },
  {
    name: "Types",
    description: (
      <>
        Numbers and strings are like other languages. Null values can be denoted
        using <code className="language-cpp">khali</code>.{" "}
        <code className="language-cpp">sari</code> and{" "}
        <code className="language-cpp">thappu</code> are the boolean values.
      </>
    ),
    code: `namaskara
    idu a = 10;
    idu b = 10 + (15*20);
    idu c = "two";
    idu d = 'ok';
    idu e = khali;
    idu f = sari;
    idu g = thappu;
matte sigona
    `,
  },
  {
    name: "Built-ins",
    description: (
      <>
        Use <code className="language-cpp">helu</code> to print anything to
        console.
      </>
    ),
    code: `namaskara
    helu "Hello World";
    idu a = 10;
    {
       idu b = 20;
       helu a + b;
    }
    helu 5, 'ok', khali , sari , thappu;
matte sigona
    `,
  },
  {
    name: "Conditionals",
    description: (
      <>
        kannadascript supports if-else-if ladder construct , <code className="language-cpp">enadru</code> block will execute if condition is <code className="language-cpp">sari</code>, otherwise one of the subsequently added <code className="language-cpp">illa andre</code> blocks will execute if their respective condition is <code className="language-cpp">sari</code>, and the <code className="language-cpp">enu illa andre</code> block will eventually execute if all of the above conditions are <code className="language-cpp">thappu</code>.
      </>
    ),
    code: `namaskara
    idu a = 10;
    enadru (a < 20) {
      helu "a is less than 20";
    } illa andre ( a < 25 ) {
      helu "a is less than 25";
    } enu illa andre {
      helu "a is greater than or equal to 25";
    }
matte sigona
    `
  },
  {
    name: "Loops",
    description: (
      <>
        Statements inside <code className="language-cpp">ellivargu</code> blocks are executed as long as a specified condition evaluates to <code className="language-cpp">sari</code>. If the condition becomes <code className="language-cpp">thappu</code>, statement within the loop stops executing and control passes to the statement following the loop.
        Use <code className="language-cpp">saaku nilsu</code> to break the loop and <code className="language-cpp">munde nodu</code> to continue within loop.
      </>
    ),
    code: `namaskara
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
    `
  }

];

export default function Documentation() {
  return (
    <div>
      <div className="max-w-2xl mx-auto py-24 px-4 grid items-center grid-cols-1 gap-y-16 gap-x-8 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-100 sm:text-4xl">
            Documentation
          </h2>
          <p className="mt-4 text-gray-300">
            kannadascript is dynamically typed toy programming language, based on an
            inside joke, written in Typescript.
          </p>

          <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            {features.map((feature) => (
              <div key={feature.name} className="border-t border-gray-200 pt-4">
                <div className="font-medium text-gray-300">{feature.name}</div>
                <div className="mt-2 text-sm text-gray-200">
                  {feature.description}
                </div>
                <Snippet code={feature.code} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
