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

const Film = () => {
  const carouselRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let sections = gsap.utils.toArray(".panel");

    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: carouselRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: "+=1000",
      },
    });
  }, []);

  return (
    <div className={styles.carousel} ref={carouselRef}>
      <div className={styles.contentContainer}>
        <div className={styles.videoItems}>
          <div className="panel">
            <h2 className={styles.title}>
              Our <br></br>work
            </h2>
          </div>
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
    </div>
  );
};

export default Film;
