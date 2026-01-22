// Year auto
(function () {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();

// Mobile menu
(function () {
  const burger = document.getElementById("burger");
  const body = document.body;

  if (!burger) return;

  function setExpanded(open) {
    burger.setAttribute("aria-expanded", String(open));
  }

  burger.addEventListener("click", () => {
    const open = body.classList.toggle("nav-open");
    setExpanded(open);
  });

  document.querySelectorAll(".m-link").forEach((a) => {
    a.addEventListener("click", () => {
      body.classList.remove("nav-open");
      setExpanded(false);
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      body.classList.remove("nav-open");
      setExpanded(false);
    }
  });
})();
