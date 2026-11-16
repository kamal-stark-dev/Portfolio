// ==============================
// MOBILE NAVIGATION
// ==============================

const menuIcon = document.querySelector("#menu-icon");
const navLinks = document.querySelector(".nav-links");

menuIcon.addEventListener("click", () => {
  navLinks.classList.toggle("active");

  menuIcon.classList.toggle("ri-menu-line");
  menuIcon.classList.toggle("ri-close-line");
});

// Close menu after clicking a navigation link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");

    menuIcon.classList.add("ri-menu-line");
    menuIcon.classList.remove("ri-close-line");
  });
});

// ==============================
// DARK / LIGHT THEME
// ==============================

const themeToggle = document.querySelector("#theme-toggle");
const themeIcon = themeToggle.querySelector("i");

// Load previously saved theme
const savedTheme = localStorage.getItem("portfolio-theme") || "light";

document.documentElement.setAttribute("data-theme", savedTheme);

updateThemeIcon(savedTheme);

themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");

  const newTheme = currentTheme === "light" ? "dark" : "light";

  document.documentElement.setAttribute("data-theme", newTheme);

  localStorage.setItem("portfolio-theme", newTheme);

  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  if (theme === "dark") {
    themeIcon.className = "ri-sun-line";
    themeToggle.setAttribute("aria-label", "Switch to light mode");
  } else {
    themeIcon.className = "ri-moon-line";
    themeToggle.setAttribute("aria-label", "Switch to dark mode");
  }
}

// =================================
// PROFILE IMAGE HOVER EFFECT
// =================================

const profileImage = document.querySelector(".about-container > img");

if (profileImage) {
  profileImage.addEventListener("mousemove", (e) => {
    const rect = profileImage.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rotateX = (0.5 - y) * 12;
    const rotateY = (x - 0.5) * 12;

    profileImage.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale(1.05)
        `;
  });

  profileImage.addEventListener("mouseleave", () => {
    profileImage.style.transform = `
            perspective(1000px)
            rotateX(0deg)
            rotateY(0deg)
            scale(1)
        `;
  });
}
