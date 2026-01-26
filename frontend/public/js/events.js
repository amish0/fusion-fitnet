// Events calendar and list functionality
let events = [];

function loadEvents() {
  fetch('/api/events')
    .then(response => response.json())
    .then(data => {
      events = data;
      renderEvents();
    })
    .catch(err => console.error('Error loading events:', err));
}

function renderEvents() {
  const eventsList = document.querySelector('.events-list');
  if (!eventsList) return;

  eventsList.innerHTML = events.map(event => `
    <div class="event-card">
      <h3>${event.title}</h3>
      <p><strong>Date:</strong> ${event.date}</p>
      <p><strong>Time:</strong> ${event.time}</p>
      <p>${event.description}</p>
      <button class="btn" onclick="registerEvent(${event.id})">Register</button>
    </div>
  `).join('');
}

function registerEvent(eventId) {
  const event = events.find(e => e.id === eventId);
  if (event) {
    showNotification(`Registration for "${event.title}" coming soon!`, 'info');
  }
}

// Initialize events
document.addEventListener('DOMContentLoaded', () => {
  console.log('Events.js loaded');
});
