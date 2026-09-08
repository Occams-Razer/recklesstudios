"use client";
import { useRef } from "react";
import styles from "./footer.module.css";
import Marquee from "../Marquee/Marquee";
import { NAV_LINKS } from "../Nav/Nav";
import { CONTACT } from "../Contact/Contact";
import { useScrollTo } from "@/app/lib/useScrollTo";
import { gsap, useGSAP } from "@/app/lib/gsap";
import { MOTION_OK, EASE } from "@/app/lib/motion";

export default function Footer() {
  const scope = useRef<HTMLElement>(null);
  const scrollTo = useScrollTo();
  const year = new Date().getFullYear();

  useGSAP(
    () => {
      const el = scope.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const rules = el.querySelectorAll<HTMLElement>("[data-rule]");
        const items = el.querySelectorAll<HTMLElement>("[data-item]");
        gsap.from(rules, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.2,
          ease: EASE.out,
          stagger: 0.15,
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
        gsap.from(items, {
          opacity: 0,
          y: 12,
          duration: 0.8,
          ease: EASE.out,
          stagger: 0.06,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });
    },
    { scope }
  );

  return (
    <footer ref={scope} className={styles.footer}>
      <div className={styles.ticker} aria-hidden="true">
        <Marquee text="RECKLESS•STUDIOS•" className={styles.tickerText} copies={6} speed={40} reactive={false} />
      </div>

      <div className={styles.rule} data-rule aria-hidden="true" />

      <div className={`grid-12 ${styles.row}`}>
        <nav className={styles.col} aria-label="Footer" data-item>
          <span className={`label ${styles.colLabel}`}>Index</span>
          <ul className={styles.list}>
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} className="u-draw" onClick={(e) => scrollTo(e, link.id)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.col} data-item>
          <span className={`label ${styles.colLabel}`}>Contact</span>
          <ul className={styles.list}>
            <li>
              <a href={`mailto:${CONTACT.email}`} className="u-draw">
                {CONTACT.email}
              </a>
            </li>
            <li>
              <a
                href={CONTACT.instagramHref}
                className="u-draw"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="↗"
              >
                Instagram <span aria-hidden="true">↗</span>
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.col} data-item>
          <span className={`label ${styles.colLabel}`}>Studio</span>
          <p className={styles.text}>Madison, Wisconsin</p>
          <p className={styles.text}>Independent film studio</p>
        </div>

        <div className={`${styles.col} ${styles.colEnd}`} data-item>
          <a href="#top" className={`link-arrow ${styles.top}`} onClick={(e) => scrollTo(e, "top")}>
            <span className="u-draw">Back to top</span>
            <span className={`arrow ${styles.topArrow}`} aria-hidden="true">
              ↑
            </span>
          </a>
        </div>
      </div>

      <div className={styles.rule} data-rule aria-hidden="true" />

      <div className={styles.legal} data-item>
        <p className="label">© {year} Reckless Studios</p>
        <p className="label">Reckless Studios™</p>
      </div>
    </footer>
  );
}
