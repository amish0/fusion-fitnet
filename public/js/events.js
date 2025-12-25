fetch("data/events.json")
  .then(res => res.json())
  .then(events => {
    const grid = document.getElementById("eventsGrid");
    events.forEach(e => {
      const div = document.createElement("div");
      div.className = "event-card";
      div.innerHTML = `
        <h3>${e.title}</h3>
        <p>${e.description}</p>
        <p class="countdown" data-date="${e.date}"></p>
      `;
      grid.appendChild(div);
    });
    countdown();
  });

function countdown() {
  document.querySelectorAll(".countdown").forEach(el => {
    const target = new Date(el.dataset.date);
    setInterval(() => {
      const diff = target - new Date();
      el.textContent = diff > 0
        ? Math.floor(diff / (1000*60*60*24)) + " days left"
        : "Started";
    }, 1000);
  });
}
