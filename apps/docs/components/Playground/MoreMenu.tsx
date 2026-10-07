import React, { useEffect, useRef, useState } from "react";

import {
  DownloadIcon,
  MinusIcon,
  MoreIcon,
  PlusIcon,
  ResetIcon,
  ShareIcon,
} from "../common/icons";

type Props = {
  onShare: () => void;
  onDownload: () => void;
  onReset: () => void;
  fontSize: number;
  onFontSizeChange: (delta: number) => void;
};

/** Secondary playground actions, used on small screens. */
export default function MoreMenu({ onShare, onDownload, onReset, fontSize, onFontSizeChange }: Props) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const item = (label: string, Icon: typeof ShareIcon, action: () => void) => (
    <button
      type="button"
      role="menuitem"
      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-neutral-200 transition hover:bg-white/[0.06]"
      onClick={() => {
        action();
        setOpen(false);
      }}
    >
      <Icon size={16} className="text-neutral-400" />
      {label}
    </button>
  );

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        className="icon-btn h-10 w-10 border border-white/10 bg-white/[0.06]"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="More actions"
        onClick={() => setOpen((value) => !value)}
      >
        <MoreIcon size={18} />
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-30 mt-2 w-56 animate-fade-up rounded-2xl border border-white/10 bg-dark-700/95 p-1.5 shadow-2xl shadow-black/60 backdrop-blur-xl"
        >
          {item("Share link", ShareIcon, onShare)}
          {item("Download .kans", DownloadIcon, onDownload)}
          {item("Reset code", ResetIcon, onReset)}
          <div className="mt-1 flex items-center justify-between border-t border-white/[0.06] px-3 pb-1 pt-2.5 text-sm text-neutral-300">
            Text size
            <span className="flex items-center gap-1">
              <button
                type="button"
                className="icon-btn h-8 w-8"
                onClick={() => onFontSizeChange(-1)}
                aria-label="Decrease font size"
              >
                <MinusIcon size={14} />
              </button>
              <span className="w-6 text-center text-xs tabular-nums text-neutral-400">{fontSize}</span>
              <button
                type="button"
                className="icon-btn h-8 w-8"
                onClick={() => onFontSizeChange(1)}
                aria-label="Increase font size"
              >
                <PlusIcon size={14} />
              </button>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
