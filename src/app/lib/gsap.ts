"use client";
/**
 * Single GSAP entry point. Every component imports from here so plugins
 * are registered exactly once and defaults are shared.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin, useGSAP);

if (typeof window !== "undefined") {
  ScrollTrigger.config({ ignoreMobileResize: true });
  gsap.defaults({ ease: "power3.out", duration: 1 });
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
