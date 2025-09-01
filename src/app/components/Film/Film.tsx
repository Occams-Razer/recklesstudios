import styles from "./film.module.css";
import Video from "next-video";
import MediaThemeMicrovideo from "player.style/microvideo/react";
import carShow from "/videos/car-show.mp4";
import airCar from "/videos/air-car.mp4";
import sunsetVideo from "/videos/sunset-video.mp4";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
const Film = () => {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: targetRef });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-55%"]);
  return (
    <div className={styles.carousel} ref={targetRef}>
      <div className={styles.contentContainer}>
        <motion.div className={styles.videoItems} style={{ x }}>
          <Video
            src={carShow}
            key="car-show"
            theme={MediaThemeMicrovideo}
            style={{
              "--media-primary-color": "#e93636",
              "--media-secondary-color": "#000000",
              "--media-accent-color": "#16c9c9",
              width: "clamp(10rem, 50vw, 60rem)",
            }}
          />
          <Video
            src={airCar}
            key="air-car"
            theme={MediaThemeMicrovideo}
            style={{
              "--media-primary-color": "#e93636",
              "--media-secondary-color": "#000000",
              "--media-accent-color": "#16c9c9",
              width: "clamp(10rem, 50vw, 60rem)",
            }}
          />
          <Video
            src={sunsetVideo}
            key="sunset-video"
            theme={MediaThemeMicrovideo}
            style={{
              "--media-primary-color": "#e93636",
              "--media-secondary-color": "#000000",
              "--media-accent-color": "#16c9c9",
              width: "clamp(10rem, 50vw, 60rem)",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Film;
