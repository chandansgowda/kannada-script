import React from "react";

import Link from "next/link";

import CopyToClipboard from "../CopyToClipboard";
import { playgroundUrl } from "../Documentation/Snippet";
import { ArrowRightIcon, BookIcon, PlayIcon } from "../common/icons";
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

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-12 pt-10 sm:px-6 sm:pb-16 sm:pt-20 lg:grid-cols-[1.15fr_1fr] lg:gap-12 lg:px-8 lg:pb-24">
        <div>
          <span className="chip">Kannadigarinda, Kannadigarigoskara 🔥</span>
          <h1 className="mt-5 text-[2.15rem] font-extrabold leading-[1.05] tracking-tight text-white sm:mt-6 sm:text-6xl">
            Learn programming
            <br />
            in <span className="text-primary">Kannada</span>.
            <span className="mt-3 block font-kannada text-[1.6rem] font-bold leading-snug text-neutral-400 sm:text-3xl">
              ಕನ್ನಡದಲ್ಲಿ ಕೋಡ್ ಮಾಡಿ
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-neutral-400 sm:mt-6 sm:text-lg sm:leading-relaxed">
            A beginner friendly programming language with Kannada keywords. Write them in
            English letters or in <span className="font-kannada text-neutral-200">ಕನ್ನಡ ಲಿಪಿ</span>,
            and run your code right here in the browser.
          </p>
          <div className="mt-7 grid grid-cols-2 gap-3 sm:mt-8 sm:flex sm:flex-wrap">
            <Link href="/playground">
              <a className="btn-primary px-5 py-3.5 text-[15px] sm:px-6">
                Open Playground
                <ArrowRightIcon size={16} className="hidden sm:block" />
              </a>
            </Link>
            <a href="#docs" className="btn-secondary px-5 py-3.5 text-[15px] sm:px-6">
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
              className="code-surface thin-scrollbar overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-neutral-200 sm:p-5 sm:text-sm"
              dangerouslySetInnerHTML={{ __html: highlightCode(PREVIEW) }}
            />
            <div className="flex items-center justify-between gap-3 border-t border-white/[0.06] bg-black/30 px-4 py-3 sm:px-5">
              <span className="font-mono text-[13px] sm:text-sm">
                <span className="text-primary/60">› </span>
                <span className="text-neutral-100">Namaskara, Kannada!</span>
              </span>
              <a
                href={playgroundUrl(PREVIEW)}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary ring-1 ring-inset ring-primary/20 transition hover:bg-primary/20"
              >
                <PlayIcon size={10} /> Try it
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* keyword strip */}
      <div className="relative border-y border-white/[0.06] bg-white/[0.02]">
        <div className="thin-scrollbar mx-auto flex max-w-7xl gap-6 overflow-x-auto px-4 py-3.5 sm:px-6 sm:py-4 lg:px-8">
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
