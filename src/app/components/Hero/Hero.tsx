"use client";
import styles from "./hero.module.css";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BackgroundVideo from "next-video/background-video";
import Navbar from "../Navbar/Navbar";
// Update the path to where your video file is actually located
import RecklessBackground from "/videos/reckless-background.mp4";
// import getStarted from "/videos/get-started.mp4";

const Hero = () => {
  const firsText = useRef(null);
  const secondText = useRef(null);
  const marquee = useRef(null);
  let xPercent = 0;
  let direction = -1;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    requestAnimationFrame(animation);
    gsap.to(marquee.current, {
      ScrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: window.innerHeight,
        scrub: 0.25,
        onUpdate: (e: { direction: number }) => (direction = e.direction * 1),
      },
      x: "-500px",
    });
  }, []);

  const animation = () => {
    if (xPercent <= -100) {
      xPercent = 0;
    }
    if (xPercent > 0) {
      xPercent = -100;
    }
    gsap.set(firsText.current, { xPercent: xPercent });
    gsap.set(secondText.current, { xPercent: xPercent });
    xPercent += 0.05 * direction;
    requestAnimationFrame(animation);
  };
  return (
    <div>
      <header
        className={styles.header}
        id="home"
        data-scroll
        data-scroll-speed="-0.1"
      >
        <BackgroundVideo src={RecklessBackground} className={styles.video}>
          <Navbar />
          <div className={styles.marqueeContainer}>
            <div ref={marquee} className={styles.marquee}>
              <h1
                id="t1"
                ref={firsText}
                // data-scroll
                // data-scroll-speed="0.5"
              >
                RECKLESS•STUDIOS•
              </h1>
              <h1
                id="t2"
                ref={secondText}
                // data-scroll
                // data-scroll-speed="0.5"
              >
                RECKLESS•STUDIOS•
              </h1>
            </div>
          </div>
        </BackgroundVideo>
      </header>
    </div>
  );
};

export default Hero;
