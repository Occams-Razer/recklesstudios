"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type MuxPlayerElement from "@mux/mux-player";
import styles from "./work.module.css";
import { playbackId, posterUrl, type FilmProject } from "@/app/data/projects";
import { gsap, ScrollTrigger, useGSAP } from "@/app/lib/gsap";
import { MOTION_OK, DESKTOP, FINE_POINTER, EASE, DUR, prefersReducedMotion } from "@/app/lib/motion";

const MuxPlayer = dynamic(() => import("@mux/mux-player-react/lazy"), { ssr: false });

type Props = {
  film: FilmProject;
  layout: "a" | "b" | "c";
  reveal: "bottom" | "left" | "right";
  /** Play the muted preview whenever the card is in view (not only on hover). */
  autoplayInView?: boolean;
  onOpen: (film: FilmProject, trigger: HTMLElement) => void;
};

const CLIP: Record<Props["reveal"], string> = {
  bottom: "inset(0 0 100% 0)",
  left: "inset(0 100% 0 0)",
  right: "inset(0 0 0 100%)",
};

export default function FilmCard({ film, layout, reveal, autoplayInView = false, onOpen }: Props) {
  const scope = useRef<HTMLElement>(null);
  const player = useRef<MuxPlayerElement>(null);
  const [near, setNear] = useState(false);
  const [playing, setPlaying] = useState(false);
  const id = playbackId(film.asset);

  // Mount the player only when the card is near the viewport (and motion is allowed).
  useEffect(() => {
    const el = scope.current;
    if (!el || !id || prefersReducedMotion()) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "320px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [id]);

  const play = () => player.current?.play().catch(() => {});
  const pause = () => {
    const p = player.current;
    if (!p) return;
    p.pause();
  };

  useGSAP(
    () => {
      const el = scope.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const media = el.querySelector<HTMLElement>("[data-media]");
        const inner = el.querySelector<HTMLElement>("[data-inner]");
        const meta = el.querySelectorAll<HTMLElement>("[data-meta] > *");
        gsap.from(media, {
          clipPath: CLIP[reveal],
          duration: DUR.image,
          ease: EASE.out,
          scrollTrigger: { trigger: el, start: "top 78%", once: true },
        });
        gsap.from(inner, {
          scale: 1.15,
          duration: DUR.image + 0.3,
          ease: EASE.out,
          scrollTrigger: { trigger: el, start: "top 78%", once: true },
        });
        gsap.from(meta, {
          opacity: 0,
          y: 16,
          duration: 0.8,
          ease: EASE.out,
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 70%", once: true },
        });
      });

      // Subtle horizontal drift tied to scroll, desktop only.
      mm.add(`${MOTION_OK} and ${DESKTOP}`, () => {
        const dir = layout === "b" ? -1 : 1;
        gsap.fromTo(
          el,
          { x: dir * 36 },
          {
            x: dir * -36,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 },
          }
        );
      });

      // In-view autoplay on touch devices, or for the lead card everywhere.
      mm.add(
        {
          ok: MOTION_OK,
          fine: FINE_POINTER,
        },
        (ctx) => {
          const { ok, fine } = ctx.conditions ?? {};
          if (!ok) return;
          if (!autoplayInView && fine) return;
          ScrollTrigger.create({
            trigger: el,
            start: "top 70%",
            end: "bottom 30%",
            onToggle: (self) => (self.isActive ? play() : pause()),
          });
        }
      );
    },
    { scope, dependencies: [layout, reveal, autoplayInView], revertOnUpdate: true }
  );

  // Hover previews for fine pointers.
  const hoverProps = {
    onPointerEnter: (e: React.PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      play();
    },
    onPointerLeave: (e: React.PointerEvent) => {
      if (e.pointerType !== "mouse" || autoplayInView) return;
      pause();
    },
  };

  return (
    <article
      ref={scope}
      className={styles.card}
      data-layout={layout}
      data-playing={playing || undefined}
      aria-labelledby={`film-${film.slug}`}
      {...hoverProps}
    >
      <button
        type="button"
        className={styles.media}
        data-media
        data-cursor="Play"
        aria-label={`Play ${film.title}`}
        onClick={(e) => onOpen(film, e.currentTarget)}
        style={{ aspectRatio: film.ratio }}
      >
        <div className={styles.mediaInner} data-inner>
          {id && (
            // Mux already serves resized WebP thumbnails, so these bypass
            // next/image (whose optimizer times out on cold Mux renders).
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={posterUrl(film.asset, 1280)}
              srcSet={[640, 960, 1280, 1920]
                .map((w) => `${posterUrl(film.asset, w)} ${w}w`)
                .join(", ")}
              sizes="(min-width: 900px) 66vw, 100vw"
              alt=""
              className={styles.poster}
              loading="lazy"
              decoding="async"
              style={
                film.asset.blurDataURL
                  ? { backgroundImage: `url(${film.asset.blurDataURL})` }
                  : undefined
              }
            />
          )}
          {near && id && (
            <MuxPlayer
              ref={player}
              playbackId={id}
              loading="viewport"
              muted
              loop
              playsInline
              preload="metadata"
              nohotkeys
              maxResolution="720p"
              streamType="on-demand"
              className={styles.player}
              onPlaying={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              style={
                {
                  "--controls": "none",
                  "--media-object-fit": "cover",
                  "--media-object-position": "center",
                } as React.CSSProperties
              }
            />
          )}
        </div>
        <span className={`label ${styles.playHint}`} aria-hidden="true">
          Play
        </span>
      </button>

      <div className={styles.meta} data-meta>
        <p className={`label ${styles.cardIndex}`}>{film.index}</p>
        <h3 id={`film-${film.slug}`} className={styles.cardTitle}>
          {film.title}
        </h3>
        <p className={`label ${styles.cardYear}`}>{film.year}</p>
        <button
          type="button"
          className={`link-arrow ${styles.watch}`}
          onClick={(e) => onOpen(film, e.currentTarget)}
        >
          <span className="u-draw">Watch</span>
          <span className="arrow" aria-hidden="true">
            →
          </span>
        </button>
      </div>
    </article>
  );
}
