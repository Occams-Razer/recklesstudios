"use client";
import { ReactLenis, type LenisRef } from "lenis/react";
import "lenis/dist/lenis.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/app/lib/gsap";
import { MOTION_OK } from "@/app/lib/motion";

const motionAllowed = () =>
  typeof window === "undefined" ? true : window.matchMedia(MOTION_OK).matches;

/**
 * Lenis smooth scroll wired to GSAP's ticker + ScrollTrigger.
 * The provider is always rendered (so the tree never remounts); under
 * reduced motion wheel smoothing is simply switched off, which leaves
 * native scrolling untouched.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const ref = useRef<LenisRef>(null);
  const [smooth, setSmooth] = useState(motionAllowed);

  useEffect(() => {
    const mq = window.matchMedia(MOTION_OK);
    const update = () => setSmooth(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const tick = (time: number) => ref.current?.lenis?.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(tick);
  }, []);

  useEffect(() => {
    const lenis = ref.current?.lenis;
    if (!lenis) return;
    lenis.on("scroll", ScrollTrigger.update);
    return () => lenis.off("scroll", ScrollTrigger.update);
  }, [smooth]);

  const options = useMemo(
    () => ({
      autoRaf: false,
      smoothWheel: smooth,
      lerp: 0.1,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    }),
    [smooth]
  );

  return (
    <ReactLenis root ref={ref} options={options}>
      {children}
    </ReactLenis>
  );
}
