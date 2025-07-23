"use client";
import { useScramble } from "use-scramble";

const ScrambleText = () => {
  const { ref, replay } = useScramble({
    playOnMount: false,
    text: "the gray code.",
    speed: 0.5,
    tick: 1,
  });
  return (
    <p
      ref={ref}
      onMouseOver={replay}
      onFocus={replay}
      className="w-fit m-0 text-[8vw] font-[550] font-['Geist_Mono'] select-none no-underline text-white relative bg-gradient-to-r from-white to-white bg-no-repeat bg-[length:0%_100%] bg-[position:0_100%] transition-all duration-600 ease-in-out hover:bg-[length:100%_100%] hover:text-black before:content-['_'"
    />
  );
};

export default ScrambleText;
