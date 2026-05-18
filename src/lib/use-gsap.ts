"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function ensureGsap() {
  if (typeof window === "undefined") return;
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
}

/**
 * useGsap — scoped gsap.context that auto-cleans on unmount.
 * Re-runs when any value in `deps` changes.
 */
export function useGsap<T extends HTMLElement>(
  effect: (ctx: gsap.Context, root: T) => void,
  deps: unknown[] = [],
) {
  const rootRef = useRef<T | null>(null);

  useEffect(() => {
    ensureGsap();
    if (!rootRef.current) return;
    const ctx = gsap.context((self) => effect(self, rootRef.current as T), rootRef);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return rootRef;
}

export { gsap, ScrollTrigger };
