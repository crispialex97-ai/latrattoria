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
