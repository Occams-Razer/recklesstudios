import styles from "./film.module.css";
import Video from "next-video";
import MediaThemeMicrovideo from "player.style/microvideo/react";
import carShow from "/videos/car-show.mp4";
import airCar from "/videos/air-car.mp4";
import sunsetVideo from "/videos/sunset-video.mp4";
import football from "/videos/football.mp4";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect } from "react";
import ScrollVelocity from "../ScrollVelocity/ScrollVelocity";

const Film = () => {
  return (
    <div className={styles.contentContainer}>
      <h2 className={styles.title}>
        <ScrollVelocity texts={["OUR WORK -", "OUR WORK -"]} />
      </h2>
      <div className={styles.videoGrid}>
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
          className="panel"
        />
        <Video
          src={football}
          key="air-car"
          theme={MediaThemeMicrovideo}
          style={{
            "--media-primary-color": "#e93636",
            "--media-secondary-color": "#000000",
            "--media-accent-color": "#16c9c9",
            width: "clamp(10rem, 50vw, 60rem)",
          }}
          className="panel"
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
          className="panel"
        />
      </div>
    </div>
  );
};

export default Film;
