import { useEffect, useState } from "react";

// landing page sections that have a navigation item, in page order
export const NAV_SECTIONS = ["docs", "keywords", "install"];

/**
 * The landing page section currently being read ("" while above the docs),
 * so navigation can highlight where the reader is.
 */
export default function useActiveSection(enabled = true) {
  const [active, setActive] = useState("");

  useEffect(() => {
    if (!enabled) return;

    const onScroll = () => {
      let current = "";
      for (const id of NAV_SECTIONS) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top < window.innerHeight * 0.4)
          current = id;
      }
      // the last section may be too short to reach the threshold
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom && document.getElementById(NAV_SECTIONS[NAV_SECTIONS.length - 1]))
        current = NAV_SECTIONS[NAV_SECTIONS.length - 1];
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [enabled]);

  return active;
}
