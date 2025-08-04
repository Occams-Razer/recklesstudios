"use client";
import styles from "./page.module.css";
import { useEffect } from "react";
import About from "./components/About/About";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Film from "./components/Film/Film";
import Services from "./components/Services/Services";
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
        {/* <section className="overflow-hidden uppercase bg-[#e93636] w-screen flex justify-center items-center h-full m-0 text-[10vw] font-[600] py-[10vh]"> */}
        <About />
        <Film />
        <Services />
      </div>
    </>
  );
};

export default HomePage;
