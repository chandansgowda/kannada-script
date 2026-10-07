import React, { useEffect, useRef, useState } from "react";

import { BookIcon, ChevronDownIcon } from "../common/icons";

import { Example, EXAMPLES } from "./examples";

type Props = {
  onSelect: (example: Example) => void;
};

export default function ExamplePicker({ onSelect }: Props) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        className="btn-secondary"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <BookIcon size={15} />
        Examples
        <ChevronDownIcon
          size={15}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="thin-scrollbar absolute left-0 top-full z-30 mt-2 max-h-[26rem] w-[min(22rem,calc(100vw-2rem))] animate-fade-up overflow-y-auto rounded-2xl border border-white/10 bg-dark-700/95 p-1.5 shadow-2xl shadow-black/60 backdrop-blur-xl"
        >
          {EXAMPLES.map((example) => (
            <button
              key={example.id}
              type="button"
              role="menuitem"
              className="group flex w-full flex-col items-start rounded-xl px-3 py-2 text-left transition hover:bg-white/[0.06] focus:bg-white/[0.06] focus:outline-none"
              onClick={() => {
                onSelect(example);
                setOpen(false);
              }}
            >
              <span className="flex w-full items-baseline justify-between gap-3">
                <span className="text-sm font-semibold text-neutral-100 group-hover:text-primary">
                  {example.title}
                </span>
                <span className="shrink-0 font-kannada text-xs text-neutral-500">
                  {example.kannadaTitle}
                </span>
              </span>
              <span className="text-xs text-neutral-500">{example.description}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
