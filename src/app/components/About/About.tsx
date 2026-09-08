"use client";
import { useRef } from "react";
import Image from "next/image";
import styles from "./about.module.css";
import { gsap, SplitText, useGSAP } from "@/app/lib/gsap";
import { MOTION_OK, DESKTOP, EASE, DUR, REVEAL_TRIGGER, SCRAMBLE } from "@/app/lib/motion";
import { useScrollTo } from "@/app/lib/useScrollTo";

export default function About() {
  const scope = useRef<HTMLElement>(null);
  const scrollTo = useScrollTo();

  useGSAP(
    () => {
      const el = scope.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const statement = el.querySelector<HTMLElement>("[data-split]");
        const label = el.querySelector<HTMLElement>("[data-scramble]");
        const fades = el.querySelectorAll<HTMLElement>("[data-fade]");
        const figure = el.querySelector<HTMLElement>("[data-figure]");
        const wrap = el.querySelector<HTMLElement>("[data-reveal]");
        const img = el.querySelector<HTMLElement>("[data-img]");

        const split = statement
          ? SplitText.create(statement, {
              type: "lines,words",
              mask: "lines",
              linesClass: "line",
              autoSplit: true,
              onSplit: (self) =>
                gsap.from(self.words, {
                  yPercent: 110,
                  duration: DUR.reveal,
                  ease: EASE.out,
                  stagger: 0.03,
                  scrollTrigger: { trigger: statement, ...REVEAL_TRIGGER },
                }),
            })
          : null;

        if (label) {
          const text = label.dataset.scramble || label.textContent || "";
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
        }

        gsap.from(fades, {
          opacity: 0,
          y: 24,
          duration: 0.9,
          ease: EASE.out,
          stagger: 0.1,
          scrollTrigger: { trigger: fades[0], ...REVEAL_TRIGGER },
        });

        if (figure && wrap && img) {
          gsap.set(img, { scale: 1.12 });
          gsap.from(wrap, {
            clipPath: "inset(0 0 100% 0)",
            duration: DUR.image,
            ease: EASE.out,
            scrollTrigger: { trigger: figure, start: "top 80%", once: true },
          });
          gsap.from(img, {
            scale: 1.25,
            duration: DUR.image + 0.2,
            ease: EASE.out,
            scrollTrigger: { trigger: figure, start: "top 80%", once: true },
          });
        }

        return () => split?.revert();
      });

      mm.add(`${MOTION_OK} and ${DESKTOP}`, () => {
        const figure = el.querySelector<HTMLElement>("[data-figure]");
        const img = el.querySelector<HTMLElement>("[data-img]");
        const pistol = el.querySelector<HTMLElement>("[data-pistol]");
        if (!figure || !img) return;
        gsap.fromTo(
          img,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: { trigger: figure, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
        if (pistol) {
          gsap.fromTo(
            pistol,
            { y: 40 },
            {
              y: -40,
              ease: "none",
              scrollTrigger: { trigger: figure, start: "top bottom", end: "bottom top", scrub: true },
            }
          );
        }
      });
    },
    { scope }
  );

  return (
    <section
      ref={scope}
      id="about"
      className={styles.about}
      data-section
      data-nav-theme="dark"
      tabIndex={-1}
      aria-labelledby="about-title"
    >
      <div className={`grid-12 ${styles.grid}`}>
        <p className={`label ${styles.index}`} data-scramble="01 — About">
          01 — About
        </p>

        <h2 id="about-title" className={styles.statement} data-split>
          Reckless Studios is an independent film studio in Madison, WI.
        </h2>

        <div className={styles.aside}>
          <p className={styles.lead} data-fade>
            We create thoughtful, high-quality short films for audiences across the world.
          </p>
          <a
            href="#work"
            className={`link-arrow ${styles.cta}`}
            data-fade
            onClick={(e) => scrollTo(e, "work")}
          >
            <span className="u-draw">See the work</span>
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </a>
        </div>

        <figure className={styles.figure} data-figure>
          <div className={styles.imgWrap} data-reveal>
            <Image
              src="/about/ranger.jpg"
              alt="A figure in a grey hoodie and balaclava stands among birch trees at night, lit by flash."
              fill
              sizes="(min-width: 900px) 66vw, 100vw"
              className={styles.img}
              data-img
            />
          </div>
          {/* Decorative pixel-art motif; a lossless WebP keeps the alpha and skips the optimizer. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/about/pistol.webp"
            alt=""
            aria-hidden="true"
            width={800}
            height={432}
            className={styles.pistol}
            data-pistol
            loading="lazy"
            decoding="async"
          />
          <figcaption className={`label ${styles.caption}`}>Madison, WI — on location</figcaption>
        </figure>
      </div>
    </section>
  );
}
