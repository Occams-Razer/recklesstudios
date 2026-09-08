"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./cursor.module.css";
import { gsap, useGSAP } from "@/app/lib/gsap";
import { FINE_POINTER, MOTION_OK } from "@/app/lib/motion";

/**
 * Decorative cursor dot. The native cursor is never hidden; this only adds a
 * label ("Play", "↗") over elements marked with data-cursor. Fine pointers,
 * motion allowed, only.
 */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const check = () =>
      setEnabled(window.matchMedia(FINE_POINTER).matches && window.matchMedia(MOTION_OK).matches);
    check();
    const mqs = [window.matchMedia(FINE_POINTER), window.matchMedia(MOTION_OK)];
    mqs.forEach((mq) => mq.addEventListener("change", check));
    return () => mqs.forEach((mq) => mq.removeEventListener("change", check));
  }, []);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !enabled) return;
      const label = el.querySelector<HTMLElement>("[data-label]");
      gsap.set(el, { xPercent: -50, yPercent: -50, opacity: 0 });
      const xTo = gsap.quickTo(el, "x", { duration: 0.3, ease: "power3" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.3, ease: "power3" });
      let shown = false;

      const move = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        xTo(e.clientX);
        yTo(e.clientY);
        if (!shown) {
          shown = true;
          gsap.to(el, { opacity: 1, duration: 0.3 });
        }
      };
      const over = (e: PointerEvent) => {
        const target = (e.target as Element | null)?.closest?.("[data-cursor]");
        if (target && label) {
          label.textContent = target.getAttribute("data-cursor");
          el.dataset.state = "label";
        }
      };
      const out = (e: PointerEvent) => {
        const target = (e.target as Element | null)?.closest?.("[data-cursor]");
        const next = e.relatedTarget as Node | null;
        if (target && !(next && target.contains(next))) {
          delete el.dataset.state;
        }
      };
      const leave = () => {
        shown = false;
        gsap.to(el, { opacity: 0, duration: 0.3 });
      };

      window.addEventListener("pointermove", move, { passive: true });
      document.addEventListener("pointerover", over);
      document.addEventListener("pointerout", out);
      document.documentElement.addEventListener("mouseleave", leave);
      return () => {
        window.removeEventListener("pointermove", move);
        document.removeEventListener("pointerover", over);
        document.removeEventListener("pointerout", out);
        document.documentElement.removeEventListener("mouseleave", leave);
      };
    },
    { dependencies: [enabled], revertOnUpdate: true }
  );

  if (!enabled) return null;

  return (
    <div ref={ref} className={`cursor ${styles.cursor}`} aria-hidden="true">
      <span className={styles.label} data-label />
    </div>
  );
}
