import React from "react";

import Logo from "../common/Logo";
import { GithubIcon, YoutubeIcon } from "../common/icons";
import { EIK_URL, GITHUB_URL, YOUTUBE_URL } from "../Navbar";

const COLUMNS = [
  {
    title: "Learn",
    links: [
      { label: "Playground", href: "#playground" },
      { label: "Documentation", href: "#docs" },
      { label: "Keywords", href: "#keywords" },
      { label: "Run locally", href: "#install" },
    ],
  },
  {
    title: "Open source",
    links: [
      { label: "GitHub", href: GITHUB_URL },
      { label: "Contribute", href: `${GITHUB_URL}/blob/main/CONTRIBUTING.md` },
      { label: "Report a bug", href: `${GITHUB_URL}/issues/new/choose` },
      { label: "AST explorer", href: "https://kannadascript-ast.netlify.app/" },
    ],
  },
  {
    title: "Engineering in Kannada",
    links: [
      { label: "Website", href: EIK_URL },
      { label: "YouTube", href: YOUTUBE_URL },
      {
        label: "Kannada Script videos",
        href: "https://www.youtube.com/playlist?list=PLlGueSbLhZoBRnTsGiDJeTXuQCALOTN07",
      },
    ],
  },
];

const isExternal = (href: string) => href.startsWith("http");

const Footer = () => (
  <footer className="border-t border-white/[0.06] bg-dark-900">
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_repeat(3,1fr)] lg:px-8">
      <div>
        <div className="flex items-center gap-3">
          <Logo size={36} />
          <span className="text-lg font-extrabold text-white">Kannada Script</span>
        </div>
        <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-400">
          A toy programming language to learn coding in Kannada.{" "}
          <span className="font-kannada text-neutral-300">ಕನ್ನಡಿಗರಿಂದ, ಕನ್ನಡಿಗರಿಗೋಸ್ಕರ.</span>
        </p>
        <div className="mt-5 flex gap-1">
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="GitHub">
            <GithubIcon size={18} />
          </a>
          <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="YouTube">
            <YoutubeIcon size={18} />
          </a>
        </div>
      </div>
      {COLUMNS.map((column) => (
        <div key={column.title}>
          <h3 className="text-sm font-bold text-white">{column.title}</h3>
          <ul className="mt-4 space-y-2.5">
            {column.links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  {...(isExternal(link.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="text-sm text-neutral-400 transition hover:text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div className="border-t border-white/[0.06]">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <span>MIT License · Forked from BhaiLang</span>
        <span>
          Made with 💛❤️ by the{" "}
          <a href={EIK_URL} target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-primary">
            Engineering in Kannada
          </a>{" "}
          community
        </span>
      </div>
    </div>
  </footer>
);

export default React.memo(Footer);
