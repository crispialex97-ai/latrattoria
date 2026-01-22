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

// Navbar opacity -> devient noire après le hero
(function () {
  const header = document.getElementById("siteHeader");
  if (!header) return;

  function clamp(n, a, b){ return Math.max(a, Math.min(b, n)); }

  function onScroll(){
    const y = window.scrollY || 0;

    // Pendant le hero: on monte progressivement vers du noir
    // Après ~220px, on est déjà très sombre
    const t = clamp(y / 220, 0, 1);
    const alpha = 0.00 + (0.88 * t); // 0 -> 0.88

    document.documentElement.style.setProperty("--navbg", `rgba(0,0,0,${alpha.toFixed(3)})`);

    // Après le hero (ou proche), on fixe noir complet
    // (si écran petit, on n'attend pas trop)
    const lockAt = Math.max(420, window.innerHeight * 0.55);
    if (y > lockAt){
      document.documentElement.style.setProperty("--navbg", `rgba(0,0,0,0.94)`);
      header.classList.add("is-dark");
    } else {
      header.classList.remove("is-dark");
    }
  }

  window.addEventListener("scroll", onScroll, { passive:true });
  onScroll();
})();
