import React from "react";

import CopyToClipboard from "../CopyToClipboard";
import { highlightCode } from "../common/syntax";
import { GITHUB_URL } from "../Navbar";

const HELLO = `namaskara
  helu "Namaskara Jagattu!";
matte sigona`;

const STEPS = [
  { title: "Install", command: "npm i -g kannada-script", note: "Needs Node.js 14 or newer" },
  { title: "Write hello.kans", code: HELLO, note: "Any text editor works" },
  { title: "Run it", command: "kannadascript hello.kans", note: "kelu() reads from your keyboard" },
];

export default function Install() {
  return (
    <section id="install" className="mx-auto max-w-7xl scroll-mt-20 px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
      <div className="card relative overflow-hidden p-5 sm:p-10">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="relative">
          <span className="chip">Command line</span>
          <h2 className="section-title mt-3">
            Run on your computer
            <span className="mt-1 block font-kannada text-2xl text-primary sm:mt-0 sm:inline sm:text-4xl">
              {" "}ನಿಮ್ಮ ಕಂಪ್ಯೂಟರ್‌ನಲ್ಲಿ
            </span>
          </h2>
          <p className="mt-3 max-w-2xl text-neutral-400">
            Install Kannada Script from npm, save your programs as{" "}
            <code className="inline-code">.kans</code> files and run them from the terminal.
          </p>

          <ol className="mt-8 grid gap-3 sm:gap-4 lg:grid-cols-3">
            {STEPS.map((step, i) => {
              const text = step.command ?? step.code ?? "";
              return (
                <li key={step.title} className="flex min-w-0 flex-col rounded-2xl border border-white/[0.08] bg-black/30">
                  <div className="flex items-center justify-between gap-2 border-b border-white/[0.06] px-4 py-2.5">
                    <span className="flex items-center gap-2 text-sm font-semibold text-neutral-200">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-dark">
                        {i + 1}
                      </span>
                      {step.title}
                    </span>
                    <CopyToClipboard text={text} />
                  </div>
                  {step.command ? (
                    <pre className="thin-scrollbar flex-1 overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-neutral-200">
                      <span className="select-none text-primary/60">$ </span>
                      {step.command}
                    </pre>
                  ) : (
                    <pre
                      className="code-surface thin-scrollbar flex-1 overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-neutral-200"
                      dangerouslySetInnerHTML={{ __html: highlightCode(text) }}
                    />
                  )}
                  <p className="border-t border-white/[0.04] px-4 py-2 text-xs text-neutral-500">{step.note}</p>
                </li>
              );
            })}
          </ol>

          <p className="mt-6 text-sm text-neutral-500">
            Want to improve Kannada Script itself? See the{" "}
            <a href={`${GITHUB_URL}#development`} target="_blank" rel="noopener noreferrer" className="font-semibold text-neutral-300 hover:text-primary">
              development guide
            </a>{" "}
            to build it from source.
          </p>
        </div>
      </div>
    </section>
  );
}
