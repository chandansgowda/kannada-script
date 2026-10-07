import React from "react";

import CopyToClipboard from "../CopyToClipboard";
import { ArrowRightIcon, BookIcon } from "../common/icons";
import { highlightCode } from "../common/syntax";

const PREVIEW = `namaskara
  idu hesaru = "Kannada";
  helu "Namaskara, " + hesaru + "!";
matte sigona`;

const KEYWORD_STRIP = [
  ["namaskara", "ನಮಸ್ಕಾರ"],
  ["helu", "ಹೇಳು"],
  ["idu", "ಇದು"],
  ["enadru", "ಏನಾದ್ರು"],
  ["ellivargu", "ಎಲ್ಲಿವರೆಗೂ"],
  ["prathi", "ಪ್ರತಿ"],
  ["kelasa", "ಕೆಲಸ"],
  ["kodu", "ಕೊಡು"],
  ["matte sigona", "ಮತ್ತೆ ಸಿಗೋಣ"],
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* background */}
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[28rem] w-[56rem] -translate-x-1/2 rounded-full bg-primary/[0.08] blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-40 h-72 w-72 rounded-full bg-kred/[0.07] blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 sm:pt-20 lg:grid-cols-[1.15fr_1fr] lg:px-8 lg:pb-24">
        <div>
          <span className="chip">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Kannadigarinda, Kannadigarigoskara 🔥
          </span>
          <h1 className="mt-6 text-[2.6rem] font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl">
            Learn programming
            <br />
            in <span className="text-primary">Kannada</span>.
            <span className="mt-3 block font-kannada text-2xl font-bold leading-snug text-neutral-400 sm:text-3xl">
              ಕನ್ನಡದಲ್ಲಿ ಕೋಡ್ ಮಾಡಿ
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-400 sm:text-lg">
            Kannada Script is a beginner friendly programming language with Kannada
            keywords. Write them in English letters or in{" "}
            <span className="font-kannada text-neutral-200">ಕನ್ನಡ ಲಿಪಿ</span>, and run your
            code right here in the browser.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#playground" className="btn-primary px-6 py-3.5 text-[15px]">
              Open Playground
              <ArrowRightIcon size={16} />
            </a>
            <a href="#docs" className="btn-secondary px-6 py-3.5 text-[15px]">
              <BookIcon size={16} />
              Read the docs
            </a>
          </div>
        </div>

        {/* code preview */}
        <div className="relative">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/20 via-transparent to-kred/20 opacity-60 blur-2xl" />
          <div className="card relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-kred/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-primary/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              </span>
              <span className="font-mono text-xs text-neutral-500">hello.kans</span>
              <CopyToClipboard text={PREVIEW} />
            </div>
            <pre
              className="code-surface overflow-x-auto p-5 font-mono text-[13px] leading-relaxed text-neutral-200 sm:text-sm"
              dangerouslySetInnerHTML={{ __html: highlightCode(PREVIEW) }}
            />
            <div className="border-t border-white/[0.06] bg-black/30 px-5 py-3 font-mono text-[13px] sm:text-sm">
              <span className="text-primary/60">› </span>
              <span className="text-neutral-100">Namaskara, Kannada!</span>
            </div>
          </div>
        </div>
      </div>

      {/* keyword strip */}
      <div className="relative border-y border-white/[0.06] bg-white/[0.02]">
        <div className="thin-scrollbar mx-auto flex max-w-7xl gap-6 overflow-x-auto px-4 py-4 sm:px-6 lg:px-8">
          {KEYWORD_STRIP.map(([latin, kannada]) => (
            <span key={latin} className="flex shrink-0 items-baseline gap-2 text-sm">
              <code className="font-mono font-semibold text-primary">{latin}</code>
              <span className="font-kannada text-neutral-500">{kannada}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
