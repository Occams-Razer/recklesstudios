"use client";
import styles from "./hero.module.css";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../Navbar/Navbar";
import Image from "next/image";
import localFont from "next/font/local";

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
    <header className={styles.header} id="home">
      <Navbar />
      <Image
        src={"/recklessBackground.gif"}
        alt={"Background photo"}
        fill={true}
        objectFit="cover"
        className={styles.backgroundImage}
      ></Image>
      <div className={styles.marqueeContainer}>
        <div ref={marquee} className={styles.marquee}>
          <h1 ref={firsText}>RECKLESS•STUDIOS•</h1>
          <h1 ref={secondText}>RECKLESS•STUDIOS•</h1>
        </div>
      </div>
    </header>
  );
};

export default Hero;
