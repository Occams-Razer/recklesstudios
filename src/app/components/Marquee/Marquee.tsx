"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/app/lib/gsap";
import { MOTION_OK } from "@/app/lib/motion";
import styles from "./marquee.module.css";

type Props = {
  text: string;
  className?: string;
  /** Pixels per second at rest. */
  speed?: number;
  /** Copies of the text; each copy must be wider than the viewport for a seamless loop. */
  copies?: number;
  /** React to scroll velocity and direction. */
  reactive?: boolean;
  /** Ref to the moving track, for parent-driven tweens. */
  trackRef?: React.RefObject<HTMLDivElement | null>;
};

/**
 * Infinite horizontal marquee. GSAP-driven, seamless, reversible.
 * Under reduced motion the text simply sits still.
 */
export default function Marquee({
  text,
  className = "",
  speed = 90,
  copies = 2,
  reactive = true,
  trackRef,
}: Props) {
  const localRef = useRef<HTMLDivElement>(null);
  const track = trackRef ?? localRef;

  useGSAP(
    () => {
      const el = track.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const first = el.children[0] as HTMLElement;
        let tween: gsap.core.Tween | null = null;

        const build = () => {
          tween?.kill();
          gsap.set(el, { xPercent: 0 });
          const width = first.offsetWidth;
          if (!width) return;
          tween = gsap.to(el, {
            xPercent: -100 / copies,
            duration: width / speed,
            ease: "none",
            repeat: -1,
          });
        };
        build();

        const ro = new ResizeObserver(() => build());
        ro.observe(first);

        let direction = 1;
        let lastY = window.scrollY;
        const tick = () => {
          if (!tween) return;
          const y = window.scrollY;
          const velocity = y - lastY;
          lastY = y;
          if (!reactive) return;
          if (velocity > 0.5) direction = 1;
          else if (velocity < -0.5) direction = -1;
          const boost = Math.min(Math.abs(velocity) / 14, 4);
          const target = direction * (1 + boost);
          tween.timeScale(gsap.utils.interpolate(tween.timeScale(), target, 0.08));
        };
        gsap.ticker.add(tick);

        return () => {
          gsap.ticker.remove(tick);
          ro.disconnect();
          tween?.kill();
        };
      });
    },
    { scope: track, dependencies: [copies, speed, reactive], revertOnUpdate: true }
  );

  return (
    <div className={`${styles.track} ${className}`} ref={track} aria-hidden="true">
      {Array.from({ length: copies }, (_, i) => (
        <span className={styles.copy} key={i}>
          {text}
        </span>
      ))}
    </div>
  );
}
