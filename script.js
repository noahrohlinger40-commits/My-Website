// Grab the page elements this file enhances.
const cards = document.querySelectorAll("[data-tilt-card]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Phone menu: below 1080px the stylesheet hides the nav until this button opens it.
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.getElementById("site-nav");
if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });
}

// Section reveal animations with IntersectionObserver.
const revealElements = document.querySelectorAll(".hero, .subpage-panel, .contact-section");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealElements.forEach((el) => {
  el.classList.add("reveal");
  revealObserver.observe(el);
});

// Scroll-to-top quick action button.
const scrollTopButton = document.createElement("button");
scrollTopButton.className = "scroll-top";
scrollTopButton.type = "button";
scrollTopButton.setAttribute("aria-label", "Scroll to top");
scrollTopButton.textContent = "↑";
document.body.appendChild(scrollTopButton);

const updateScrollTopVisibility = () => {
  scrollTopButton.classList.toggle("visible", window.scrollY > 320);
};

window.addEventListener("scroll", updateScrollTopVisibility);
scrollTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

updateScrollTopVisibility();

// Only enable the hover tilt effect when the user has not requested reduced motion.
if (!reduceMotion) {
  cards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;
      const rotateY = (x - 0.5) * 10;
      const rotateX = (0.5 - y) * 8;

      card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });
}
