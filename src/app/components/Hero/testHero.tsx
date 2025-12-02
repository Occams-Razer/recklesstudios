import styles from "./testHero.module.css";
import Image from "next/image";
const testHero = () => {
  return (
    <div className={styles.main}>
      {/* <Image
        fill={true}
        objectFit="cover"
        alt="Background photo"
        src="/Daveed.JPG"
        className={styles.background}
      /> */}
      <h2>A RECKLESS STUDIOS PRODUCTION.</h2>
      <h2 className={styles.title}>ONE LAST SHOT.</h2>
      <h2 className={styles.directors}>
        ORIGNIAL SERIES BY RANGER HOWARD AND MAZI DOSSA.
      </h2>
    </div>
  );
};

export default testHero;
