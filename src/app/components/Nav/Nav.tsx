"use client";
import { useRef, useState } from "react";
import styles from "./nav.module.css";
import { gsap, ScrollTrigger, useGSAP } from "@/app/lib/gsap";
import { EASE, INTRO } from "@/app/lib/motion";
import { useIntroStep } from "@/app/lib/intro";
import { useScrollTo } from "@/app/lib/useScrollTo";

export const NAV_LINKS = [
  { id: "about", label: "ABOUT", index: "01" },
  { id: "work", label: "WORK", index: "02" },
  { id: "contact", label: "CONTACT", index: "03" },
];

export default function Nav() {
  const scope = useRef<HTMLElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const [theme, setTheme] = useState<"dark" | "signal">("dark");
  const scrollTo = useScrollTo();

  useIntroStep("nav", (tl) => {
    const el = scope.current;
    if (!el) return;
    tl.from(
      el.querySelectorAll("[data-nav-item]"),
      { yPercent: -140, opacity: 0, duration: 0.9, ease: EASE.out, stagger: 0.05 },
      INTRO.nav
    );
  });

  useGSAP(
    () => {
      const sections = document.querySelectorAll<HTMLElement>("[data-section]");
      sections.forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top 50%",
          end: "bottom 50%",
          onToggle: (self) => {
            if (!self.isActive) return;
            setActive(section.id);
            setTheme(section.dataset.navTheme === "signal" ? "signal" : "dark");
          },
        });
      });
    },
    { scope }
  );

  return (
    <header ref={scope} className={styles.nav} data-theme={theme}>
      <a
        href="#top"
        className={styles.wordmark}
        data-nav-item
        onClick={(e) => scrollTo(e, "top")}
        aria-label="Reckless Studios, back to top"
      >
        Reckless Studios<span className={styles.tm}>™</span>
      </a>
      <nav aria-label="Primary">
        <ul className={styles.links}>
          {NAV_LINKS.map((link) => {
            const isActive = active === link.id;
            return (
              <li key={link.id} data-nav-item>
                <a
                  href={`#${link.id}`}
                  className={styles.link}
                  aria-current={isActive ? "location" : undefined}
                  onClick={(e) => scrollTo(e, link.id)}
                >
                  <span className={styles.index} aria-hidden="true">
                    {link.index}
                  </span>
                  <span className={`u-draw ${styles.text}`} aria-current={isActive ? "location" : undefined}>
                    {link.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
