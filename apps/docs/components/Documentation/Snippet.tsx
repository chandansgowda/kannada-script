import React from "react";

import CopyToClipboard from "../CopyToClipboard";
import { PlayIcon } from "../common/icons";
import { highlightCode } from "../common/syntax";
import { usePlayground } from "../Playground/PlaygroundContext";

type Props = {
  code: string;
  /** answers for kelu() when the snippet is opened in the playground */
  input?: string;
  /** snippets that aren't complete programs can't be run */
  runnable?: boolean;
  title?: string;
};

const Snippet = ({ code, input, runnable = true, title = "example.kans" }: Props) => {
  const { openInPlayground } = usePlayground();

  return (
    <div className="card my-5 overflow-hidden">
      <div className="flex items-center justify-between gap-2 border-b border-white/[0.06] px-3 py-2">
        <span className="font-mono text-xs text-neutral-500">{title}</span>
        <div className="flex items-center gap-1.5">
          <CopyToClipboard text={code} />
          {runnable && (
            <button
              type="button"
              onClick={() => openInPlayground(code, { run: true, input })}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-2.5 py-1 text-xs font-bold text-dark transition hover:bg-primary-light"
            >
              <PlayIcon size={11} />
              Try it
            </button>
          )}
        </div>
      </div>
      <pre
        className="code-surface thin-scrollbar overflow-x-auto bg-black/20 p-4 font-mono text-[13px] leading-relaxed text-neutral-200"
        dangerouslySetInnerHTML={{ __html: highlightCode(code) }}
      />
    </div>
  );
};

export default React.memo(Snippet);
