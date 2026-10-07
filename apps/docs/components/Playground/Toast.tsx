import React from "react";

import { XIcon } from "../common/icons";

export type ToastMessage = {
  id: number;
  message: string;
  action?: { label: string; onClick: () => void };
};

type Props = {
  toast: ToastMessage | null;
  onDismiss: () => void;
};

export default function Toast({ toast, onDismiss }: Props) {
  if (!toast) return null;

  return (
    <div
      key={toast.id}
      role="status"
      className="fixed bottom-5 left-1/2 z-50 flex max-w-[calc(100vw-2rem)] -translate-x-1/2 animate-fade-up items-center gap-3 rounded-2xl border border-white/10 bg-dark-600/95 py-2 pl-4 pr-2 text-sm text-neutral-100 shadow-2xl shadow-black/60 backdrop-blur-xl"
    >
      <span>{toast.message}</span>
      {toast.action && (
        <button
          type="button"
          className="rounded-lg px-2 py-1 text-sm font-semibold text-primary transition hover:bg-primary/10"
          onClick={() => {
            toast.action?.onClick();
            onDismiss();
          }}
        >
          {toast.action.label}
        </button>
      )}
      <button type="button" className="icon-btn h-7 w-7" onClick={onDismiss} aria-label="Dismiss">
        <XIcon size={14} />
      </button>
    </div>
  );
}
