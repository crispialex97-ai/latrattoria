// assets/site.js
// Nessun effetto scroll sul header/logo. Solo anno nel footer (se vuoi farlo qui).

document.addEventListener("DOMContentLoaded", () => {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
});
