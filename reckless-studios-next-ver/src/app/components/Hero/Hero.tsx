"use client";
import Image from "next/image";
import styles from "./hero.module.css";
import Video from "next-video";
import RecklessBackground from "/videos/RecklessBackground.mp4";
import gsap from "gsap";
import { useEffect, useRef } from "react";

const Hero = () => {
  const firsText = useRef(null);
  const secondText = useRef(null);
  let xPercent = 0;
  let direction = -1;

  useEffect(() => {
    requestAnimationFrame(animation);
  }, []);

  const animation = () => {
    if (xPercent <= -100) {
      xPercent = 0;
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
        <video width="100vw" height="100vh" loop autoPlay muted>
          <source src="/RecklessBackground.mp4" />
        </video>
        <div className={styles.marqueeContainer}>
          <div className={styles.marquee}>
            <h1
              className="w-fit h-fit text-white font-[family-name:var(--archivo)] text-[50vh] font-bold m-0 select-none"
              id="t1"
              ref={firsText}
              // data-scroll
              // data-scroll-speed="0.5"
            >
              RECKLESS•STUDIOS•
            </h1>
            <h1
              className="w-fit h-fit text-white font-[family-name:var(--archivo)] text-[50vh] font-bold m-0 select-none"
              id="t2"
              ref={secondText}
              // data-scroll
              // data-scroll-speed="0.5"
            >
              RECKLESS•STUDIOS•
            </h1>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Hero;
