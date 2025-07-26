"use client";
import ScrollVelocity from "./components/ScrollVelocity/ScrollVelocity";
import ServiceCard from "./components/ServiceCard/ServiceCard";
import Marquee from "react-fast-marquee";
import DecryptedText from "./components/DecryptedText/DecryptedText";
import Dither from "./backgrounds/Dither/Dither";
import ScrambleText from "./components/ScrambleText/ScrambleText";
import { useEffect } from "react";
import About from "./components/About/About";
const HomePage: React.FC = () => {
  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();
    })();
  }, []);

  return (
    <>
      <div className="flex flex-col font-[family-name:var(--archivo)] m-0 p-0 bg-black text-white w-screen h-full overflow-x-hidden ">
        <nav
          className="sticky py-1 w-full h-fit z-100 text-white flex flex-row gap-[clamp(4vw,4vw,1.5rem)] justify-center bg-opacity-50 backdrop-blur-[50px] "
          id="navbar"
        >
          <h3 className="navText" id="nav1">
            <a
              href="#home"
              className="cursor-pointer text-[clamp(32px,2vw,3rem)] break-words text-white text-center font-archivo font-medium my-[2vh] bg-[position:0_100%] transition-transform duration-250 hover:-translate-y-[0.3rem] active:scale-100 "
            >
              home
            </a>
          </h3>
          <h3 className="navText" id="nav2">
            <a
              href="#about"
              className="scroll-smooth cursor-pointer text-[clamp(32px,2vw,3rem)] break-words text-white text-center font-archivo font-medium my-[2vh] bg-[position:0_100%] transition-transform duration-250 hover:-translate-y-[0.3rem] active:scale-100"
            >
              about
            </a>
          </h3>
          <h3 className="navText" id="nav3">
            <a
              href="#film"
              className="scroll-smooth cursor-pointer text-[clamp(32px,2vw,3rem)] break-words text-white text-center font-archivo font-medium my-[2vh] bg-[position:0_100%] transition-transform duration-250 hover:-translate-y-[0.3rem] active:scale-100"
            >
              film
            </a>
          </h3>
          <h3 className="navText" id="nav4">
            <a
              href="#services"
              className="scroll-smooth cursor-pointer text-[clamp(32px,2vw,3rem)] break-words text-white text-center font-archivo font-medium my-[2vh] bg-[position:0_100%] transition-transform duration-250 hover:-translate-y-[0.3rem] active:scale-100"
            >
              services
            </a>
          </h3>
        </nav>
        <header
          className="overflow-x-hidden w-full h-screen flex items-end text-white bg-black bg-[url(RecklessBackPlaceholder.png)] bg-cover bg-center bg-no-repeat"
          id="home"
          data-scroll
          data-scroll-speed="-0.1"
        >
          <Marquee
            speed={50}
            className="flex flex-row w-fit h-fit mix-blend-exclusion"
          >
            <h1
              className="w-fit h-fit text-white font-[family-name:var(--archivo)] text-[50vh] font-bold m-0 select-none"
              id="t1"
              data-scroll
              data-scroll-speed="0.5"
            >
              RECKLESS•STUDIOS•
            </h1>
            <h1
              className="w-fit h-fit text-white font-[family-name:var(--archivo)] text-[50vh] font-bold m-0 select-none"
              id="t2"
              data-scroll
              data-scroll-speed="0.5"
            >
              RECKLESS•STUDIOS•
            </h1>
          </Marquee>
        </header>
        <section className="overflow-hidden uppercase bg-[#e93636] w-screen flex justify-center items-center h-full m-0 text-[10vw] font-[550] py-[10vh]">
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
