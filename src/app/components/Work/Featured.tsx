"use client";
import { useRef } from "react";
import Image from "next/image";
import styles from "./work.module.css";
import { featured } from "@/app/data/projects";
import { gsap, SplitText, useGSAP } from "@/app/lib/gsap";
import { MOTION_OK, DESKTOP, EASE, DUR } from "@/app/lib/motion";

/**
 * The featured project, presented as a one-sheet: image, serif title,
 * byline, cast. Pinned briefly on desktop while the image settles.
 */
export default function Featured() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = scope.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const media = el.querySelector<HTMLElement>("[data-media]");
        const img = el.querySelector<HTMLElement>("[data-img]");
        const title = el.querySelector<HTMLElement>("[data-title]");
        const rows = el.querySelectorAll<HTMLElement>("[data-row]");

        gsap.from(media, {
          clipPath: "inset(12% 8% 12% 8%)",
          duration: DUR.image + 0.4,
          ease: EASE.out,
          scrollTrigger: { trigger: el, start: "top 75%", once: true },
        });
        gsap.from(img, {
          scale: 1.18,
          duration: DUR.image + 0.6,
          ease: EASE.out,
          scrollTrigger: { trigger: el, start: "top 75%", once: true },
        });

        const split = title
          ? SplitText.create(title, {
              type: "chars,words",
              mask: "chars",
              charsClass: "char",
              onSplit: (self) =>
                gsap.from(self.chars, {
                  yPercent: 115,
                  duration: 1.2,
                  ease: EASE.out,
                  stagger: 0.028,
                  scrollTrigger: { trigger: title, start: "top 80%", once: true },
                }),
            })
          : null;

        gsap.from(rows, {
          opacity: 0,
          y: 18,
          duration: 0.9,
          ease: EASE.out,
          stagger: 0.12,
          scrollTrigger: { trigger: title ?? el, start: "top 75%", once: true },
        });

        return () => split?.revert();
      });

      mm.add(`${MOTION_OK} and ${DESKTOP}`, () => {
        const img = el.querySelector<HTMLElement>("[data-img]");
        const text = el.querySelector<HTMLElement>("[data-text]");
        gsap.to(img, {
          yPercent: 10,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        });
        gsap.to(text, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    },
    { scope }
  );

  const { image } = featured;

  return (
    <article ref={scope} className={styles.featured} aria-labelledby="featured-title">
      <div className={styles.featuredMedia} data-media>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="100vw"
          quality={70}
          className={styles.featuredImg}
          data-img
        />
        <div className={styles.featuredShade} aria-hidden="true" />
      </div>

      <div className={`grid-12 ${styles.featuredText}`} data-text>
        <p className={`label ${styles.featuredKicker}`} data-row>
          {featured.index} — {featured.production}
        </p>
        <h3 id="featured-title" className={styles.posterTitle} data-title>
          {featured.title}
        </h3>
        <p className={styles.byline} data-row>
          {featured.byline}
        </p>
        <ul className={styles.cast} data-row aria-label="Cast">
          {featured.cast.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
        <p className={`label ${styles.featuredYear}`} data-row>
          Original series — {featured.year}
        </p>
      </div>
    </article>
  );
}
