"use client";

import type { ReactNode } from "react";

export function ShadowWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="grid  grid-cols-1 max-w-4xl rounded-lg sm:rounded-xl md:rounded-[2rem] p-1  w-full sm:p-1.5 md:p-2 shadow-md shadow-black/5">
      <div className="rounded-md sm:rounded-lg md:rounded-3xl p-2 sm:p-3 md:p-4 shadow-xl w-full ring-1 ring-black/5 bg-white/40 dark:bg-neutral-900/80">
        <div className="min-w-full h-full overflow-hidden ">{children}</div>
      </div>
    </div>
  );
}
