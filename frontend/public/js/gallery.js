// Gallery slideshow functionality (homepage featured gallery)
(function() {
  let gallerySlideIndex = 0;
  let gallerySlideInterval;

  function showGallerySlide(index) {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    
    if (!slides.length) return;
    
    // Wrap around
    if (index >= slides.length) gallerySlideIndex = 0;
    if (index < 0) gallerySlideIndex = slides.length - 1;
    if (index >= 0 && index < slides.length) gallerySlideIndex = index;
    
    // Update slides
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === gallerySlideIndex);
    });
    
    // Update indicators
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === gallerySlideIndex);
    });
  }

  function startGallerySlideshow() {
    gallerySlideInterval = setInterval(() => {
      showGallerySlide(gallerySlideIndex + 1);
    }, 5000); // Change slide every 5 seconds
  }

  // Make functions globally accessible
  window.changeSlide = function(direction) {
    clearInterval(gallerySlideInterval);
    showGallerySlide(gallerySlideIndex + direction);
    startGallerySlideshow();
  };

  window.goToSlide = function(index) {
    clearInterval(gallerySlideInterval);
    showGallerySlide(index);
    startGallerySlideshow();
  };

  // Initialize slideshow if on homepage
  if (document.querySelector('.slideshow-container')) {
    showGallerySlide(0);
    startGallerySlideshow();
    
    // Pause on hover
    const container = document.querySelector('.slideshow-container');
    container.addEventListener('mouseenter', () => clearInterval(gallerySlideInterval));
    container.addEventListener('mouseleave', startGallerySlideshow);
  }
})();

// Gallery swipe functionality (for gallery page)
const gallery = document.getElementById('swipeGallery');

if (gallery) {
  let isDown = false;
  let startX;
  let scrollLeft;

  gallery.addEventListener('mousedown', (e) => {
    isDown = true;
    gallery.classList.add('active');
    startX = e.pageX - gallery.offsetLeft;
    scrollLeft = gallery.scrollLeft;
  });

  gallery.addEventListener('mouseleave', () => {
    isDown = false;
    gallery.classList.remove('active');
  });

  gallery.addEventListener('mouseup', () => {
    isDown = false;
    gallery.classList.remove('active');
  });

  gallery.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - gallery.offsetLeft;
    const walk = (x - startX) * 1; // Scroll speed
    gallery.scrollLeft = scrollLeft - walk;
  });

  // Touch support for mobile
  gallery.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].clientX - gallery.offsetLeft;
    scrollLeft = gallery.scrollLeft;
  });

  gallery.addEventListener('touchend', () => {
    isDown = false;
  });

  gallery.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const x = e.touches[0].clientX - gallery.offsetLeft;
    const walk = (x - startX) * 1;
    gallery.scrollLeft = scrollLeft - walk;
  });
}

console.log('Gallery.js loaded');
