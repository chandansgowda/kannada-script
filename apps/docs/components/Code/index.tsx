import React, { useState } from "react";

import interpreter from "kannada-script-interpreter";

import { sendEvents } from "../../helpers";

import CodeEditor from "./CodeEditor";
import Terminal from "./Terminal";


const initialCode = `
namaskara
 helu "Hello World";

  idu a = 3;
  idu b = 0;

  ellivargu (b < 5) {
    helu b;

    enadru (b == a) {
      helu "b is equal to a";
    } illa andre (b == 0) {
      helu "b is equal to zero";
    }

    b += 1;
  }

matte sigona
`;

const Code = (props: Props) => {
  const {} = props;
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<{ value: string; isError: boolean }[]>(
    []
  );
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const handleChange = (newCode: string) => {
    setCode(newCode);
  };

  const executeCode = () => {
    let orignalConsoleLog = console.log;
    const outputList = [];
    let isExecusionSuccess = true;
    console.log = function (...args) {
      outputList.push({ value: args.join("\n"), isError: false });
    };

    try {
      interpreter.interpret(code);
    } catch (e) {
      if (e instanceof Error) {
        isExecusionSuccess = false;
        outputList.push({ value: e.message, isError: true });
      } else {
        console.error(e);
      }
    }

    sendEvents("CodeExecuted", {success: isExecusionSuccess});

    setIsSuccess(isExecusionSuccess);
    setOutput(outputList);
    console.log = orignalConsoleLog;
  };

  const clearCode = () => {
    sendEvents("CodeCleared");
    setCode("");
    setIsSuccess(null);
    setOutput([]);
  };

  return (
    <div id="playground" className="mx-4 sm:mx-12">
      <div className="sm:flex justify-between items-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-100 sm:text-4xl my-4">
          KannadaScript   Playground
        </h2>
        <div className="flex">
          <button
            disabled={!code}
            onClick={executeCode}
            className="mx-2 flex items-center justify-center px-8 border border-transparent text-base font-medium rounded-md text-white bg-bhagwa-600 hover:bg-bhagwa-700 md:text-lg md:px-10 my-4 sm:my-8 sm:py-3 disabled:opacity-40"
          >
            Run
          </button>

          <button
            onClick={clearCode}
            className="mx-2 flex items-center justify-center px-8 border border-transparent text-base font-medium rounded-md text-bhagwa-700 bg-bhagwa-300 hover:bg-bhagwa-400 md:text-lg md:px-10 my-4 sm:my-8 sm:py-3"
          >
            Clear
          </button>

          <button
            onClick={() => window.open('https://www.youtube.com/playlist?list=PLlGueSbLhZoBRnTsGiDJeTXuQCALOTN07', '_blank')}
            className="mx-2 flex items-center justify-center px-8 border border-transparent text-base font-medium rounded-md text-bhagwa-700 bg-bhagwa-400 hover:bg-bhagwa-300 md:text-lg md:px-10 my-4 sm:my-8 sm:py-3"
          >
            Engineering in Kannada
          </button>
        </div>
      </div>
      <CodeEditor handleChange={handleChange} code={code} />
      <Terminal output={output} isSuccess={isSuccess} />
    </div>
  );
};
type Props = {};
export default React.memo(Code);
