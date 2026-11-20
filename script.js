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

// ========================================
// CONTACT FORM - FORMSPREE INTEGRATION
// ========================================

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const submitBtn = document.getElementById("submit-btn");
const btnText = document.getElementById("btn-text");

if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Prevent multiple submissions
    submitBtn.disabled = true;
    btnText.textContent = "Sending...";
    formStatus.textContent = "";
    formStatus.className = "";

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: {
          Accept: "application/json",
        },
      });

      const result = await response.json();

      if (response.ok) {
        formStatus.textContent =
          "Thank you! Your message has been sent successfully. I'll get back to you soon.";

        formStatus.className = "success";

        contactForm.reset();
      } else {
        throw new Error(
          result.errors
            ? result.errors.map((error) => error.message).join(", ")
            : "Something went wrong. Please try again.",
        );
      }
    } catch (error) {
      formStatus.textContent =
        error.message || "Unable to send your message. Please try again.";

      formStatus.className = "error";
    } finally {
      submitBtn.disabled = false;
      btnText.textContent = "Send Message";
    }
  });
}
