import ScrambleText from "../ScrambleText/ScrambleText";
import Dither from "../../backgrounds/Dither/Dither";
import styles from "./film.module.css";
const Film = () => {
  return (
    <div className={styles.main}>
      <div className={styles.background}>
        {/* <Dither
          waveColor={[0.4, 0.4, 0.4]}
          disableAnimation={false}
          enableMouseInteraction={false}
          colorNum={4}
          waveAmplitude={0.2}
          waveFrequency={3}
          waveSpeed={0.05}
        /> */}
      </div>
      <div className={styles.text}>
        <ScrambleText />
      </div>
    </div>
  );
};

export default Film;
