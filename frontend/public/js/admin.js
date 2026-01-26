// Admin Dashboard JavaScript

// State
let currentUser = null;
let adminToken = null;
let galleryEditId = null;
let eventEditId = null;
let teamEditId = null;

const API_BASE = 'http://localhost:5000/api';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadUserInfo();
    loadDashboardStats();
    setupNavigation();
});

// User Management
function loadUserInfo() {
    const user = localStorage.getItem('user');
    const userId = localStorage.getItem('user_id');
    const isAdmin = localStorage.getItem('is_admin');
    
    if (!user || isAdmin !== 'true') {
        alert('Access denied. Admin privileges required.');
        window.location.href = '/';
        return;
    }
    
    currentUser = JSON.parse(user);
    adminToken = localStorage.getItem('auth_token');
    document.getElementById('user-name').textContent = currentUser.name;
    document.getElementById('user-email').textContent = currentUser.email;
}

function logout() {
    localStorage.clear();
    window.location.href = '/';
}

// Navigation
function setupNavigation() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.dataset.section;
            
            // Update active link
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Show section
            document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
            document.getElementById(section).classList.add('active');
            
            // Load data for section
            if (section === 'gallery') loadGalleryList();
            else if (section === 'events') loadEventsList();
            else if (section === 'team') loadTeamList();
        });
    });
}

// Alert Messages
function showAlert(message, type = 'success') {
    const alertContainer = document.getElementById('alert-container');
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    alertContainer.appendChild(alert);
    
    setTimeout(() => alert.remove(), 5000);
}

