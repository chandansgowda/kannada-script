import React from "react";

import Link from "next/link";

import { BookIcon, HomeIcon, KeyboardIcon, PlayIcon, TerminalIcon } from "../common/icons";

import useActiveSection from "./useActiveSection";

const TABS = [
  { href: "/", hash: "", label: "Home", Icon: HomeIcon },
  { href: "/playground", hash: "", label: "Playground", Icon: PlayIcon },
  { href: "/#docs", hash: "docs", label: "Docs", Icon: BookIcon },
  { href: "/#keywords", hash: "keywords", label: "Keywords", Icon: KeyboardIcon },
  { href: "/#install", hash: "install", label: "Install", Icon: TerminalIcon },
];

/** Mobile navigation for the landing page. */
export default function BottomNav() {
  const active = useActiveSection();

  return (
    <nav
      aria-label="Sections"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.08] bg-dark-900/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden"
    >
      <ul className="grid grid-cols-5">
        {TABS.map(({ href, hash, label, Icon }) => {
          const isActive = href !== "/playground" && hash === active;
          return (
            <li key={href}>
              <Link href={href}>
                <a
                  aria-current={isActive ? "page" : undefined}
                  className={`flex flex-col items-center gap-0.5 pb-2 pt-2 text-[11px] font-semibold transition ${
                    isActive ? "text-primary" : "text-neutral-500 hover:text-neutral-200"
                  }`}
                >
                  <span
                    className={`flex h-7 items-center justify-center ${
                      href === "/playground" ? "w-11 rounded-full bg-primary text-dark" : ""
                    }`}
                  >
                    <Icon size={href === "/playground" ? 13 : 19} />
                  </span>
                  {label}
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
