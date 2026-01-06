document.addEventListener("DOMContentLoaded", () => {
    fetch("data/team.json")
        .then(response => response.json())
        .then(data => {
            const teamGrid = document.getElementById("team-grid");
            if (teamGrid) {
                data.forEach(member => {
                    const memberDiv = document.createElement("div");
                    memberDiv.classList.add("team-member");
                    memberDiv.innerHTML = `
                        <img src="${member.image}" alt="${member.name}">
                        <h3>${member.name}</h3>
                        <p class="role">${member.role}</p>
                        <p class="bio">${member.bio}</p>
                    `;
                    teamGrid.appendChild(memberDiv);
                });
            }
        })
        .catch(error => console.error("Error fetching team data:", error));
});
