"use client";
import { useRef } from "react";
import styles from "./contact.module.css";
import { gsap, SplitText, useGSAP } from "@/app/lib/gsap";
import { MOTION_OK, EASE, DUR, REVEAL_TRIGGER, SCRAMBLE } from "@/app/lib/motion";

export const CONTACT = {
  email: "reckllessstudios@gmail.com",
  phone: "(608) 370-0493",
  phoneHref: "tel:+16083700493",
  instagram: "recklessstudiosfilm",
  instagramHref: "https://www.instagram.com/recklessstudiosfilm/",
};

export default function Contact() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = scope.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const headline = el.querySelector<HTMLElement>("[data-split]");
        const label = el.querySelector<HTMLElement>("[data-scramble]");
        const rows = el.querySelectorAll<HTMLElement>("[data-row]");
        const rule = el.querySelector<HTMLElement>("[data-rule]");

        // The red panel wipes up over the black work section.
        gsap.from(el, {
          clipPath: "inset(100% 0 0 0)",
          duration: 1.3,
          ease: EASE.out,
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });

        const split = headline
          ? SplitText.create(headline, {
              type: "lines,words",
              mask: "lines",
              linesClass: "line",
              autoSplit: true,
              onSplit: (self) =>
                gsap.from(self.words, {
                  yPercent: 110,
                  duration: DUR.reveal + 0.1,
                  ease: EASE.out,
                  stagger: 0.05,
                  scrollTrigger: { trigger: headline, start: "top 80%", once: true },
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

        if (rule) {
          gsap.from(rule, {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 1.2,
            ease: EASE.out,
            scrollTrigger: { trigger: rule, start: "top 90%", once: true },
          });
        }

        gsap.from(rows, {
          opacity: 0,
          y: 20,
          duration: 0.9,
          ease: EASE.out,
          stagger: 0.1,
          scrollTrigger: { trigger: rows[0], start: "top 88%", once: true },
        });

        return () => split?.revert();
      });
    },
    { scope }
  );

  return (
    <section
      ref={scope}
      id="contact"
      className={styles.contact}
      data-section
      data-nav-theme="signal"
      tabIndex={-1}
      aria-labelledby="contact-title"
    >
      <p className={`label ${styles.index}`} data-scramble="03 — Contact">
        03 — CONTACT
      </p>

      <h2 id="contact-title" className={styles.headline} data-split>
        LET&rsquo;S MAKE SOMETHING GREAT.
      </h2>

      <div className={styles.rule} data-rule aria-hidden="true" />

      <div className={`grid-12 ${styles.row}`}>
        <a href={`mailto:${CONTACT.email}`} className={`link-arrow ${styles.email}`} data-row>
          <span className={`u-draw ${styles.emailText}`}>{CONTACT.email}</span>
          <span className="arrow" aria-hidden="true">
            ↗
          </span>
        </a>

        <div className={styles.cell} data-row>
          <span className={`label ${styles.cellLabel}`}>Phone</span>
          <a href={CONTACT.phoneHref} className={`u-draw ${styles.cellLink}`}>
            {CONTACT.phone}
          </a>
        </div>

        <div className={styles.cell} data-row>
          <span className={`label ${styles.cellLabel}`}>Instagram</span>
          <a
            href={CONTACT.instagramHref}
            className={`u-draw ${styles.cellLink}`}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="↗"
          >
            @{CONTACT.instagram}
          </a>
        </div>
      </div>
    </section>
  );
}
