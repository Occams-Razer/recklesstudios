// import LocomotiveScroll from "locomotive-scroll";

// const scroll = new LocomotiveScroll({
//   el: document.querySelector("[data-scroll-container]"),
//   smooth: true,
// });

function updateNavbar() {
  const navText = document.getElementsByClassName("navText");
  const nav1 = document.getElementById("nav1");
  const nav2 = document.getElementById("nav2");
  const nav3 = document.getElementById("nav3");
  const nav4 = document.getElementById("nav4");
  const nav5 = document.getElementById("nav5");

  if (window.innerWidth <= 768) {
    nav1.innerHTML = "▲";
    nav2.innerHTML = "▲";
    nav3.innerHTML = "▲";
    nav4.innerHTML = "▲";
    nav5.innerHTML = "▲";
    // navText.style.fontSize = "1 vw";
  } else {
    nav1.innerHTML = "home";
    nav2.innerHTML = "about";
    nav3.innerHTML = "films";
    nav4.innerHTML = "store";
    nav5.innerHTML = "contact";
  }
}
window.addEventListener("resize", updateNavbar);
window.addEventListener("load", updateNavbar);
