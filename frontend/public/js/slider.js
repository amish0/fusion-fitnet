// Hero slider functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');

function showSlide(n) {
  if (!slides.length) return;
  
  currentSlide = (n + slides.length) % slides.length;
  
  slides.forEach(slide => slide.style.display = 'none');
  slides[currentSlide].style.display = 'block';
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

// Auto-advance slides
document.addEventListener('DOMContentLoaded', () => {
  if (slides.length > 1) {
    setInterval(nextSlide, 5000); // Change slide every 5 seconds
  }
  console.log('Slider.js loaded');
});
