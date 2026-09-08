"use client";
import { useCallback, useRef, useState } from "react";
import styles from "./work.module.css";
import Featured from "./Featured";
import FilmCard from "./FilmCard";
import FilmDialog from "./FilmDialog";
import { films, projectCount, type FilmProject } from "@/app/data/projects";
import { gsap, useGSAP } from "@/app/lib/gsap";
import { MOTION_OK, REVEAL_TRIGGER, SCRAMBLE } from "@/app/lib/motion";

const LAYOUTS: Array<"a" | "b" | "c"> = ["a", "b", "c"];
const REVEALS: Array<"bottom" | "left" | "right"> = ["bottom", "right", "left"];

export default function Work() {
  const scope = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<FilmProject | null>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const handleOpen = useCallback((film: FilmProject, trigger: HTMLElement) => {
    returnFocus.current = trigger;
    setOpen(film);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(null);
    const el = returnFocus.current;
    returnFocus.current = null;
    if (el) requestAnimationFrame(() => el.focus({ preventScroll: true }));
  }, []);

  useGSAP(
    () => {
      const el = scope.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const labels = el.querySelectorAll<HTMLElement>("[data-head-scramble]");
        labels.forEach((label) => {
          const text = label.dataset.headScramble || label.textContent || "";
          gsap.fromTo(
            label,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.9,
              scrambleText: { text, chars: SCRAMBLE.chars, speed: SCRAMBLE.speed, revealDelay: 0.1 },
              scrollTrigger: { trigger: label, ...REVEAL_TRIGGER },
            }
          );
        });
      });
    },
    { scope }
  );

  return (
    <section
      ref={scope}
      id="work"
      className={styles.work}
      data-section
      data-nav-theme="dark"
      tabIndex={-1}
      aria-labelledby="work-title"
    >
      <div className={styles.head}>
        <h2 id="work-title" className={`label ${styles.headLabel}`} data-head-scramble="02 — Selected work">
          02 — SELECTED WORK
        </h2>
        <p className={`label ${styles.headCount}`} data-head-scramble={`(0${projectCount})`}>
          (0{projectCount})
        </p>
      </div>

      <Featured />

      <div className={styles.list}>
        {films.map((film, i) => (
          <FilmCard
            key={film.slug}
            film={film}
            layout={LAYOUTS[i % LAYOUTS.length]}
            reveal={REVEALS[i % REVEALS.length]}
            autoplayInView={i === 0}
            onOpen={handleOpen}
          />
        ))}
      </div>

      <FilmDialog film={open} onClose={handleClose} />
    </section>
  );
}
