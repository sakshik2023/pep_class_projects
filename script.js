document.addEventListener("DOMContentLoaded", () => {
  const year = new Date().getFullYear();
  const footer = document.querySelector(".footer");
  if (footer) {
    footer.textContent = `Made for assignment • HTML • CSS • JS • ${year}`;
  }
});
