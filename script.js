const menuIcon = document.getElementById("menu-icon");
const navLinks = document.getElementsByClassName("nav-links");

menuIcon.onclick = () => {
  navLinks.classList.toggle("active");
};
