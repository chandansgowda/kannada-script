import React, { useEffect, useState } from "react";

import { BUILTIN_TABLE, KEYWORD_TABLE } from "./keywords";
import { DOC_SECTIONS } from "./sections";
import Snippet from "./Snippet";

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -60% 0px" }
    );

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

const SECTION_IDS = DOC_SECTIONS.map(({ id }) => id);

export default function Documentation() {
  const active = useActiveSection(SECTION_IDS);

  return (
    <>
      <section id="docs" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-24 sm:px-6 lg:px-8">
        <span className="chip">Documentation</span>
        <h2 className="section-title mt-3">
          Learn Kannada Script <span className="font-kannada text-primary">ಕಲಿಯಿರಿ</span>
        </h2>
        <p className="mt-3 max-w-2xl text-neutral-400">
          A dynamically typed toy language written in TypeScript. Every example below can be
          opened in the playground with <b className="text-neutral-200">Try it</b>.
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-[13rem_minmax(0,1fr)]">
          <nav aria-label="Documentation" className="hidden lg:block">
            <ul className="sticky top-24 space-y-0.5 border-l border-white/[0.08]">
              {DOC_SECTIONS.map(({ id, title }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className={`-ml-px block border-l-2 py-1.5 pl-4 text-sm transition ${
                      active === id
                        ? "border-primary font-semibold text-primary"
                        : "border-transparent text-neutral-400 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    {title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0 max-w-3xl space-y-16">
            {DOC_SECTIONS.map((section) => (
              <article key={section.id} id={section.id} className="scroll-mt-24">
                <h3 className="text-xl font-bold text-white sm:text-2xl">
                  <a href={`#${section.id}`} className="group">
                    {section.title}
                    <span className="ml-2 text-primary/0 transition group-hover:text-primary/60">#</span>
                  </a>
                </h3>
                <p className="mt-3 leading-relaxed text-neutral-400">{section.description}</p>
                {section.code && (
                  <Snippet code={section.code} input={section.input} runnable={section.runnable} />
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="keywords" className="mx-auto max-w-7xl scroll-mt-20 px-4 pb-24 sm:px-6 lg:px-8">
        <span className="chip">Cheat sheet</span>
        <h2 className="section-title mt-3">
          Keywords <span className="font-kannada text-primary">ಪದಗಳು</span>
        </h2>
        <p className="mt-3 max-w-2xl text-neutral-400">
          Both spellings work everywhere. Use whichever you find easier.
        </p>

        <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <div className="card thin-scrollbar overflow-x-auto">
            <table className="w-full min-w-[38rem] text-left text-sm">
              <thead>
                <tr className="border-b border-white/[0.06] text-xs uppercase tracking-wider text-neutral-500">
                  <th className="px-4 py-3 font-semibold">Keyword</th>
                  <th className="px-4 py-3 font-semibold">ಕನ್ನಡ</th>
                  <th className="px-4 py-3 font-semibold">Meaning</th>
                  <th className="px-4 py-3 font-semibold">Like</th>
                </tr>
              </thead>
              <tbody>
                {KEYWORD_TABLE.map((row) => (
                  <tr key={row.keyword} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02]">
                    <td className="whitespace-nowrap px-4 py-2.5 font-mono font-semibold text-primary">{row.keyword}</td>
                    <td className="whitespace-nowrap px-4 py-2.5 font-kannada text-neutral-200">{row.kannada}</td>
                    <td className="px-4 py-2.5 text-neutral-400">{row.meaning}</td>
                    <td className="whitespace-nowrap px-4 py-2.5 font-mono text-xs text-neutral-500">{row.equivalent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card thin-scrollbar self-start overflow-x-auto">
            <table className="w-full min-w-[26rem] text-left text-sm">
              <thead>
                <tr className="border-b border-white/[0.06] text-xs uppercase tracking-wider text-neutral-500">
                  <th className="px-4 py-3 font-semibold">Built-in</th>
                  <th className="px-4 py-3 font-semibold">What it does</th>
                </tr>
              </thead>
              <tbody>
                {BUILTIN_TABLE.map((builtin) => (
                  <tr key={builtin.name} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02]">
                    <td className="px-4 py-2.5 align-top">
                      <code className="block whitespace-nowrap font-mono font-semibold text-sky-300">{builtin.name}</code>
                      <span className="font-kannada text-xs text-neutral-500">{builtin.kannada}</span>
                    </td>
                    <td className="px-4 py-2.5 text-neutral-400">
                      <span className="text-neutral-200">{builtin.meaning}</span> — {builtin.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
