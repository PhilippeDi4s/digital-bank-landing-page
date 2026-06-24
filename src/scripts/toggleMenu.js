const mediaQuery = window.matchMedia("(min-width: 64rem)");

const body = document.body;

const menuBtn = document.getElementById("menuBtn");
const overlay = document.querySelector(".overlay");
const headerMenu = document.getElementById("headerMenu");

function closeMenu() {
  overlay.classList.remove("active");
  menuBtn.classList.remove("active");
  body.classList.remove("no-scroll");
}

menuBtn.addEventListener("click", (e) => {
  if (overlay.classList != "overly") {
    overlay.classList.add("overlay");
  }
  overlay.classList.toggle("active");
  body.classList.toggle("no-scroll");
  menuBtn.classList.toggle("active");
});

headerMenu.addEventListener("click", (e) => {
  e.stopPropagation();
});

overlay.addEventListener("click", () => {
  closeMenu();
});

function handleDeviceChange(e) {
  if (e.matches) {
    closeMenu();
    overlay.classList.remove("overlay");
  }
}

handleDeviceChange(mediaQuery);

mediaQuery.addEventListener("change", handleDeviceChange);
