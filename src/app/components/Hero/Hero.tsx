"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./hero.module.css";
import Marquee from "../Marquee/Marquee";
import { gsap, useGSAP } from "@/app/lib/gsap";
import { MOTION_OK, EASE, DUR, INTRO, SCRAMBLE } from "@/app/lib/motion";
import { useIntroStep } from "@/app/lib/intro";

const WORDMARK = "RECKLESS•STUDIOS•";

function useMadisonTime() {
  const [time, setTime] = useState<string>("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Chicago",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZoneName: "short",
    });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = window.setInterval(update, 15_000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

export default function Hero() {
  const scope = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);
  const time = useMadisonTime();

  useEffect(() => {
    const mq = window.matchMedia(MOTION_OK);
    const update = () => setReduced(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Pause the loop when the hero is off screen.
  useEffect(() => {
    const el = video.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  useIntroStep("hero", (tl) => {
    const el = scope.current;
    if (!el) return;
    const marquee = el.querySelector("[data-marquee]");
    const meta = el.querySelectorAll<HTMLElement>("[data-scramble]");
    const fades = el.querySelectorAll<HTMLElement>("[data-fade]");
    const media = el.querySelector("[data-media]");

    tl.from(
      marquee,
      { yPercent: 110, duration: DUR.reveal + 0.2, ease: EASE.out },
      INTRO.marquee
    );
    tl.from(media, { opacity: 0, duration: 1.2, ease: EASE.soft }, INTRO.video);
    meta.forEach((node, i) => {
      const text = node.dataset.scramble || node.textContent || "";
      tl.fromTo(node, { opacity: 0 }, { opacity: 1, duration: 0.3 }, INTRO.meta + i * 0.08);
      tl.to(
        node,
        {
          duration: 0.9,
          scrambleText: {
            text,
            chars: SCRAMBLE.chars,
            speed: SCRAMBLE.speed,
            revealDelay: SCRAMBLE.revealDelay,
          },
        },
        INTRO.meta + i * 0.08
      );
    });
    tl.from(fades, { opacity: 0, y: 8, duration: 0.6, stagger: 0.08 }, INTRO.meta + 0.3);
  });

  useGSAP(
    () => {
      const el = scope.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const marquee = el.querySelector("[data-marquee-mask]");
        const media = el.querySelector("[data-media]");
        const cue = el.querySelector("[data-cue]");
        const st = { trigger: el, start: "top top", end: "bottom top", scrub: true };
        gsap.to(marquee, { yPercent: 22, ease: "none", scrollTrigger: st });
        gsap.to(media, { opacity: 0.35, ease: "none", scrollTrigger: st });
        gsap.to(cue, {
          opacity: 0,
          y: -8,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "10% top", scrub: true },
        });
      });
    },
    { scope }
  );

  return (
    <section
      ref={scope}
      id="top"
      className={styles.hero}
      data-section
      data-nav-theme="dark"
      aria-label="Reckless Studios"
    >
      <h1 className="sr-only">Reckless Studios — independent film studio, Madison, Wisconsin</h1>

      <div className={styles.media} data-media aria-hidden="true">
        {reduced ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className={styles.still} src="/hero/pistol-still.png" alt="" width={1280} height={800} />
        ) : (
          <video
            ref={video}
            className={styles.video}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
          >
            <source src="/hero/pistol.webm" type="video/webm" />
            <source src="/hero/pistol.mp4" type="video/mp4" />
          </video>
        )}
      </div>

      <div className={`grid-12 ${styles.meta}`}>
        <p className={`label ${styles.location}`}>
          <span data-scramble="Independent film studio">Independent film studio</span>
          <span data-scramble="Madison, Wisconsin">Madison, Wisconsin</span>
        </p>
        <p className={`label ${styles.clock}`}>
          <span data-fade suppressHydrationWarning>
            {time ? `Madison — ${time}` : " "}
          </span>
          <span data-cue data-fade className={styles.cue}>
            Scroll <span aria-hidden="true">↓</span>
          </span>
        </p>
      </div>

      <div className={styles.marqueeMask} data-marquee-mask>
        <div data-marquee>
          <Marquee text={WORDMARK} className={styles.marquee} speed={110} />
        </div>
      </div>
    </section>
  );
}
