import React, { useEffect, useState } from "react";

import Logo from "../common/Logo";
import { GithubIcon, MenuIcon, XIcon, YoutubeIcon } from "../common/icons";

export const GITHUB_URL = "https://github.com/chandansgowda/kannada-script";
export const YOUTUBE_URL = "https://www.youtube.com/@EngineeringinKannada";
export const EIK_URL = "https://engineeringinkannada.in";

const LINKS = [
  { href: "#playground", label: "Playground" },
  { href: "#docs", label: "Docs" },
  { href: "#keywords", label: "Keywords" },
  { href: "#install", label: "Install" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
        scrolled || menuOpen
          ? "border-white/[0.06] bg-dark/90 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <a
        href="#playground"
        className="sr-only z-50 rounded-lg bg-primary px-4 py-2 font-semibold text-dark focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to playground
      </a>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-3" aria-label="Kannada Script home">
          <Logo size={34} />
          <span className="leading-tight">
            <span className="block text-[15px] font-extrabold tracking-tight text-white">
              Kannada Script
            </span>
            <span className="block font-kannada text-[11px] font-medium text-neutral-500">
              ಕನ್ನಡ ಸ್ಕ್ರಿಪ್ಟ್
            </span>
          </span>
        </a>

        <nav
          className="hidden items-center gap-1 rounded-full border border-white/[0.06] bg-white/[0.03] p-1 md:flex"
          aria-label="Main"
        >
          {LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="rounded-full px-4 py-1.5 text-sm font-semibold text-neutral-400 transition-colors hover:bg-white/[0.06] hover:text-white"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-9 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 text-sm font-semibold text-neutral-300 transition hover:border-white/20 hover:text-white lg:flex"
          >
            <YoutubeIcon size={16} className="text-kred" />
            Engineering in Kannada
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="icon-btn"
            aria-label="GitHub repository"
            title="GitHub"
          >
            <GithubIcon size={18} />
          </a>
          <button
            type="button"
            className="icon-btn md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <XIcon size={18} /> : <MenuIcon size={18} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-nav" className="border-t border-white/[0.06] px-4 pb-4 pt-2 md:hidden" aria-label="Mobile">
          <div className="grid gap-1.5">
            {LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-sm font-semibold text-neutral-300 transition hover:text-white"
              >
                {label}
              </a>
            ))}
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-sm font-semibold text-neutral-300"
            >
              <YoutubeIcon size={16} className="text-kred" /> Engineering in Kannada
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
