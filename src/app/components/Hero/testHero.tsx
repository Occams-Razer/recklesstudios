import styles from "./testHero.module.css";
import Image from "next/image";
import localFont from "next/font/local";
import Navbar from "../Navbar/Navbar";

const HGHeisei = localFont({
  src: "../../fonts/HGHeiseiMinchotaiW3.ttf",
});
const testHero = () => {
  return (
    <div>
      <div className={styles.main}>
        
        <Navbar />
        <h2 className={styles.studio}>A RECKLESS STUDIOS PRODUCTION.</h2>
        <h2 className={`${styles.title} ${HGHeisei.className}`}>
          ONE LAST SHOT.
        </h2>
        <h2 className={`${styles.directors} ${HGHeisei.className}`}>
          ORIGNIAL SERIES BY RANGER HOWARD AND MAZI DOSSA.
        </h2>
        <p className={`${styles.actors} ${HGHeisei.className}`}>
          DAVEED MUSOMBWA | MIRABELLE NIEBAUER | ISABELLA BERTHELON | MILES
          HAYWARD
          <br />
          ADDISON BEAN | ADAM BROWN | ARI MARCKEL | KAI MARCKEL | LEXI SCHMITZ
        </p>
      </div>
    </div>
  );
};

export default testHero;
