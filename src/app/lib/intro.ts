"use client";
/**
 * Intro (page-load) choreography.
 *
 * Components register a "builder" that adds their tweens to the shared
 * intro timeline. The Preloader owns the timeline: it waits for fonts and a
 * minimum curtain time, runs every builder, then plays. Keyed registration
 * means StrictMode / HMR re-registration overwrites instead of duplicating.
 */
import { useLayoutEffect, useRef } from "react";
import type { gsap } from "./gsap";

export type IntroBuilder = (tl: gsap.core.Timeline) => void;

const builders = new Map<string, IntroBuilder>();
const listeners = new Set<() => void>();
let introDone = false;

export function registerIntro(key: string, fn: IntroBuilder) {
  builders.set(key, fn);
  return () => {
    builders.delete(key);
  };
}

export function introBuilders(): IntroBuilder[] {
  return [...builders.values()];
}

export function markIntroDone() {
  introDone = true;
  listeners.forEach((l) => l());
  listeners.clear();
}

export function isIntroDone() {
  return introDone;
}

/** Resolves once the intro has finished (immediately if it already has). */
export function onIntroDone(cb: () => void) {
  if (introDone) {
    cb();
    return () => {};
  }
  listeners.add(cb);
  return () => listeners.delete(cb);
}

/** Register an intro builder from a component. The fn ref is kept fresh. */
export function useIntroStep(key: string, fn: IntroBuilder) {
  const ref = useRef(fn);
  ref.current = fn;
  useLayoutEffect(() => registerIntro(key, (tl) => ref.current(tl)), [key]);
}

/** Session flag so repeat visits get a shorter curtain. */
export const SEEN_KEY = "rs:intro-seen";

export function hasSeenIntro() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

export function rememberIntro() {
  try {
    sessionStorage.setItem(SEEN_KEY, "1");
  } catch {
    /* private mode etc. */
  }
}
