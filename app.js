
var body  = document.querySelector("body");
var hamburger = document.querySelector(".hamburger");
hamburger.addEventListener("click", function () {
  body.classList.toggle("toggle");
});

var localWindow = window.matchMedia("(min-width: 700px)");
localWindow.addEventListener("change", () => {
  body.classList.toggle("toggle");
});
