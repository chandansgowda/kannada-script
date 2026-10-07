import { useEffect, useState } from "react";

import { CheckIcon, CopyIcon } from "../common/icons";

interface Props {
  text: string;
  className?: string;
  label?: string;
}

export async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // fallback for browsers without clipboard API permissions
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    textarea.remove();
    return copied;
  }
}

export default function CopyToClipboard(props: Props) {
  const { text, className = "", label = "Copy" } = props;
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    if (!copySuccess) return;
    const timeout = setTimeout(() => setCopySuccess(false), 2000);
    return () => clearTimeout(timeout);
  }, [copySuccess]);

  async function copyToClipboard(e: React.MouseEvent) {
    e.stopPropagation();
    if (text && (await copyText(text))) setCopySuccess(true);
  }

  return (
    <button
      type="button"
      className={`inline-flex items-center gap-1.5 rounded-lg border px-2 py-1 text-xs font-semibold transition ${
        copySuccess
          ? "border-primary/40 bg-primary/10 text-primary"
          : "border-white/10 bg-white/[0.04] text-neutral-400 hover:border-white/20 hover:text-white"
      } ${className}`}
      onClick={copyToClipboard}
      aria-label={copySuccess ? "Copied" : label}
      title={label}
    >
      {copySuccess ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
      <span>{copySuccess ? "Copied!" : label}</span>
    </button>
  );
}
