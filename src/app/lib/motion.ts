/**
 * Shared motion vocabulary. Keep every duration/ease/position here so the
 * whole site moves with one voice.
 */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const DESKTOP = "(min-width: 768px)";
export const FINE_POINTER = "(hover: hover) and (pointer: fine)";

export const EASE = {
  out: "expo.out",
  soft: "power3.out",
  inOut: "expo.inOut",
  none: "none",
} as const;

export const DUR = {
  fast: 0.35,
  reveal: 1.1,
  image: 1.4,
  curtain: 1.1,
} as const;

/** Absolute positions (seconds) on the intro timeline. */
export const INTRO = {
  curtain: 0,
  marquee: 0.35,
  meta: 0.9,
  video: 1.0,
  nav: 1.15,
} as const;

export const SCRAMBLE_CHARS = "▪▫■□▮▯░▒▓•·—";

export const SCRAMBLE = {
  chars: SCRAMBLE_CHARS,
  speed: 0.6,
  revealDelay: 0.15,
} as const;

/** Standard scroll reveal trigger config. */
export const REVEAL_TRIGGER = {
  start: "top 85%",
  once: true,
} as const;

export const hasFinePointer = () =>
  typeof window !== "undefined" && window.matchMedia(FINE_POINTER).matches;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && !window.matchMedia(MOTION_OK).matches;
