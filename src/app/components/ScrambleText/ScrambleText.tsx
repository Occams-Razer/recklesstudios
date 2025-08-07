"use client";
import { useScramble } from "use-scramble";

const ScrambleText = () => {
  const { ref: titleRef, replay: titleReplay } = useScramble({
    playOnMount: true,
    text: "the gray code",
    speed: 0.6,
    tick: 1,
  });
  const { ref: directorRef, replay: directorReplay } = useScramble({
    playOnMount: false,
    text: "directed_by_ranger_howard",
    speed: 0.4,
    tick: 1,
    overdrive: true,
    scramble: 7,
    step: 0.5,
  });
  const { ref: releaseRef, replay: releaseReplay } = useScramble({
    playOnMount: false,
    text: "release? TBD",
    speed: 0.4,
    tick: 1,
    overdrive: true,
    scramble: 7,
    step: 0.5,
  });

  const handleMouseOver = () => {
    titleReplay();
    directorReplay();
    releaseReplay();
  };

  return (
    <div className="flex justify-center flex-col">
      <h2>
        <a
          ref={titleRef}
          onMouseOver={handleMouseOver}
          href="#"
          className="w-fit m-0 text-[8vw] font-[550] text-center font-['Geist_Mono'] select-none no-underline text-white relative bg-gradient-to-r from-white to-white bg-no-repeat bg-[length:0%_100%] bg-[position:0_100%] transition-all duration-600 ease-in-out hover:bg-[length:100%_100%] hover:text-black before:content-['_']"
        ></a>
      </h2>
      <br />
      <p
        ref={directorRef}
        className="text-[2vw] font-[400] font-['Geist_Mono'] text-white text-center"
      ></p>
      <p
        ref={releaseRef}
        className="text-[2vw] font-[400] font-['Geist_Mono'] text-white text-center"
      ></p>
    </div>
  );
};

export default ScrambleText;
