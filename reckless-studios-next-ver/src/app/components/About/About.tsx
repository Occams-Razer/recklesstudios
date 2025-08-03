import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import styles from "./about.module.css";

export default function description() {
  const phrases = [
    "We are a",
    "Independent",
    "Film Studio",
    "Based in",
    "Madison, WI.",
  ];
  return (
    <div className={styles.about}>
      {phrases.map((phrase, index) => {
        return (
          <AnimatedText className={styles.aboutText} key={index}>
            {phrase}
          </AnimatedText>
        );
      })}
    </div>
  );
}

function AnimatedText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const text = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(text.current, {
      scrollTrigger: {
        trigger: text.current,
        start: "0px bottom",
        end: "bottom+=400px bottom",
        scrub: true,
      },
      left: "-200px",
      opacity: 0,
      translateY: 100,
    });
  }, []);

  return (
    <div ref={text} className={className}>
      {children}
    </div>
  );
}
