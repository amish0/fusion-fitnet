function toggleDarkMode() {
  document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", document.body.classList.contains("dark"));
}

if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark");
}

// function toggleMenu() {
//   document.getElementById("navLinks").classList.toggle("active");
// }

// function closeMenu() {
//   document.getElementById("navLinks").classList.remove("active");
// }

// Mobile Menu Toggle
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('active');
}

function closeMenu() {
  document.getElementById('navLinks').classList.remove('active');
}

// // Dark Mode Toggle
// function toggleDarkMode() {
//   document.body.classList.toggle('dark');
// }

// Optional: Smooth swipe for gallery (touch-friendly)
const gallery = document.getElementById('swipeGallery');
let isDown = false;
let startX;
let scrollLeft;

gallery && gallery.addEventListener('mousedown', (e) => {
  isDown = true;
  gallery.classList.add('active');
  startX = e.pageX - gallery.offsetLeft;
  scrollLeft = gallery.scrollLeft;
});
gallery && gallery.addEventListener('mouseleave', () => {
  isDown = false;
  gallery.classList.remove('active');
});
gallery && gallery.addEventListener('mouseup', () => {
  isDown = false;
  gallery.classList.remove('active');
});
gallery && gallery.addEventListener('mousemove', (e) => {
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - gallery.offsetLeft;
  const walk = (x - startX) * 2; // scroll-fast
  gallery.scrollLeft = scrollLeft - walk;
});

// Cart functionality
let cart = [];
const cartCountElement = document.getElementById('cart-count');

function addToCart(productName) {
  cart.push(productName);
  updateCartCount();
  console.log(cart); // For debugging
}

function updateCartCount() {
  cartCountElement.innerText = cart.length;
}
