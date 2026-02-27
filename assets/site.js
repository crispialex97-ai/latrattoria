/* assets/site.js
   -----------------------------------------------
   Minimal, solid UX for the restaurant one-page
   - Sticky header offset for anchor links
   - Accordion: keep one details open at a time
   - Footer year
   ----------------------------------------------- */

(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const header = $("#siteHeader");
  const yearEl = $("#year");

  // 1) Footer year
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Helper: header offset (sticky)
  const headerOffset = () => {
    if (!header) return 0;
    const h = header.getBoundingClientRect().height;
    // tiny spacing so section titles don't stick to header
    return Math.max(0, Math.round(h + 10));
  };

  // 2) Smooth anchor with offset
  const scrollToHash = (hash, behavior = "smooth") => {
    if (!hash || hash === "#") return false;
    const id = hash.startsWith("#") ? hash.slice(1) : hash;
    const el = document.getElementById(id);
    if (!el) return false;

    const rect = el.getBoundingClientRect();
    const y = window.pageYOffset + rect.top - headerOffset();
    window.scrollTo({ top: y, behavior });
    return true;
  };

  document.addEventListener("click", (e) => {
    const a = e.target.closest?.('a[href^="#"]');
    if (!a) return;

    const href = a.getAttribute("href");
    if (!href || href === "#") return;

    const ok = scrollToHash(href, "smooth");
    if (!ok) return;

    e.preventDefault();
    history.pushState(null, "", href);
  });

  // If page loads with hash, fix offset
  window.addEventListener("load", () => {
    if (location.hash) {
      const ok = scrollToHash(location.hash, "auto");
      if (ok) setTimeout(() => scrollToHash(location.hash, "smooth"), 60);
    }
  });

  // 3) Accordion: only one open at a time (optional but nice)
  const accordion = $(".accordion");
  if (accordion) {
    const details = $$("details.acc", accordion);
    details.forEach((d) => {
      d.addEventListener("toggle", () => {
        if (!d.open) return;
        details.forEach((other) => {
          if (other !== d) other.removeAttribute("open");
        });
      });
    });

    // Esc closes all
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      details.forEach((d) => d.removeAttribute("open"));
    });
  }
})();
// NAV visibile solo sopra l'hero: quando superi l'hero, sparisce
(() => {
  const header = document.getElementById("siteHeader");
  const hero = document.getElementById("top"); // .top-hero ha id="top"

  if (!header || !hero) return;

  const update = () => {
    // altezza "utile" dell'hero (quando la superi -> nascondi header)
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    const threshold = heroBottom - header.offsetHeight - 10; // -10 = margine

    if (window.scrollY > threshold) header.classList.add("nav-hidden");
    else header.classList.remove("nav-hidden");
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
})();
