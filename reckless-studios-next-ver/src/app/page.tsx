import ScrollVelocity from "./components/ScrollVelocity/ScrollVelocity";

const HomePage: React.FC = () => {
  return (
    <>
      <div className="flex flex-col font-archivo m-0 p-0 bg-black text-white w-screen h-full overflow-x-hidden">
        <nav
          className="sticky w-full h-fit z-100 text-white flex flex-row gap-[clamp(4vw,4vw,1.5rem)] justify-center bg-opacity-50 backdrop-blur-[50px]"
          id="navbar"
        >
          <h3 className="navText" id="nav1">
            <a
              href="#"
              className="cursor-pointer text-[clamp(32px,2vw,3rem)] break-words text-white text-center font-archivo font-medium my-[2vh] bg-[position:0_100%] transition-transform duration-250 hover:-translate-y-[0.3rem] active:scale-100"
            >
              home
            </a>
          </h3>
          <h3 className="navText" id="nav2">
            <a className="cursor-pointer text-[clamp(32px,2vw,3rem)] break-words text-white text-center font-archivo font-medium my-[2vh] bg-[position:0_100%] transition-transform duration-250 hover:-translate-y-[0.3rem] active:scale-100">
              about
            </a>
          </h3>
          <h3 className="navText" id="nav3">
            <a className="cursor-pointer text-[clamp(32px,2vw,3rem)] break-words text-white text-center font-archivo font-medium my-[2vh] bg-[position:0_100%] transition-transform duration-250 hover:-translate-y-[0.3rem] active:scale-100">
              film
            </a>
          </h3>
          <h3 className="navText" id="nav4">
            <a className="cursor-pointer text-[clamp(32px,2vw,3rem)] break-words text-white text-center font-archivo font-medium my-[2vh] bg-[position:0_100%] transition-transform duration-250 hover:-translate-y-[0.3rem] active:scale-100">
              services
            </a>
          </h3>
        </nav>
        <header className="overflow-x-hidden w-full h-screen flex items-end text-white bg-black bg-[url(RecklessBackPlaceholder.png)] bg-cover bg-center bg-no-repeat">
          <div className="w-fit h-fit mix-blend-exclusion">
            <h1
              className="w-fit h-fit text-white font-archivo text-[50vh] font-bold m-0 select-none"
              id="t1"
            >
              RECKLESS•STUDIOS•
            </h1>
            <h1
              className="w-fit h-fit text-white font-archivo text-[50vh] font-bold m-0 select-none"
              id="t2"
            >
              RECKLESS•STUDIOS•
            </h1>
          </div>
        </header>
        <section className="overflow-x-hidden uppercase break-words bg-[#e93636] w-full flex justify-center items-center h-fit">
          <h2
            className="overflow-x-hidden break-words w-full m-0 text-white text-justify font-archivo text-[10vw] font-bold py-[5vh] px-[10vw]"
            id="aboutText"
          >
            We are a independent film studio based in madison, wi.
          </h2>
        </section>
        <section className="relative w-full h-screen">
          <div className="absolute top-0 left-0 w-full h-full bg-repeat bg-[url(BgFilmPlaceholderV2.svg)] bg-[length:50%] bg-blend-darken brightness-50 animate-[pan_30s_linear_infinite]">
            <h1 className="p-[2vh_2vw] relative z-1">
              <a
                href="#"
                className="w-fit m-0 text-[8vw] font-[550] font-['Geist_Mono'] select-none no-underline text-white relative bg-gradient-to-r from-white to-white bg-no-repeat bg-[length:0%_100%] bg-[position:0_100%] transition-all duration-600 ease-in-out hover:bg-[length:100%_100%] hover:text-black before:content-['_']"
                data-value="the grey code."
              >
                the grey code.
              </a>
            </h1>
          </div>
        </section>
        <section className="bg-white w-full h-screen">
          <div className="flex">
            <ScrollVelocity
              texts={["Services", "Services"]}
              velocity={100}
              className="font-archivo text-black font-semibold"
            ></ScrollVelocity>
          </div>
          <div className="w-screen flex justify-center items-center mt-[5vh] gap-[5%] ml-[5vw] text-black">
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
      </div>
    </>
  );
};

export default HomePage;
