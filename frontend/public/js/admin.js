// Admin Dashboard JavaScript

// State
let currentUser = null;
let adminToken = null;
let galleryEditId = null;
let eventEditId = null;
let teamEditId = null;
let productEditId = null;

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
            // Check if this is an external link (like Settings)
            if (link.href && link.href.includes('/admin/settings')) {
                return; // Allow default navigation
            }
            
            e.preventDefault();
            const section = link.dataset.section;
            
            if (!section) return; // Skip if no section data
            
            // Update active link
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Show section
            document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
            const sectionElement = document.getElementById(section);
            if (sectionElement) {
                sectionElement.classList.add('active');
            }
            
            // Load data for section
            if (section === 'gallery') loadGalleryList();
            else if (section === 'events') loadEventsList();
            else if (section === 'team') loadTeamList();
            else if (section === 'products') loadProductsList();
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
            document.getElementById('stat-products').textContent = data.products || 0;
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

// ============ PRODUCT MANAGEMENT ============

async function loadProductsList() {
    try {
        const response = await fetch(`${API_BASE}/products`);
        if (response.ok) {
            const products = await response.json();
            const listHtml = products.map(item => `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.category || '-'}</td>
                    <td>$${parseFloat(item.price).toFixed(2)}</td>
                    <td>${item.stock || 0}</td>
                    <td><span class="badge ${item.is_featured ? 'badge-success' : 'badge-secondary'}">${item.is_featured ? 'Featured' : 'Not Featured'}</span></td>
                    <td><img src="${item.image_url}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;"></td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-primary btn-small" onclick='editProduct(${JSON.stringify(item)})'>Edit</button>
                            <button class="btn-danger btn-small" onclick="deleteProduct(${item.id})">Delete</button>
                        </div>
                    </td>
                </tr>
            `).join('');
            
            document.getElementById('products-list').innerHTML = listHtml || '<tr><td colspan="7" style="text-align: center;">No products</td></tr>';
        }
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

function openAddProductModal() {
    productEditId = null;
    document.getElementById('product-modal-title').textContent = 'Add Product';
    document.getElementById('product-form').reset();
    document.getElementById('product-featured').checked = false;
    document.getElementById('product-stock').value = 0;
    document.getElementById('product-modal').classList.add('active');
}

async function editProduct(item) {
    productEditId = item.id;
    document.getElementById('product-modal-title').textContent = 'Edit Product';
    document.getElementById('product-name').value = item.name;
    document.getElementById('product-description').value = item.description || '';
    document.getElementById('product-price').value = item.price;
    document.getElementById('product-image').value = item.image_url || '';
    document.getElementById('product-category').value = item.category || '';
    document.getElementById('product-stock').value = item.stock || 0;
    document.getElementById('product-featured').checked = item.is_featured || false;
    
    // Show additional images section and load images
    document.getElementById('additional-images-section').style.display = 'block';
    await loadProductImages(item.id);
    
    document.getElementById('product-modal').classList.add('active');
}

function closeProductModal() {
    document.getElementById('product-modal').classList.remove('active');
    document.getElementById('additional-images-section').style.display = 'none';
    document.getElementById('product-images-list').innerHTML = '';
    document.getElementById('new-image-url').value = '';
    productEditId = null;
}

async function saveProduct(e) {
    e.preventDefault();
    
    const data = {
        name: document.getElementById('product-name').value,
        description: document.getElementById('product-description').value,
        price: parseFloat(document.getElementById('product-price').value),
        image_url: document.getElementById('product-image').value,
        category: document.getElementById('product-category').value,
        stock: parseInt(document.getElementById('product-stock').value) || 0,
        is_featured: document.getElementById('product-featured').checked
    };
    
    try {
        const url = productEditId ? 
            `${API_BASE}/admin/products/${productEditId}` : 
            `${API_BASE}/admin/products`;
        const method = productEditId ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'X-User-ID': localStorage.getItem('user_id')
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            const wasCreating = !productEditId;
            showAlert(productEditId ? 'Product updated!' : 'Product created successfully!');
            
            if (wasCreating) {
                // If creating a new product, get the new product ID and switch to edit mode
                const result = await response.json();
                if (result.product_id) {
                    productEditId = result.product_id;
                    document.getElementById('product-modal-title').textContent = 'Edit Product';
                    document.getElementById('additional-images-section').style.display = 'block';
                    await loadProductImages(productEditId);
                    showAlert('Product created! Now you can add multiple images for the carousel.', 'success');
                    return; // Keep modal open for adding images
                }
            }
            
            closeProductModal();
            loadProductsList();
            loadDashboardStats();
        } else {
            const error = await response.json();
            showAlert(error.message || 'Error saving product', 'error');
        }
    } catch (error) {
        showAlert('Error: ' + error.message, 'error');
    }
}

async function loadProductImages(productId) {
    try {
        const response = await fetch(`${API_BASE}/admin/products/${productId}/images`, {
            headers: {
                'X-User-ID': localStorage.getItem('user_id')
            }
        });
        
        if (response.ok) {
            const images = await response.json();
            const imagesList = document.getElementById('product-images-list');
            
            if (images.length === 0) {
                imagesList.innerHTML = '<p style="color: #666; font-style: italic; text-align: center; padding: 20px;">No additional images yet. Add images to create a product carousel.</p>';
            } else {
                imagesList.innerHTML = images.map(img => `
                    <div class="product-image-item">
                        <img src="${img.image_url}" alt="Product image">
                        <span class="image-url-text">${img.image_url}</span>
                        <span class="image-order-badge">Order: ${img.display_order}</span>
                        <button type="button" class="btn-danger" onclick="deleteProductImage(${productId}, ${img.id})" style="padding: 5px 10px; font-size: 0.85rem;">Delete</button>
                    </div>
                `).join('');
            }
        }
    } catch (error) {
        showAlert('Error loading images: ' + error.message, 'error');
    }
}

async function addProductImage() {
    const imageUrl = document.getElementById('new-image-url').value.trim();
    if (!imageUrl) {
        showAlert('Please enter an image URL', 'error');
        return;
    }
    
    if (!productEditId) {
        showAlert('Please save the product first before adding images', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/admin/products/${productEditId}/images`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-User-ID': localStorage.getItem('user_id')
            },
            body: JSON.stringify({ image_url: imageUrl })
        });
        
        if (response.ok) {
            showAlert('Image added successfully!');
            document.getElementById('new-image-url').value = '';
            await loadProductImages(productEditId);
        } else {
            const error = await response.json();
            showAlert(error.message || 'Error adding image', 'error');
        }
    } catch (error) {
        showAlert('Error: ' + error.message, 'error');
    }
}

async function deleteProductImage(productId, imageId) {
    if (!confirm('Are you sure you want to delete this image?')) return;
    
    try {
        const response = await fetch(`${API_BASE}/admin/products/${productId}/images/${imageId}`, {
            method: 'DELETE',
            headers: {
                'X-User-ID': localStorage.getItem('user_id')
            }
        });
        
        if (response.ok) {
            showAlert('Image deleted!');
            await loadProductImages(productId);
        } else {
            showAlert('Error deleting image', 'error');
        }
    } catch (error) {
        showAlert('Error: ' + error.message, 'error');
    }
}

async function deleteProduct(id) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
        const response = await fetch(`${API_BASE}/admin/products/${id}`, {
            method: 'DELETE',
            headers: {
                'X-User-ID': localStorage.getItem('user_id')
            }
        });
        
        if (response.ok) {
            showAlert('Product deleted!');
            loadProductsList();
            loadDashboardStats();
        } else {
            showAlert('Error deleting product', 'error');
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
