function toggleDarkMode() {
  document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", document.body.classList.contains("dark"));
}

if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark");
}

function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("active");
}

function closeMenu() {
  document.getElementById("navLinks").classList.remove("active");
}