// Dashboard Stats
async function loadDashboardStats() {
    try {
        const response = await fetch(`${API_BASE}/admin/dashboard/stats`, {
            headers: {
                'X-User-ID': localStorage.getItem('user_id')
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            document.getElementById('stat-gallery').textContent = data.gallery;
            document.getElementById('stat-events').textContent = data.events;
            document.getElementById('stat-team').textContent = data.team;
            document.getElementById('stat-users').textContent = data.users;
        }
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

// ============ GALLERY MANAGEMENT ============

async function loadGalleryList() {
    try {
        const response = await fetch(`${API_BASE}/gallery?page=1&per_page=1000`);
        if (response.ok) {
            const data = await response.json();
            const gallery = data.items || data || [];
            const listHtml = gallery.map(item => `
                <tr>
                    <td>${item.title}</td>
                    <td>${item.category || '-'}</td>
                    <td><span class="badge ${item.is_featured ? 'badge-success' : 'badge-secondary'}">${item.is_featured ? 'Featured' : 'Not Featured'}</span></td>
                    <td>${item.is_featured ? item.homepage_order : '-'}</td>
                    <td><img src="${item.image_url}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;"></td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-primary btn-small" onclick='editGallery(${JSON.stringify(item)})'>Edit</button>
                            <button class="btn-danger btn-small" onclick="deleteGallery(${item.id})">Delete</button>
                        </div>
                    </td>
                </tr>
            `).join('');
            
            document.getElementById('gallery-list').innerHTML = listHtml || '<tr><td colspan="6" style="text-align: center;">No gallery items</td></tr>';
        }
    } catch (error) {
        console.error('Error loading gallery:', error);
    }
}

function openAddGalleryModal() {
    galleryEditId = null;
    document.getElementById('gallery-modal-title').textContent = 'Add Gallery Item';
    document.getElementById('gallery-form').reset();
    document.getElementById('gallery-featured').checked = false;
    document.getElementById('gallery-order').value = 0;
    document.getElementById('gallery-modal').classList.add('active');
}

function editGallery(item) {
    galleryEditId = item.id;
    document.getElementById('gallery-modal-title').textContent = 'Edit Gallery Item';
    document.getElementById('gallery-title').value = item.title;
    document.getElementById('gallery-image').value = item.image_url;
    document.getElementById('gallery-description').value = item.description || '';
    document.getElementById('gallery-category').value = item.category || '';
    document.getElementById('gallery-featured').checked = item.is_featured || false;
    document.getElementById('gallery-order').value = item.homepage_order || 0;
    document.getElementById('gallery-modal').classList.add('active');
}

function closeGalleryModal() {
    document.getElementById('gallery-modal').classList.remove('active');
    galleryEditId = null;
}

async function saveGallery(e) {
    e.preventDefault();
    
    const data = {
        title: document.getElementById('gallery-title').value,
        image_url: document.getElementById('gallery-image').value,
        description: document.getElementById('gallery-description').value,
        category: document.getElementById('gallery-category').value,
        is_featured: document.getElementById('gallery-featured').checked,
        homepage_order: parseInt(document.getElementById('gallery-order').value) || 0
    };
    
    try {
        const url = galleryEditId ? 
            `${API_BASE}/admin/gallery/${galleryEditId}` : 
            `${API_BASE}/admin/gallery`;
        const method = galleryEditId ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'X-User-ID': localStorage.getItem('user_id')
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            showAlert(galleryEditId ? 'Gallery item updated!' : 'Gallery item created!');
            closeGalleryModal();
            loadGalleryList();
            loadDashboardStats();
        } else {
            showAlert('Error saving gallery item', 'error');
        }
    } catch (error) {
        showAlert('Error: ' + error.message, 'error');
    }
}

async function deleteGallery(id) {
    if (!confirm('Are you sure you want to delete this gallery item?')) return;
    
    try {
        const response = await fetch(`${API_BASE}/admin/gallery/${id}`, {
            method: 'DELETE',
            headers: {
                'X-User-ID': localStorage.getItem('user_id')
            }
        });
        
        if (response.ok) {
            showAlert('Gallery item deleted!');
            loadGalleryList();
            loadDashboardStats();
        } else {
            showAlert('Error deleting gallery item', 'error');
        }
    } catch (error) {
        showAlert('Error: ' + error.message, 'error');
    }
}

// ============ EVENTS MANAGEMENT ============

async function loadEventsList() {
    try {
        const response = await fetch(`${API_BASE}/events`);
        if (response.ok) {
            const events = await response.json();
            const listHtml = events.map(event => `
                <tr>
                    <td>${event.title}</td>
                    <td>${event.date}</td>
                    <td>${event.location || '-'}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-danger btn-small" onclick="editEvent(${event.id}, '${event.title}', '${event.description}', '${event.date}', '${event.time || ''}', '${event.location || ''}', '${event.image_url || ''}')">Edit</button>
                            <button class="btn-danger btn-small" onclick="deleteEvent(${event.id})">Delete</button>
                        </div>
                    </td>
                </tr>
            `).join('');
            
            document.getElementById('events-list').innerHTML = listHtml || '<tr><td colspan="4" style="text-align: center;">No events</td></tr>';
        }
    } catch (error) {
        console.error('Error loading events:', error);
    }
}

function openAddEventModal() {
    eventEditId = null;
    document.getElementById('event-modal-title').textContent = 'Add Event';
    document.getElementById('event-form').reset();
    document.getElementById('event-modal').classList.add('active');
}

function editEvent(id, title, description, date, time, location, image) {
    eventEditId = id;
    document.getElementById('event-modal-title').textContent = 'Edit Event';
    document.getElementById('event-title').value = title;
    document.getElementById('event-description').value = description;
    document.getElementById('event-date').value = date;
    document.getElementById('event-time').value = time;
    document.getElementById('event-location').value = location;
    document.getElementById('event-image').value = image;
    document.getElementById('event-modal').classList.add('active');
}

function closeEventModal() {
    document.getElementById('event-modal').classList.remove('active');
    eventEditId = null;
}

async function saveEvent(e) {
    e.preventDefault();
    
    const data = {
        title: document.getElementById('event-title').value,
        description: document.getElementById('event-description').value,
        date: document.getElementById('event-date').value,
        time: document.getElementById('event-time').value,
        location: document.getElementById('event-location').value,
        image_url: document.getElementById('event-image').value
    };
    
    try {
        const url = eventEditId ? 
            `${API_BASE}/admin/events/${eventEditId}` : 
            `${API_BASE}/admin/events`;
        const method = eventEditId ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'X-User-ID': localStorage.getItem('user_id')
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            showAlert(eventEditId ? 'Event updated!' : 'Event created!');
            closeEventModal();
            loadEventsList();
            loadDashboardStats();
        } else {
            showAlert('Error saving event', 'error');
        }
    } catch (error) {
        showAlert('Error: ' + error.message, 'error');
    }
}

async function deleteEvent(id) {
    if (!confirm('Are you sure you want to delete this event?')) return;
    
    try {
        const response = await fetch(`${API_BASE}/admin/events/${id}`, {
            method: 'DELETE',
            headers: {
                'X-User-ID': localStorage.getItem('user_id')
            }
        });
        
        if (response.ok) {
            showAlert('Event deleted!');
            loadEventsList();
            loadDashboardStats();
        } else {
            showAlert('Error deleting event', 'error');
        }
    } catch (error) {
        showAlert('Error: ' + error.message, 'error');
    }
}

// ============ TEAM MANAGEMENT ============

async function loadTeamList() {
    try {
        const response = await fetch(`${API_BASE}/team`);
        if (response.ok) {
            const team = await response.json();
            const listHtml = team.map(member => `
                <tr>
                    <td>${member.name}</td>
                    <td>${member.role}</td>
                    <td>${member.email || '-'}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-danger btn-small" onclick="editTeam(${member.id}, '${member.name}', '${member.role}', '${member.bio || ''}', '${member.image_url || ''}', '${member.email || ''}', '${member.phone || ''}')">Edit</button>
                            <button class="btn-danger btn-small" onclick="deleteTeam(${member.id})">Delete</button>
                        </div>
                    </td>
                </tr>
            `).join('');
            
            document.getElementById('team-list').innerHTML = listHtml || '<tr><td colspan="4" style="text-align: center;">No team members</td></tr>';
        }
    } catch (error) {
        console.error('Error loading team:', error);
    }
}

function openAddTeamModal() {
    teamEditId = null;
    document.getElementById('team-modal-title').textContent = 'Add Team Member';
    document.getElementById('team-form').reset();
    document.getElementById('team-modal').classList.add('active');
}

function editTeam(id, name, role, bio, image, email, phone) {
    teamEditId = id;
    document.getElementById('team-modal-title').textContent = 'Edit Team Member';
    document.getElementById('team-name').value = name;
    document.getElementById('team-role').value = role;
    document.getElementById('team-bio').value = bio;
    document.getElementById('team-image').value = image;
    document.getElementById('team-email').value = email;
    document.getElementById('team-phone').value = phone;
    document.getElementById('team-modal').classList.add('active');
}

function closeTeamModal() {
    document.getElementById('team-modal').classList.remove('active');
    teamEditId = null;
}

async function saveTeam(e) {
    e.preventDefault();
    
    const data = {
        name: document.getElementById('team-name').value,
        role: document.getElementById('team-role').value,
        bio: document.getElementById('team-bio').value,
        image_url: document.getElementById('team-image').value,
        email: document.getElementById('team-email').value,
        phone: document.getElementById('team-phone').value
    };
    
    try {
        const url = teamEditId ? 
            `${API_BASE}/admin/team/${teamEditId}` : 
            `${API_BASE}/admin/team`;
        const method = teamEditId ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'X-User-ID': localStorage.getItem('user_id')
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            showAlert(teamEditId ? 'Team member updated!' : 'Team member created!');
            closeTeamModal();
            loadTeamList();
            loadDashboardStats();
        } else {
            showAlert('Error saving team member', 'error');
        }
    } catch (error) {
        showAlert('Error: ' + error.message, 'error');
    }
}

async function deleteTeam(id) {
    if (!confirm('Are you sure you want to delete this team member?')) return;
    
    try {
        const response = await fetch(`${API_BASE}/admin/team/${id}`, {
            method: 'DELETE',
            headers: {
                'X-User-ID': localStorage.getItem('user_id')
            }
        });
        
        if (response.ok) {
            showAlert('Team member deleted!');
            loadTeamList();
            loadDashboardStats();
        } else {
            showAlert('Error deleting team member', 'error');
        }
    } catch (error) {
        showAlert('Error: ' + error.message, 'error');
    }
}

// Close modals when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.id === 'gallery-modal') closeGalleryModal();
    if (e.target.id === 'event-modal') closeEventModal();
    if (e.target.id === 'team-modal') closeTeamModal();
});
