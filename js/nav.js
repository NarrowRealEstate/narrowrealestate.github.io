// nav.js - Mobile Burger Menu Navigation
document.addEventListener('DOMContentLoaded', () => {
  const burgerMenu = document.querySelector('.burger-menu');
  const navLinks = document.querySelector('.nav-links');

  if (burgerMenu && navLinks) {
    burgerMenu.addEventListener('click', () => {
      burgerMenu.classList.toggle('active-burger');
      navLinks.classList.toggle('active-menu');
    });
  }
});
