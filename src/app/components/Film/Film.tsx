import styles from "./film.module.css";
import Video from "next-video";
import carShow from "/videos/car-show.mp4";
import airCar from "/videos/air-car.mp4";
import sunsetVideo from "/videos/sunset-video.mp4";

const Film = () => {
  return (
    <div className={styles.main}>
      {/* <div className={styles.background}>
        
      </div>
      <div className={styles.text}></div> */}
      <Video src={carShow} />
      <Video src={airCar} />
      <Video src={sunsetVideo} />
    </div>
  );
};

export default Film;
