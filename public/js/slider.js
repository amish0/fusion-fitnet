let idx = 0;
const slides = document.querySelectorAll("#slider img");

setInterval(() => {
  slides.forEach(i => i.style.display = "none");
  slides[idx].style.display = "block";
  idx = (idx + 1) % slides.length;
}, 3000);
