# Fusion FitNet Backend - Python Flask

Backend API server for Fusion FitNet using Python Flask.

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- MySQL 5.7+
- Virtual environment (venv)

### Installation

1. **Create virtual environment:**
   ```bash
   python -m venv venv
   ```

2. **Activate virtual environment:**
   - Windows: `venv\Scripts\activate`
   - Mac/Linux: `source venv/bin/activate`

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment:**
   - Copy `.env` and update database credentials

5. **Initialize database tables:**
   ```bash
   python run.py
   ```
   Tables are automatically created on first run via `db.init_tables()`

6. **Seed sample data (optional):**
   ```bash
   python seed_database.py
   ```

**Server runs at:** `http://localhost:5000`

## 📋 Environment Variables

Create a `.env` file in the backend directory:

```env
FLASK_ENV=development
FLASK_APP=app
DEBUG=True

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=fusisktz_admin
DB_PASSWORD=BamSF1+2K4*X
DB_NAME=fusisktz_fusion_fitnet

# Flask Secret
SECRET_KEY=your-secret-key-change-in-production
```

## 📦 Dependencies

```
Flask==2.3.2
python-dotenv==1.0.0
mysql-connector-python==8.0.33
PyJWT==2.8.0
Werkzeug==2.3.6
requests==2.31.0
```

## 📁 File Structure

```
backend/
├── run.py                 # Entry point
├── requirements.txt       # Python dependencies
├── .env                  # Environment variables
├── config.py             # Configuration
├── app/
│   ├── __init__.py       # Flask app factory
│   ├── database.py       # Database connection
│   └── routes/
│       ├── __init__.py   # Routes blueprint init
│       ├── auth.py       # Authentication API
│       ├── user.py       # User profile API
│       ├── content.py    # Gallery, blog, team, events
│       ├── cart.py       # Shopping cart API
│       └── contact.py    # Contact form API
└── data/                 # JSON data files
    ├── gallery.json
    ├── events.json
    ├── team.json
    └── blog.json
```

## 🔌 API Endpoints

### Health Check
```
GET /health
```
Response: `{ "status": "ok", "message": "Flask API is running" }`

### Authentication

**Register User:**
```
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response (201):
{
  "message": "User created successfully",
  "user_id": 1,
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Login User:**
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response (200):
{
  "message": "Login successful",
  "user_id": 1,
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Logout:**
```
POST /api/auth/logout

Response (200):
{
  "message": "Logged out successfully"
}
```

### User Profile

**Get Profile:**
```
GET /api/user/profile?user_id=1

Response (200):
{
  "user_id": 1,
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Update Profile:**
```
PUT /api/user/update
Content-Type: application/json

{
  "user_id": 1,
  "name": "Jane Doe",
  "email": "jane@example.com"
}

Response (200):
{
  "message": "Profile updated successfully"
}
```

### Content

**Get Gallery:**
```
GET /api/gallery

Response (200): [{ id, image_url, title, ... }, ...]
```

**Get Events:**
```
GET /api/events

Response (200): [{ id, title, date, time, description }, ...]
```

**Get Team:**
```
GET /api/team

Response (200): [{ id, name, role, bio, image_url, social }, ...]
```

**Get Blog:**
```
GET /api/blog

Response (200): [{ id, title, date, excerpt, content }, ...]
```

**Get Visitor Count:**
```
GET /api/visitors

Response (200): { "count": 1234 }
```

### Shopping Cart

**Get Cart:**
```
GET /api/cart/1

Response (200):
{
  "user_id": 1,
  "items": [{ id, product_id, quantity, name, price }, ...],
  "total": 99.99
}
```

**Add to Cart:**
```
POST /api/cart/add
Content-Type: application/json

{
  "user_id": 1,
  "product_id": 5,
  "quantity": 2
}

Response (201):
{
  "message": "Item added to cart successfully"
}
```

**Remove from Cart:**
```
POST /api/cart/remove
Content-Type: application/json

{
  "user_id": 1,
  "cart_item_id": 3
}

Response (200):
{
  "message": "Item removed from cart"
}
```

**Clear Cart:**
```
POST /api/cart/clear
Content-Type: application/json

{
  "user_id": 1
}

Response (200):
{
  "message": "Cart cleared"
}
```

### Contact

**Submit Form:**
```
POST /api/contact/submit
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Inquiry",
  "message": "Hello, I have a question..."
}

Response (201):
{
  "message": "Message sent successfully"
}
```

**Get Messages (Admin):**
```
GET /api/contact/messages

Response (200): [{ id, name, email, subject, message, submitted_at }, ...]
```

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Products Table
```sql
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Cart Items Table
```sql
CREATE TABLE cart_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);
```

### Contact Messages Table
```sql
CREATE TABLE contact_messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  subject VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔐 Security Features

- ✅ Password hashing with Werkzeug (PBKDF2)
- ✅ Input validation on all endpoints
- ✅ SQL injection prevention (parameterized queries)
- ✅ CORS enabled for frontend access
- ✅ Error handling with appropriate HTTP status codes
- ✅ Email format validation

## 🛣️ Blueprint Structure

Each route module is a Flask Blueprint:

```python
from flask import Blueprint
auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')
```

All blueprints registered in `app/__init__.py`

## 📝 Error Handling

Common HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (invalid credentials)
- `404` - Not Found
- `409` - Conflict (email exists)
- `500` - Server Error

## 🧪 Testing

Test the API:
```bash
# Check health
curl http://localhost:5000/health

# Test signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","password":"pass123"}'

# Test login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"pass123"}'
```

## 🚀 Running the Backend

### Development
```bash
python run.py
```

### Debug Mode
```bash
export FLASK_DEBUG=1
python run.py
```

### Production
```bash
export FLASK_ENV=production
gunicorn -w 4 -b 0.0.0.0:5000 'app:create_app()'
```

## 🔧 Troubleshooting

**Database Connection Failed:**
- Verify MySQL is running
- Check credentials in `.env`
- Ensure database exists

**Port 5000 Already in Use:**
```bash
# Find and kill process
lsof -i :5000 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

**Module Import Errors:**
```bash
# Reinstall requirements
pip install -r requirements.txt --force-reinstall
```

## 📚 Useful Links

- http://localhost:5000/health - Health check
- http://localhost:5000/api/visitors - Visitor count
- http://localhost:5000/api/team - Team members
- http://localhost:5000/api/events - Events list

---

For full documentation, see [../README.md](../README.md)
