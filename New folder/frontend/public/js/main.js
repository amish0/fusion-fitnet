// Fixing the auto-scroll direction for the events grid
const eventsGrid = document.querySelector('.events-grid');

let scrollInterval;

function startAutoScroll() {
  scrollInterval = setInterval(() => {
    const maxScrollLeft = eventsGrid.scrollWidth - eventsGrid.clientWidth;
    if (eventsGrid.scrollLeft >= maxScrollLeft) {
      eventsGrid.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      eventsGrid.scrollBy({ left: 2, behavior: 'smooth' }); // Increased speed for smoother scrolling
    }
  }, 30); // Adjust speed by changing the interval time
}

function stopAutoScroll() {
  clearInterval(scrollInterval);
}

// Start scrolling when the page loads
startAutoScroll();

// Stop scrolling on mouse enter, resume on mouse leave
eventsGrid.addEventListener('mouseenter', stopAutoScroll);
eventsGrid.addEventListener('mouseleave', startAutoScroll);