"use client";
import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import styles from "./preloader.module.css";
import { gsap, ScrollTrigger, useGSAP } from "@/app/lib/gsap";
import { MOTION_OK, EASE, DUR, INTRO } from "@/app/lib/motion";
import {
  introBuilders,
  markIntroDone,
  hasSeenIntro,
  rememberIntro,
  useIntroStep,
  isIntroDone,
} from "@/app/lib/intro";

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/**
 * SSR'd black curtain that owns the page-load timeline.
 * Waits for fonts + a minimum curtain time, then runs every registered intro
 * builder on one timeline. Hidden by CSS when JS is off or motion is reduced.
 */
export default function Preloader() {
  const scope = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  lenisRef.current = lenis;

  // Hold scrolling until the intro has finished.
  useEffect(() => {
    if (!lenis) return;
    if (isIntroDone()) lenis.start();
    else lenis.stop();
  }, [lenis]);

  useIntroStep("curtain", (tl) => {
    const el = scope.current;
    if (!el) return;
    const mark = el.querySelector("[data-mark]");
    tl.to(mark, { opacity: 0, y: -10, duration: 0.4, ease: EASE.soft }, INTRO.curtain)
      .to(
        el,
        { clipPath: "inset(0 0 100% 0)", duration: DUR.curtain, ease: EASE.inOut },
        INTRO.curtain + 0.1
      );
  });

  // Runs exactly once. Never add dependencies here: a second run would build
  // a second timeline whose `from` tweens capture the first one's hidden state.
  useGSAP(() => {
    const finish = () => {
      markIntroDone();
      rememberIntro();
      setDone(true);
      lenisRef.current?.start();
      // Next frame, so it runs outside any active GSAP context.
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    const mm = gsap.matchMedia();
    mm.add({ ok: MOTION_OK, reduced: "(prefers-reduced-motion: reduce)" }, (ctx) => {
      if (!ctx.conditions?.ok) {
        finish();
        return;
      }

      let alive = true;
      let started = false;
      const tl = gsap.timeline({ paused: true, onComplete: finish });

      const start = (jumpToEnd: boolean) => {
        if (!alive || started) return;
        started = true;
        ctx.add(() => {
          introBuilders().forEach((build) => build(tl));
          if (jumpToEnd) tl.progress(1);
          else tl.play();
        });
      };

      const family = getComputedStyle(document.body).fontFamily.split(",")[0];
      const seen = hasSeenIntro();
      Promise.all([
        document.fonts.load(`700 1em ${family}`).catch(() => null),
        document.fonts.ready,
        wait(seen ? 250 : 500),
      ]).then(() => start(false));

      const safety = window.setTimeout(() => start(true), 4000);

      return () => {
        alive = false;
        window.clearTimeout(safety);
      };
    });
  });

  if (done) return null;

  return (
    <div ref={scope} className={`preloader ${styles.curtain}`} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        data-mark
        className={styles.mark}
        src="/icon.svg"
        alt=""
        width={56}
        height={56}
        decoding="async"
      />
    </div>
  );
}
