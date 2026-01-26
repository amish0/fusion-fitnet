# Fusion FitNet - Architecture & Migration Guide

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT (Browser)                          │
│                                                              │
│  HTML / CSS / JavaScript / EJS Templates                    │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ HTTP Requests
                           ↓
┌──────────────────────────────────────────────────────────────┐
│         FRONTEND - Node.js + Express (Port 3000)             │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────────────────────────────┐        │
│  │          Express Middleware Stack               │        │
│  │  - Static Files / Body Parser / Session / CORS  │        │
│  └─────────────────────────────────────────────────┘        │
│                           ↓                                  │
│  ┌─────────────────────────────────────────────────┐        │
│  │              Route Handlers                     │        │
│  │  - Auth / Dashboard / Cart / Contact / Gallery  │        │
│  └─────────────────────────────────────────────────┘        │
│                           ↓                                  │
│  ┌─────────────────────────────────────────────────┐        │
│  │           EJS Template Engine                  │        │
│  │  - Renders HTML with dynamic data              │        │
│  └─────────────────────────────────────────────────┘        │
│                           ↓                                  │
│  ┌─────────────────────────────────────────────────┐        │
│  │         Axios HTTP Client                      │        │
│  │  - Communicates with Flask Backend API         │        │
│  └─────────────────────────────────────────────────┘        │
└──────────────┬───────────────────────────────────────────────┘
               │
               │ JSON REST API Calls
               │ /api/auth, /api/cart, /api/contact
               ↓
┌──────────────────────────────────────────────────────────────┐
│         BACKEND - Python Flask (Port 5000)                   │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────────────────────────────┐        │
│  │          Flask Application Factory              │        │
│  │  - CORS / Blueprints / Error Handling           │        │
│  └─────────────────────────────────────────────────┘        │
│                           ↓                                  │
│  ┌─────────────────────────────────────────────────┐        │
│  │            API Blueprints (Routes)              │        │
│  │  - Auth / User / Content / Cart / Contact       │        │
│  └─────────────────────────────────────────────────┘        │
│                           ↓                                  │
│  ┌─────────────────────────────────────────────────┐        │
│  │         Business Logic & Validation             │        │
│  │  - Password hashing / Input validation          │        │
│  │  - Database queries / Error handling            │        │
│  └─────────────────────────────────────────────────┘        │
│                           ↓                                  │
│  ┌─────────────────────────────────────────────────┐        │
│  │          Database Layer                        │        │
│  │  - MySQL Connection Manager                    │        │
│  │  - Query execution & error handling            │        │
│  └─────────────────────────────────────────────────┘        │
└──────────────┬───────────────────────────────────────────────┘
               │
               │ SQL Queries
               ↓
┌──────────────────────────────────────────────────────────────┐
│              MYSQL DATABASE (Port 3306)                      │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  users   │  │ products │  │cart_items│  │ contact_ │   │
│  │          │  │          │  │          │  │ messages │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

## 🔄 Data Flow Examples

### User Registration Flow
```
1. User submits signup form
   ↓
2. Express validates input
   ↓
3. Express POST to Flask /api/auth/signup
   ↓
4. Flask validates email not exists
   ↓
5. Flask hashes password
   ↓
6. Flask inserts into MySQL users table
   ↓
7. Flask returns user_id
   ↓
8. Express stores in session
   ↓
9. Express redirects to dashboard
   ↓
10. EJS template renders with user data
```

### Shopping Cart Flow
```
1. User clicks "Add to Cart" button
   ↓
2. JavaScript sends Axios POST to Express
   ↓
3. Express checks session (user logged in?)
   ↓
4. Express POST to Flask /api/cart/add
   ↓
5. Flask validates product_id exists
   ↓
6. Flask inserts/updates in MySQL cart_items
   ↓
7. Flask returns success
   ↓
8. Express returns JSON response
   ↓
9. JavaScript shows notification
```

### Content Retrieval Flow
```
1. Home page loads
   ↓
2. Express GET /
   ↓
3. Express fetches from Flask APIs:
   - /api/gallery
   - /api/events
   - /api/team
   - /api/blog
   ↓
4. Flask reads JSON files / MySQL tables
   ↓
5. Flask returns JSON data
   ↓
6. Express passes to EJS template
   ↓
7. EJS renders HTML with data
   ↓
8. Browser displays page
```

## 📝 Migration from PHP to Node.js + Flask

### Before (PHP Architecture)
```
User Browser
    ↓
nginx/Apache
    ↓
PHP Scripts
  - index.php
  - auth/login.php
  - auth/signup.php
  - dashboard.php
  - cart.php
  - config/db.php
    ↓
MySQL Database
```

### After (Node.js + Flask Architecture)
```
User Browser
    ↓
Express.js (Node.js)
  - Server-side rendering
  - Session management
  - Route handling
    ↓
Flask API (Python)
  - RESTful endpoints
  - Business logic
  - Database queries
    ↓
MySQL Database
```

### Key Changes

