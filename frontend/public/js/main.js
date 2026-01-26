// Toggle Dark Mode
function toggleDarkMode() {
  document.body.classList.toggle('dark');
  localStorage.setItem('darkMode', document.body.classList.contains('dark'));
}

// Load dark mode preference on page load
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark');
}

// Mobile Menu Toggle
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  if (navLinks) {
    navLinks.classList.toggle('active');
  }
}

function closeMenu() {
  const navLinks = document.getElementById('navLinks');
  if (navLinks) {
    navLinks.classList.remove('active');
  }
}

// Close menu when a link is clicked
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
});

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// Utility: Show notification
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
    color: white;
    padding: 15px 20px;
    border-radius: 5px;
    z-index: 9999;
    animation: slideIn 0.3s ease-out;
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Product Image Carousel
document.addEventListener('DOMContentLoaded', () => {
  const productCards = document.querySelectorAll('.product-card');
  
  productCards.forEach(card => {
    const images = card.querySelectorAll('.carousel-image');
    const indicators = card.querySelectorAll('.indicator');
    
    if (images.length <= 1) return; // Skip if only one image
    
    let currentIndex = 0;
    let autoRotateInterval;
    
    // Auto-rotate images every 3 seconds
    function startAutoRotate() {
      autoRotateInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        updateCarousel();
      }, 3000);
    }
    
    function stopAutoRotate() {
      clearInterval(autoRotateInterval);
    }
    
    function updateCarousel() {
      images.forEach((img, idx) => {
        img.classList.toggle('active', idx === currentIndex);
      });
      indicators.forEach((ind, idx) => {
        ind.classList.toggle('active', idx === currentIndex);
      });
    }
    
    // Manual indicator click
    indicators.forEach((indicator, idx) => {
      indicator.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        currentIndex = idx;
        updateCarousel();
        stopAutoRotate();
        startAutoRotate(); // Restart auto-rotate after manual change
      });
    });
    
    // Pause on hover, resume on leave
    card.addEventListener('mouseenter', stopAutoRotate);
    card.addEventListener('mouseleave', startAutoRotate);
    
    // Start auto-rotation
    startAutoRotate();
  });
});

console.log('Main.js loaded');
