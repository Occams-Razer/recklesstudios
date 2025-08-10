"use client";
import styles from "./page.module.css";
import { useEffect } from "react";
import About from "./components/About/About";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Film from "./components/Film/Film";
import Services from "./components/Services/Services";
import Image from "next/image";
import Lenis from "lenis";

const HomePage: React.FC = () => {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);
  return (
    <>
      <div className={styles.main}>
        <Navbar />
        <Hero />
        <About />
        <Film />
        <Services />
        <footer className={styles.footer}>
          <div className={styles.nav}>
            <p>
              <a href="#">home</a>
            </p>
            <p>
              <a href="">about</a>
            </p>
            <p>
              <a href="">our work</a>
            </p>
            <p>
              <a href="">contact</a>
            </p>
          </div>
          <div className={styles.media}>
            <a
              href="https://www.instagram.com/recklessstudiosfilm/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/instagram_svgrepo.com.svg"
                width={24}
                height={24}
                alt="Instagram Icon"
                className={styles.socialIcon}
              />
            </a>
            {/* <p>{"[x]"}</p> */}
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
