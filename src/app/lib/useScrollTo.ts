"use client";
import { useCallback } from "react";
import { useLenis } from "lenis/react";
import { prefersReducedMotion } from "./motion";

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

/**
 * Smooth anchor navigation. Uses Lenis when motion is allowed, native scroll
 * otherwise. Moves focus to the target for keyboard users.
 */
export function useScrollTo() {
  const lenis = useLenis();

  return useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      history.replaceState(null, "", id === "top" ? " " : `#${id}`);
      const focus = () => target.focus({ preventScroll: true });
      if (!lenis || prefersReducedMotion()) {
        target.scrollIntoView({ block: "start" });
        focus();
        return;
      }
      lenis.scrollTo(target, {
        duration: 1.4,
        easing: easeOutQuart,
        onComplete: focus,
      });
    },
    [lenis]
  );
}
