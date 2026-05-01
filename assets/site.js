// assets/site.js
// Script minimo del sito.
// NON modifica header o scroll.
// Serve solo per aggiornare automaticamente l'anno nel footer.

document.addEventListener("DOMContentLoaded", function () {

  const yearElement = document.getElementById("year");

  if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.textContent = currentYear;
  }

});

/* ==============================
   MENU PREMIUM LIGHTBOX
   ============================== */

document.addEventListener("DOMContentLoaded", () => {
  const menuButtons = document.querySelectorAll("[data-menu-zoom]");

  if (!menuButtons.length) return;

  const lightbox = document.createElement("div");
  lightbox.className = "menu-lightbox";
  lightbox.setAttribute("aria-hidden", "true");

  lightbox.innerHTML = `
    <div class="menu-lightbox-inner" role="dialog" aria-modal="true" aria-label="Aperçu du menu">
      <div class="menu-lightbox-head">
        <div class="menu-lightbox-title"></div>
        <button class="menu-lightbox-close" type="button" aria-label="Fermer">×</button>
      </div>
      <img class="menu-lightbox-img" src="" alt="">
    </div>
  `;

  document.body.appendChild(lightbox);

  const lightboxTitle = lightbox.querySelector(".menu-lightbox-title");
  const lightboxImg = lightbox.querySelector(".menu-lightbox-img");
  const closeBtn = lightbox.querySelector(".menu-lightbox-close");

  let pressTimer = null;

  const openLightbox = (button) => {
    const img = button.querySelector("img");
    if (!img) return;

    const title = button.dataset.menuTitle || img.alt || "Menu";

    lightboxTitle.textContent = title;
    lightboxImg.src = img.currentSrc || img.src;
    lightboxImg.alt = img.alt || title;

    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
    document.body.style.overflow = "";
  };

  menuButtons.forEach((button) => {
    button.addEventListener("click", () => openLightbox(button));

    button.addEventListener("pointerdown", () => {
      pressTimer = window.setTimeout(() => {
        openLightbox(button);
      }, 420);
    });

    ["pointerup", "pointerleave", "pointercancel"].forEach((eventName) => {
      button.addEventListener(eventName, () => {
        if (pressTimer) {
          clearTimeout(pressTimer);
          pressTimer = null;
        }
      });
    });
  });

  closeBtn.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });
});
