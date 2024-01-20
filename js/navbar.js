// Mobile nav menu -> show on hamburger icon click & hide on any other click

const mobileMenu = document.getElementById("nav-menu");
const hamburgerIcon = document.getElementById("hamburger-icon");

let isModalOpen = false;

function openModal() {
  mobileMenu.classList.add("mobile-nav");
  mobileMenu.classList.remove("mobile-display");
  overlay.classList.remove("invisible");
  isModalOpen = true;

  document.addEventListener("click", closeModalOnClickOutside);
}

function closeModal() {
  mobileMenu.classList.remove("mobile-nav");
  mobileMenu.classList.add("mobile-display");
  overlay.classList.add("invisible");
  isModalOpen = false;

  document.removeEventListener("click", closeModalOnClickOutside);
}

function closeModalOnClickOutside(e) {
  if (!mobileMenu.contains(e.target) && e.target !== hamburgerIcon) {
    closeModal();
  }
}