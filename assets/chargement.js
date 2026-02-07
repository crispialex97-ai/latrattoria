(function () {
  const TOTAL_MS = 10000; // 10 secondi
  const TICK_MS = 100;    // aggiornamento progress
  const STEPS = TOTAL_MS / TICK_MS;

  const fill = document.getElementById("pizzaFill");
  const toppings = document.querySelector(".pizza-toppings");
  const value = document.getElementById("progressValue");
  const label = document.getElementById("progressLabel");
  const logoEnd = document.getElementById("logoEnd");
  const bar = document.querySelector(".pizza-bar");

  let i = 0;

  // segnala a index che arriviamo dal loader (per evitare loop)
  sessionStorage.setItem("loaderDone", "1");

  const timer = setInterval(() => {
    i++;
    const pct = Math.min(100, Math.round((i / STEPS) * 100));

    if (fill) fill.style.width = pct + "%";
    if (toppings) toppings.style.clipPath = `inset(0 ${100 - pct}% 0 0 round 999px)`;
    if (value) value.textContent = String(pct);
    if (bar) bar.setAttribute("aria-valuenow", String(pct));

    if (pct >= 85 && logoEnd) {
      logoEnd.classList.add("show");
    }

    if (pct >= 100) {
      clearInterval(timer);
      if (label) label.textContent = "Bienvenue !";
      // piccola pausa per far vedere 100%
      setTimeout(() => {
        window.location.href = "index.html";
      }, 350);
    }
  }, TICK_MS);
})();
