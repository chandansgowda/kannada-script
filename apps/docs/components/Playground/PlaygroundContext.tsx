import React, { createContext, useCallback, useContext, useRef } from "react";

type OpenOptions = { run?: boolean; input?: string };
type OpenHandler = (code: string, options?: OpenOptions) => void;

type ContextValue = {
  /** Loads code into the playground (and scrolls to it) */
  openInPlayground: OpenHandler;
  /** Used by the playground to receive openInPlayground calls */
  registerHandler: (handler: OpenHandler | null) => void;
};

const PlaygroundContext = createContext<ContextValue>({
  openInPlayground: () => {},
  registerHandler: () => {},
});

export function PlaygroundProvider({ children }: { children: React.ReactNode }) {
  const handlerRef = useRef<OpenHandler | null>(null);

  const openInPlayground = useCallback<OpenHandler>((code, options) => {
    handlerRef.current?.(code, options);
    document.getElementById("playground")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const registerHandler = useCallback((handler: OpenHandler | null) => {
    handlerRef.current = handler;
  }, []);

  return (
    <PlaygroundContext.Provider value={{ openInPlayground, registerHandler }}>
      {children}
    </PlaygroundContext.Provider>
  );
}

export const usePlayground = () => useContext(PlaygroundContext);
