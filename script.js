const cards = document.querySelectorAll("[data-tilt-card]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const contactForm = document.querySelector("[data-contact-form]");
const formStatus = document.querySelector("[data-form-status]");
const contactRecipients = "noah.rohlinger40@gmail.com,Nzr25@fsu.edu";

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

if (contactForm instanceof HTMLFormElement) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const projectType = String(formData.get("projectType") || "").trim();
    const timeline = String(formData.get("timeline") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !email || !projectType || !timeline || !message) {
      if (formStatus) {
        formStatus.textContent = "Please complete every field before sending.";
      }
      return;
    }

    const subject = encodeURIComponent(`${projectType} inquiry from ${name}`);
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        `Project type: ${projectType}`,
        `Timeline: ${timeline}`,
        "",
        "Project details:",
        message,
      ].join("\n")
    );

    if (formStatus) {
      formStatus.textContent = "Opening your email app...";
    }

    window.location.href = `mailto:${contactRecipients}?subject=${subject}&body=${body}`;
  });
}
