import React, { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import Logo from "../common/Logo";
import { GithubIcon, YoutubeIcon } from "../common/icons";

export const GITHUB_URL = "https://github.com/chandansgowda/kannada-script";
export const YOUTUBE_URL = "https://www.youtube.com/@EngineeringinKannada";
export const EIK_URL = "https://engineeringinkannada.in";

export const NAV_LINKS = [
  { href: "/playground", label: "Playground" },
  { href: "/#docs", label: "Docs" },
  { href: "/#keywords", label: "Keywords" },
  { href: "/#install", label: "Install" },
];

type Props = {
  /** the playground is an app-like page: no transparent header */
  solid?: boolean;
};

export default function Navbar({ solid = false }: Props) {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (solid) return;
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [solid]);

  return (
    <header
      className={`z-40 border-b transition-colors duration-300 ${
        solid ? "relative" : "sticky top-0"
      } ${
        solid || scrolled
          ? "border-white/[0.06] bg-dark/90 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <div
        className={`mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 ${
          solid ? "h-14 max-w-none" : "h-16 max-w-7xl"
        }`}
      >
        <Link href="/">
          <a className="flex items-center gap-3" aria-label="Kannada Script home">
            <Logo size={solid ? 30 : 34} />
            <span className="leading-tight">
              <span className="block text-[15px] font-extrabold tracking-tight text-white">
                Kannada Script
              </span>
              <span className="block font-kannada text-[11px] font-medium text-neutral-500">
                ಕನ್ನಡ ಸ್ಕ್ರಿಪ್ಟ್
              </span>
            </span>
          </a>
        </Link>

        <nav
          className="hidden items-center gap-1 rounded-full border border-white/[0.06] bg-white/[0.03] p-1 md:flex"
          aria-label="Main"
        >
          {NAV_LINKS.map(({ href, label }) => {
            const active = href === router.pathname;
            return (
              <Link key={href} href={href}>
                <a
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                    active
                      ? "bg-primary text-dark"
                      : "text-neutral-400 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  {label}
                </a>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
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
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="icon-btn lg:hidden"
            aria-label="Engineering in Kannada on YouTube"
          >
            <YoutubeIcon size={18} />
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
        </div>
      </div>
    </header>
  );
}
