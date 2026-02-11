(() => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const els = [...document.querySelectorAll(".reveal")];
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("is-visible");
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));

  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobileNav");
  if (hamburger && mobileNav) {
    hamburger.addEventListener("click", () => {
      const isOpen = hamburger.getAttribute("aria-expanded") === "true";
      hamburger.setAttribute("aria-expanded", String(!isOpen));
      mobileNav.hidden = isOpen;
    });
    mobileNav.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        hamburger.setAttribute("aria-expanded", "false");
        mobileNav.hidden = true;
      });
    });
  }

  const form = document.getElementById("quoteForm");
  const wa = document.getElementById("whatsBtn");
  if (form && wa) {
    const buildMsg = () => {
      const name = (form.querySelector('[name="name"]')?.value || "").trim();
      const email = (form.querySelector('[name="email"]')?.value || "").trim();
      const location = (form.querySelector('[name="location"]')?.value || "").trim();
      const date = (form.querySelector('[name="date"]')?.value || "").trim();
      const message = (form.querySelector('[name="message"]')?.value || "").trim();

      const lines = [
        "Hi POSTRPRO, I'd like a quote for an LED poster rental.",
        name ? `Name: ${name}` : "",
        email ? `Email: ${email}` : "",
        location ? `Location: ${location}` : "",
        date ? `Event date: ${date}` : "",
        message ? `Details: ${message}` : ""
      ].filter(Boolean);

      return encodeURIComponent(lines.join("\n"));
    };

    const update = () => {
      wa.href = `https://wa.me/15142447729?text=${buildMsg()}`;
    };

    ["input", "change"].forEach(evt => form.addEventListener(evt, update));
    update();
  }
})();