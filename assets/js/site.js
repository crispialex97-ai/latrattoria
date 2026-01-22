// anno automatico
(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

// mobile menu toggle
(function () {
  const burger = document.getElementById("burger");
  const body = document.body;

  if (!burger) return;

  function setExpanded(isOpen) {
    burger.setAttribute("aria-expanded", String(isOpen));
  }

  burger.addEventListener("click", () => {
    const isOpen = body.classList.toggle("nav-open");
    setExpanded(isOpen);
  });

  // chiudi menu al click su un link mobile
  document.querySelectorAll(".m-link").forEach((a) => {
    a.addEventListener("click", () => {
      body.classList.remove("nav-open");
      setExpanded(false);
    });
  });

  // chiudi menu con ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      body.classList.remove("nav-open");
      setExpanded(false);
    }
  });
})();
