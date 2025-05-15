import LocomotiveScroll from "locomotive-scroll";

const scroll = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true,
});

let screenWidth = window.screenWidth;
window.addEventListener("resize", () => {
  screenWidth = window.innerWidth;
});
console.log(screenWidth);
