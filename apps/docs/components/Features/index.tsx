import React from "react";

import Link from "next/link";

import { AlertIcon, ArrowRightIcon, CodeIcon, GlobeIcon, PlayIcon } from "../common/icons";

const FEATURES = [
  {
    Icon: GlobeIcon,
    title: "English or ಕನ್ನಡ ಲಿಪಿ",
    text: "Every keyword works in both scripts. Switch a whole program with one click.",
  },
  {
    Icon: PlayIcon,
    title: "Runs in your browser",
    text: "Nothing to install. Your code is saved automatically and easy to share.",
  },
  {
    Icon: AlertIcon,
    title: "Errors that help",
    text: "Mistakes are explained in Kannada with an English hint and the exact line.",
  },
  {
    Icon: CodeIcon,
    title: "Real programming",
    text: "Variables, conditions, loops, functions, arrays and input. Concepts that carry over to any language.",
  },
];

export default function Features() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 sm:pt-24 lg:px-8">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        {FEATURES.map(({ Icon, title, text }) => (
          <div key={title} className="card flex gap-4 p-4 sm:flex-col sm:p-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/20">
              <Icon size={18} />
            </span>
            <div>
              <h3 className="font-bold text-white">{title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-neutral-400">{text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="card relative mt-4 flex flex-col items-start justify-between gap-4 overflow-hidden p-5 sm:flex-row sm:items-center sm:p-6">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative">
          <h2 className="text-xl font-extrabold text-white sm:text-2xl">
            Ready to write your first program?
          </h2>
          <p className="mt-1 text-sm text-neutral-400">
            13 examples to start from, from <span className="font-mono text-neutral-300">helu</span> to recursion.
          </p>
        </div>
        <Link href="/playground">
          <a className="btn-primary relative w-full px-6 py-3.5 text-[15px] sm:w-auto">
            Open Playground <ArrowRightIcon size={16} />
          </a>
        </Link>
      </div>
    </section>
  );
}
