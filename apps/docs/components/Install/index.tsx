import React from "react";

import CopyToClipboard from "../CopyToClipboard";
import { GITHUB_URL } from "../Navbar";

const STEPS = [
  {
    title: "Get the code",
    command: `git clone ${GITHUB_URL}.git\ncd kannada-script\nnpm install && npm run build`,
  },
  {
    title: "Write a program",
    command: `echo 'namaskara helu "Namaskara!"; matte sigona' > hello.kans`,
  },
  {
    title: "Run it",
    command: "node packages/cli/bin/index.js hello.kans",
  },
];

export default function Install() {
  return (
    <section id="install" className="mx-auto max-w-7xl scroll-mt-20 px-4 pb-24 sm:px-6 lg:px-8">
      <div className="card relative overflow-hidden p-6 sm:p-10">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="relative">
          <span className="chip">Command line</span>
          <h2 className="section-title mt-3">
            Run on your computer <span className="font-kannada text-primary">ನಿಮ್ಮ ಕಂಪ್ಯೂಟರ್‌ನಲ್ಲಿ</span>
          </h2>
          <p className="mt-3 max-w-2xl text-neutral-400">
            Save programs as <code className="inline-code">.kans</code> files and run them with
            the Kannada Script CLI. <code className="inline-code">kelu()</code> reads from your
            keyboard there.
          </p>

          <ol className="mt-8 grid gap-4 lg:grid-cols-3">
            {STEPS.map((step, i) => (
              <li key={step.title} className="flex min-w-0 flex-col rounded-2xl border border-white/[0.08] bg-black/30">
                <div className="flex items-center justify-between gap-2 border-b border-white/[0.06] px-4 py-2.5">
                  <span className="flex items-center gap-2 text-sm font-semibold text-neutral-200">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-dark">
                      {i + 1}
                    </span>
                    {step.title}
                  </span>
                  <CopyToClipboard text={step.command} />
                </div>
                <pre className="thin-scrollbar overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-neutral-300">
                  {step.command.split("\n").map((line) => (
                    <span key={line} className="block">
                      <span className="select-none text-primary/60">$ </span>
                      {line}
                    </span>
                  ))}
                </pre>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
