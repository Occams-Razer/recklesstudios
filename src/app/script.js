// import LocomotiveScroll from "locomotive-scroll";

// const scroll = new LocomotiveScroll({
//   el: document.querySelector("[data-scroll-container]"),
//   smooth: true,
// });
const letters = "abcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()_+";

let interval = null;

document.querySelector(".filmText").onmouseover = (event) => {
  let iteration = 0;

  clearInterval(interval);

  interval = setInterval(() => {
    event.target.innerText = event.target.innerText
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return event.target.dataset.value[index];
        }

        return letters[Math.floor(Math.random() * 47)];
      })
      .join("");

    if (iteration >= event.target.dataset.value.length) {
      clearInterval(interval);
    }

    iteration += 1 / 3;
  }, 25);
};
function updateNavbar() {
  const navText = document.getElementsByClassName("navText");
  const nav1 = document.getElementById("nav1");
  const nav2 = document.getElementById("nav2");
  const nav3 = document.getElementById("nav3");
  const nav4 = document.getElementById("nav4");
  // const nav5 = document.getElementById("nav5");

  if (window.innerWidth <= 768) {
    nav1.innerHTML = "h";
    nav2.innerHTML = "a";
    nav3.innerHTML = "f";
    nav4.innerHTML = "s";
    // nav5.innerHTML = "c";
    // navText.style.fontSize = "10px";
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
