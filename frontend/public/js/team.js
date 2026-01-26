// Team filtering and display
let currentTeamFilter = 'all';

function filterTeam(category) {
  currentTeamFilter = category;
  const teamMembers = document.querySelectorAll('.team-member');
  
  teamMembers.forEach(member => {
    if (category === 'all' || member.dataset.category === category) {
      member.style.display = 'block';
      setTimeout(() => member.classList.add('show'), 10);
    } else {
      member.classList.remove('show');
      setTimeout(() => member.style.display = 'none', 300);
    }
  });
}

// Search team members
function searchTeam(query) {
  const teamMembers = document.querySelectorAll('.team-member');
  const searchTerm = query.toLowerCase();
  
  teamMembers.forEach(member => {
    const name = member.querySelector('h3')?.textContent.toLowerCase() || '';
    const role = member.querySelector('.role')?.textContent.toLowerCase() || '';
    
    if (name.includes(searchTerm) || role.includes(searchTerm)) {
      member.style.display = 'block';
    } else {
      member.style.display = 'none';
    }
  });
}

// Initialize team section
document.addEventListener('DOMContentLoaded', () => {
  console.log('Team.js loaded');
});
