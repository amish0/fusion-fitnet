// Gallery swipe functionality
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
