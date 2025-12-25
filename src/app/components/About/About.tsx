import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef, useState } from "react";
import styles from "./about.module.css";
import Image from "next/image";
import { useScramble } from "use-scramble";
import { useInView } from "react-intersection-observer";

export default function description() {
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const { ref: containerRef, inView } = useInView({
    threshold: 0.3, // Trigger when 30% of component is visible
  });

  const { ref: headerText, replay: scrambleHeader } = useScramble({
    text: "Reckless Studios is an independent film studio in Madison, WI.",
    playOnMount: false,
  });
  const { ref: bodyText, replay: scrambleBody } = useScramble({
    text: "We create thoughtful, high-quality short films for audiences across the world.",
    playOnMount: false,
  });
  const { ref: learnMore, replay: scrambleLearnMore } = useScramble({
    text: "Learn more",
    playOnMount: false,
  });

  useLayoutEffect(() => {
    if (inView && !animationPlayed) {
      // Trigger animations in sequence
      setTimeout(() => scrambleHeader(), 0);
      setTimeout(() => scrambleBody(), 0);
      setTimeout(() => scrambleLearnMore(), 300);
      setAnimationPlayed(true);
    }
  }, [inView, animationPlayed, scrambleBody, scrambleLearnMore]);

  return (
    <div className={styles.main} ref={containerRef}>
      <h2 className={styles.headerText} ref={headerText}></h2>
      <div className={styles.sidebar}>
        <Image
          src="/gunGraphic.svg"
          className={styles.graphic}
          width={100}
          height={100}
          alt="Cherish the gun."
        />
      </div>
      <div className={styles.body}>
        <p ref={bodyText}></p>
        <a ref={learnMore}></a>
      </div>
    </div>
  );
}
