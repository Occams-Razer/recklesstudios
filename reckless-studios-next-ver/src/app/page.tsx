"use client";
import styles from "./page.module.css";
import ScrollVelocity from "./components/ScrollVelocity/ScrollVelocity";
import ServiceCard from "./components/ServiceCard/ServiceCard";
import Marquee from "react-fast-marquee";
import DecryptedText from "./components/DecryptedText/DecryptedText";
import Dither from "./backgrounds/Dither/Dither";
import ScrambleText from "./components/ScrambleText/ScrambleText";
import { useEffect } from "react";
import About from "./components/About/About";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
const HomePage: React.FC = () => {
  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();
    })();
  }, []);

  return (
    <>
      <div className={styles.main}>
        <Navbar />
        <Hero />
        <section className="overflow-hidden uppercase bg-[#e93636] w-screen flex justify-center items-center h-full m-0 text-[10vw] font-[600] py-[10vh]">
          <About />
        </section>
        <section className="relative w-full h-full" id="film">
          <div className="w-full h-screen relative z-0">
            <Dither
              waveColor={[0.4, 0.4, 0.4]}
              disableAnimation={false}
              enableMouseInteraction={false}
              colorNum={4}
              waveAmplitude={0.2}
              waveFrequency={3}
              waveSpeed={0.05}
            />
          </div>
          <div className="flex justify-center items-center absolute top-0 left-0 w-full h-full">
            <ScrambleText />
          </div>
        </section>
        <section
          className="bg-white w-full h-screen flex justify-start font-archivo"
          id="services"
        >
          <h2 className="text-black">
            Got an idea? Let's create something great.
          </h2>
        </section>
      </div>
    </>
  );
};

export default HomePage;
