import Image from "next/image";
// import styles from "./page.module.css";
import styles from "./style.css";
import "./script.js";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <nav id="navbar">
          <h3 className="navText" id="nav1">
            <a href="index.html">home</a>
          </h3>
          <h3 className="navText" id="nav2">
            <a>about</a>
          </h3>
          <h3 className="navText" id="nav3">
            <a>film</a>
          </h3>
          <h3 className="navText" id="nav4">
            <a>services</a>
          </h3>
        </nav>
        <header className="hero">
          <div className="marquee">
            <h1 className="headerText" id="t1">
              RECKLESS•STUDIOS•
            </h1>
            <h1 className="headerText" id="t2">
              RECKLESS•STUDIOS•
            </h1>
          </div>
        </header>
        <section className="about">
          <h2 id="aboutText">
            We are a independent film studio based in madison, wi.
          </h2>
        </section>
        <section className="filmContainer">
          <div className="filmContent">
            <h1>
              <a className="filmText" data-value="the grey code.">
                the grey code.
              </a>
            </h1>
            <div className="filmArrow">Hi</div>
          </div>
          <div className="filmBackground"></div>
        </section>
        <section className="servicesContainer">
          <div className="servicesMarqueeTrack">
            <div className="servicesMarqueeContainer">
              <h4 className="servicesHeader">Services⟡</h4>
              <h4 className="servicesHeader">Services⟡</h4>
              <h4 className="servicesHeader">Services⟡</h4>
              <h4 className="servicesHeader">Services⟡</h4>
              <h4 className="servicesHeader">Services⟡</h4>
              <h4 className="servicesHeader">Services⟡</h4>
              <h4 className="servicesHeader">Services⟡</h4>
              <h4 className="servicesHeader">Services⟡</h4>
              <h4 className="servicesHeader">Services⟡</h4>
              <h4 className="servicesHeader">Services⟡</h4>
              <h4 className="servicesHeader">Services⟡</h4>
              <h4 className="servicesHeader">Services⟡</h4>
              <h4 className="servicesHeader">Services⟡</h4>
              <h4 className="servicesHeader">Services⟡</h4>
              <h4 className="servicesHeader">Services⟡</h4>
              <h4 className="servicesHeader">Services⟡</h4>
              <h4 className="servicesHeader">Services⟡</h4>
              <h4 className="servicesHeader">Services⟡</h4>
              <h4 className="servicesHeader">Services⟡</h4>
              <h4 className="servicesHeader">Services⟡</h4>
            </div>
          </div>
          <div className="servicesContent">
            <div className="servicesPackage">
              <h2 className="packageTitle">The Director's Cut</h2>
            </div>
            <div className="servicesPackage">
              <h2 className="packageTitle">The Full Shoot</h2>
            </div>
            <div className="servicesPackage">
              <h2 className="packageTitle">The Concept Spark</h2>
            </div>
          </div>
        </section>
        <section className="contact"></section>
        <script src="script.js"></script>
      </main>
    </div>
  );
}
