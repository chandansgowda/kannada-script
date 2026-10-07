import React from "react";

/** Kannada Script mark: "ಕ" on the Karnataka flag colours */
export default function Logo({ size = 36 }: { size?: number }) {
  return (
    <span
      className="relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-primary font-kannada font-extrabold text-dark shadow-[0_0_0_1px_rgba(255,215,0,0.3),0_8px_24px_-8px_rgba(255,215,0,0.5)]"
      style={{ width: size, height: size, fontSize: size * 0.5 }}
      aria-hidden="true"
    >
      <span className="absolute inset-x-0 bottom-0 h-[22%] bg-kred" />
      <span className="relative -mt-[12%] leading-none">ಕ</span>
    </span>
  );
}
