import Image from "next/image";
import styles from "./page.module.css";
import "./style.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <nav id="navbar">
          <h3 className="navText" id="nav1">
            <a href="index.html">home</a>
          </h3>
          <h3 class="navText" id="nav2">
            <a>about</a>
          </h3>
          <h3 class="navText" id="nav3">
            <a>film</a>
          </h3>
          <h3 class="navText" id="nav4">
            <a>services</a>
          </h3>
        </nav>
        <header class="hero">
          <div class="marquee">
            <h1 class="headerText" id="t1">
              RECKLESS•STUDIOS•
            </h1>
            <h1 class="headerText" id="t2">
              RECKLESS•STUDIOS•
            </h1>
          </div>
        </header>
        <section class="about">
          <h2 id="aboutText">
            We are a independent film studio based in madison, wi.
          </h2>
        </section>
        <section class="filmContainer">
          <div class="filmContent">
            <h1>
              <a class="filmText" data-value="the grey code.">
                the grey code.
              </a>
            </h1>
            <div class="filmArrow">Hi</div>
          </div>
          <div class="filmBackground"></div>
        </section>
        <section class="servicesContainer">
          <div class="servicesMarqueeTrack">
            <div class="servicesMarqueeContainer">
              <h4 class="servicesHeader">Services⟡</h4>
              <h4 class="servicesHeader">Services⟡</h4>
              <h4 class="servicesHeader">Services⟡</h4>
              <h4 class="servicesHeader">Services⟡</h4>
              <h4 class="servicesHeader">Services⟡</h4>
              <h4 class="servicesHeader">Services⟡</h4>
              <h4 class="servicesHeader">Services⟡</h4>
              <h4 class="servicesHeader">Services⟡</h4>
              <h4 class="servicesHeader">Services⟡</h4>
              <h4 class="servicesHeader">Services⟡</h4>
              <h4 class="servicesHeader">Services⟡</h4>
              <h4 class="servicesHeader">Services⟡</h4>
              <h4 class="servicesHeader">Services⟡</h4>
              <h4 class="servicesHeader">Services⟡</h4>
              <h4 class="servicesHeader">Services⟡</h4>
              <h4 class="servicesHeader">Services⟡</h4>
              <h4 class="servicesHeader">Services⟡</h4>
              <h4 class="servicesHeader">Services⟡</h4>
              <h4 class="servicesHeader">Services⟡</h4>
              <h4 class="servicesHeader">Services⟡</h4>
            </div>
          </div>
          <div class="servicesContent">
            <div class="servicesPackage">
              <h2 class="packageTitle">The Director's Cut</h2>
            </div>
            <div class="servicesPackage">
              <h2 class="packageTitle">The Full Shoot</h2>
            </div>
            <div class="servicesPackage">
              <h2 class="packageTitle">The Concept Spark</h2>
            </div>
          </div>
        </section>
        <section class="contact"></section>
        {/* <script src="script.js"></script> */}
      </main>
    </div>
  );
}