| Aspect | PHP | Node.js + Flask |
|--------|-----|-----------------|
| **Frontend** | PHP templates | EJS templates (Node.js) |
| **Server** | Apache/Nginx | Express.js (Node.js) |
| **Backend** | PHP scripts | Flask (Python) |
| **Routing** | File-based (.php) | Express routes / Flask blueprints |
| **Sessions** | PHP Sessions | Express-session |
| **Database** | Direct MySQL | Python mysql-connector |
| **Authentication** | password_hash() | Werkzeug hashing |
| **API** | Server-rendered | RESTful JSON API |
| **Structure** | Monolithic | Microservices-ready |

## 🔌 API Communication

### Frontend to Backend
```javascript
// Example: Login
axios.post('http://localhost:5000/api/auth/login', {
  email: 'user@example.com',
  password: 'password123'
})
.then(response => {
  // Store in session on Express
  // Redirect to dashboard
})
```

### Response Format
```json
{
  "message": "Success/Error message",
  "data": { /* optional data */ },
  "user_id": 1,
  "name": "John Doe"
}
```

## 📦 Deployment Architecture

### Development
```
Local Machine
├── Frontend: npm start (port 3000)
├── Backend: python run.py (port 5000)
└── MySQL: localhost (port 3306)
```

### Production
```
Server
├── Frontend: pm2 start frontend/ (port 3000)
├── Backend: gunicorn app:create_app() (port 5000)
├── MySQL: Database server (port 3306)
├── Nginx: Reverse proxy (port 80/443)
└── SSL/TLS: HTTPS encryption
```

## 🔐 Security Layers

### Layer 1: Frontend (Express.js)
- CORS validation
- Session validation
- Input sanitization
- HTTPS in production

### Layer 2: Backend (Flask)
- Request validation
- SQL injection prevention
- Password hashing (Werkzeug)
- Rate limiting

### Layer 3: Database (MySQL)
- User permissions
- Prepared statements
- Encryption at rest

## 📊 Scalability Considerations

### Current Architecture
- Single frontend process
- Single backend process
- Single MySQL instance

### Future Scaling
1. **Load Balancing**: Multiple Express/Flask instances with Nginx
2. **Database Replication**: Master-slave MySQL setup
3. **Caching**: Redis for session/data caching
4. **API Gateway**: Kong or similar for rate limiting
5. **Containerization**: Docker for consistency
6. **Orchestration**: Kubernetes for deployment

```
Load Balancer (Nginx)
├── Express Instance 1 (port 3000)
├── Express Instance 2 (port 3001)
└── Express Instance 3 (port 3002)
    ↓
API Gateway
├── Flask Instance 1 (port 5000)
├── Flask Instance 2 (port 5001)
└── Flask Instance 3 (port 5002)
    ↓
Database Cluster
├── MySQL Master
└── MySQL Replicas
```

## 🧩 File Organization

### Frontend Organization
```
frontend/
├── routes/              # Route handlers
├── views/               # EJS templates
├── public/              # Static assets
│   ├── css/
│   └── js/
├── middleware/          # Custom middleware (if needed)
└── utils/               # Helper functions (if needed)
```

### Backend Organization
```
backend/
├── app/                 # Main application
│   ├── routes/          # Blueprint definitions
│   └── database.py      # DB connection
├── data/                # JSON data files
└── migrations/          # Database migrations (if needed)
```

## 🔄 Request/Response Cycle

### Example: Add to Cart

**Frontend Side:**
```javascript
// 1. User clicks button
document.getElementById('addCart').click();

// 2. JavaScript prepares data
const data = {
  productId: 5,
  quantity: 2
};

// 3. Axios sends POST request
axios.post('/cart/add', data);

// 4. Wait for response
.then(response => {
  // 5. Show success message
  showNotification('Added to cart!');
})
```

**Backend (Express):**
```javascript
// 1. Receive POST request
app.post('/cart/add', (req, res) => {
  // 2. Get user from session
  const userId = req.session.userId;
  
  // 3. Call Flask API
  axios.post('http://localhost:5000/api/cart/add', {
    user_id: userId,
    ...req.body
  });
  
  // 4. Send response to frontend
  res.json({ success: true });
});
```

**Backend (Flask):**
```python
# 1. Receive POST request
@cart_bp.route('/add', methods=['POST'])
def add_to_cart():
    # 2. Get data from request
    data = request.get_json()
    user_id = data.get('user_id')
    
    # 3. Validate
    if not user_id or not product_id:
        return error response
    
    # 4. Execute database query
    db.execute_query('INSERT INTO cart_items ...')
    
    # 5. Return success response
    return jsonify({'message': 'Added to cart'})
```

**Database (MySQL):**
```sql
INSERT INTO cart_items (user_id, product_id, quantity)
VALUES (1, 5, 2);
```

## ✅ Architecture Advantages

1. **Separation of Concerns**
   - Frontend handles presentation
   - Backend handles business logic
   - Database handles data persistence

2. **Scalability**
   - Frontend and backend scale independently
   - Easy to add more instances

3. **Maintainability**
   - Cleaner code organization
   - Easier debugging
   - Technology-specific best practices

4. **Reusability**
   - Flask API can be used by mobile apps
   - Frontend can be replaced with React/Vue
   - Backend can be updated independently

5. **Performance**
   - REST API caching opportunities
   - Database query optimization
   - Frontend static asset optimization

---

**For detailed setup instructions, see SETUP.md**
