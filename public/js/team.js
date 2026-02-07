document.addEventListener("DOMContentLoaded", () => {
    fetch("data/team.json")
        .then(response => response.json())
        .then(data => {
            const teamGrid = document.getElementById("team-grid");
            if (teamGrid) {
                data.forEach(member => {
                    const memberDiv = document.createElement("div");
                    memberDiv.classList.add("team-member");
                    
                    // Truncate bio for preview
                    const bioPreview = member.bio.length > 150 
                        ? member.bio.substring(0, 150) + "..." 
                        : member.bio;
                    
                    memberDiv.innerHTML = `
                        <div class="member-image-wrapper">
                            <img src="${member.image}" alt="${member.name}">
                            <div class="member-overlay">
                                <i class="fas fa-eye"></i>
                            </div>
                        </div>
                        <div class="member-content">
                            <h3>${member.name}</h3>
                            <p class="role"><i class="fas fa-briefcase"></i> ${member.role}</p>
                            <p class="bio-preview">${bioPreview}</p>
                            <a href="team-member.php?id=${member.id}" class="view-profile-btn">
                                View Full Profile <i class="fas fa-arrow-right"></i>
                            </a>
                        </div>
                    `;
                    
                    // Make entire card clickable
                    memberDiv.style.cursor = 'pointer';
                    memberDiv.addEventListener('click', (e) => {
                        // Don't navigate if clicking the button directly (let button handle it)
                        if (!e.target.classList.contains('view-profile-btn') && 
                            !e.target.closest('.view-profile-btn')) {
                            window.location.href = `team-member.php?id=${member.id}`;
                        }
                    });
                    
                    teamGrid.appendChild(memberDiv);
                });
            }
        })
        .catch(error => console.error("Error fetching team data:", error));
});
