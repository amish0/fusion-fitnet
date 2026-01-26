# Fusion FitNet - Node.js + Flask Architecture

Complete conversion of Fusion FitNet from PHP to a modern Node.js + Flask stack.

## 🏗️ Architecture Overview

```
Fusion FitNet (New Architecture)
├── Frontend (Node.js + Express)
│   ├── Views (EJS Templates)
│   ├── Routes (Express Routers)
│   ├── Public (Static Assets: CSS, JS)
│   └── Sessions (User Authentication)
│
└── Backend (Python Flask)
    ├── Routes (Flask Blueprints)
    ├── Database (MySQL)
    ├── Authentication (Password Hashing)
    └── Content Management
```

## 🎯 Technology Stack

### Frontend (Port 3000)
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **EJS** - Templating engine
- **Bootstrap** - UI framework
- **JavaScript** - Client-side interactivity

### Backend (Port 5000)
- **Python 3.8+** - Server-side language
- **Flask** - Lightweight web framework
- **MySQL** - Database
- **Werkzeug** - Password hashing & security

## 📁 Project Structure

```
fusion-fitnet-new/
├── frontend/
│   ├── server.js                 # Express server entry point
│   ├── package.json              # Frontend dependencies
│   ├── .env                       # Environment variables
│   ├── routes/
│   │   ├── index.js              # Home page routes
│   │   ├── auth.js               # Login/signup routes
│   │   ├── dashboard.js          # User dashboard routes
│   │   ├── cart.js               # Shopping cart routes
│   │   └── contact.js            # Contact form routes
│   ├── views/
│   │   ├── index.ejs             # Home page template
│   │   ├── dashboard.ejs         # Dashboard template
│   │   ├── cart.ejs              # Cart template
│   │   ├── contact.ejs           # Contact template
│   │   └── auth/
│   │       ├── login.ejs         # Login template
│   │       └── signup.ejs        # Signup template
│   └── public/
│       ├── css/
│       │   ├── style.css         # Main styles
│       │   └── auth.css          # Auth page styles
│       └── js/
│           ├── main.js           # Utility functions
│           ├── gallery.js        # Gallery functionality
│           ├── team.js           # Team section
│           ├── events.js         # Events handling
│           ├── blog.js           # Blog functionality
│           └── slider.js         # Image slider
│
└── backend/
    ├── run.py                    # Flask entry point
    ├── requirements.txt          # Python dependencies
    ├── .env                      # Environment variables
    ├── config.py                 # Configuration file
    ├── app/
    │   ├── __init__.py           # Flask app factory
    │   ├── database.py           # Database connection
    │   └── routes/
    │       ├── auth.py           # Authentication endpoints
    │       ├── user.py           # User profile endpoints
    │       ├── content.py        # Gallery, blog, events, team
    │       ├── cart.py           # Shopping cart endpoints
    │       ├── contact.py        # Contact form endpoints
    │       └── __init__.py       # Routes initialization
    │
    └── data/
        ├── gallery.json          # Gallery images data
        ├── events.json           # Events data
        ├── team.json             # Team members data
        └── blog.json             # Blog posts data
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js 14+ and npm
- Python 3.8+
- MySQL 5.7+
- Git

### Frontend Setup (Node.js)

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Edit `.env` file:
   ```
   NODE_ENV=development
   PORT=3000
   SESSION_SECRET=your-secret-key
   FLASK_API=http://localhost:5000
   ```

4. **Start the frontend server:**
   ```bash
   npm start
   ```
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

   Frontend will be available at: **http://localhost:3000**

### Backend Setup (Python Flask)

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   ```

3. **Activate virtual environment:**
   - Windows:
     ```bash
     venv\Scripts\activate
     ```
   - Mac/Linux:
     ```bash
     source venv/bin/activate
     ```

4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Configure environment variables:**
   Edit `.env` file:
   ```
   FLASK_ENV=development
   FLASK_APP=app
   DEBUG=True
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=fusisktz_admin
   DB_PASSWORD=BamSF1+2K4*X
   DB_NAME=fusisktz_fusion_fitnet
   SECRET_KEY=your-secret-key
   ```

6. **Initialize database:**
   Make sure your MySQL database is running with the configured credentials.

7. **Start the backend server:**
   ```bash
   python run.py
   ```

   Backend will be available at: **http://localhost:5000**

## 📡 API Endpoints

### Authentication

**POST** `/api/auth/signup`
- Register a new user
- Body: `{ name, email, password }`
- Response: `{ user_id, name, email }`

**POST** `/api/auth/login`
- Login user
- Body: `{ email, password }`
- Response: `{ user_id, name, email }`

**POST** `/api/auth/logout`
- Logout user
- Response: `{ message }`

### User

**GET** `/api/user/profile?user_id={id}`
- Get user profile
- Response: `{ user_id, name, email }`

**PUT** `/api/user/update`
- Update user profile
- Body: `{ user_id, name, email }`
- Response: `{ message }`

### Content

**GET** `/api/gallery`
- Get all gallery images
- Response: Array of gallery items

**GET** `/api/events`
- Get all events
- Response: Array of events

**GET** `/api/team`
- Get team members
- Response: Array of team members

**GET** `/api/blog`
- Get blog posts
- Response: Array of blog posts

**GET** `/api/visitors`
- Get visitor count
- Response: `{ count }`

### Shopping Cart

**GET** `/api/cart/{user_id}`
- Get user's cart
- Response: `{ user_id, items, total }`

**POST** `/api/cart/add`
- Add item to cart
- Body: `{ user_id, product_id, quantity }`
- Response: `{ message, data }`

**POST** `/api/cart/remove`
- Remove item from cart
- Body: `{ user_id, cart_item_id }`
- Response: `{ message }`

**POST** `/api/cart/clear`
- Clear entire cart
- Body: `{ user_id }`
- Response: `{ message }`

### Contact

**POST** `/api/contact/submit`
- Submit contact form
- Body: `{ name, email, subject, message }`
- Response: `{ message }`

**GET** `/api/contact/messages`
- Get all contact messages (admin only)
- Response: Array of messages

## 🔐 Security Features

- ✅ Password hashing with Werkzeug
- ✅ Session-based authentication
- ✅ CORS enabled for frontend-backend communication
- ✅ Input validation on both frontend and backend
- ✅ SQL injection prevention with parameterized queries
- ✅ Environment variables for sensitive data

## 🗄️ Database Schema

**Users Table:**
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Products Table:**
```sql
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(200),
  description TEXT,
  price DECIMAL(10, 2),
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Cart Items Table:**
```sql
CREATE TABLE cart_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  product_id INT,
  quantity INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);
```

**Contact Messages Table:**
```sql
CREATE TABLE contact_messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  email VARCHAR(100),
  subject VARCHAR(200),
  message TEXT,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 📝 Routes Overview

### Frontend Routes (Node.js)

| Route | Method | Description |
|-------|--------|-------------|
| `/` | GET | Home page |
| `/contact` | GET | Contact page |
| `/auth/login` | GET | Login page |
| `/auth/login` | POST | Process login |
| `/auth/signup` | GET | Signup page |
| `/auth/signup` | POST | Process signup |
| `/auth/logout` | GET | Logout user |
| `/dashboard` | GET | User dashboard |
| `/cart` | GET | Shopping cart |
| `/cart/add` | POST | Add to cart |
| `/cart/remove` | POST | Remove from cart |
| `/contact/submit` | POST | Submit contact form |

## 🔄 Data Flow

1. **User Registration:**
   - User fills signup form → Frontend validates → Express POST to Flask auth API → Flask validates & hashes password → MySQL stores user → User redirected to dashboard

2. **User Login:**
   - User enters credentials → Express POST to Flask login API → Flask authenticates against database → Session created on Express → User redirected to dashboard

3. **Content Display:**
   - Page loads → Express fetches data from Flask REST API → Data passed to EJS template → HTML rendered with dynamic content

4. **Shopping Cart:**
   - User adds item → JavaScript sends POST to Express cart route → Express sends to Flask API → Flask updates database → Cart updated on frontend

## 🧪 Testing

### Test Frontend:
```bash
# Navigate to frontend
cd frontend
npm start
# Visit http://localhost:3000
```

### Test Backend:
```bash
# Navigate to backend
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
python run.py
# Visit http://localhost:5000/health
```

## 🐛 Troubleshooting

**Port already in use:**
```bash
# Kill process on port 3000 (Node)
lsof -ti:3000 | xargs kill -9

# Kill process on port 5000 (Flask)
lsof -ti:5000 | xargs kill -9
```

**Database connection error:**
- Check MySQL is running
- Verify credentials in `.env` files
- Ensure database exists

**CORS errors:**
- Check `FLASK_API` URL in frontend `.env`
- Verify Flask CORS configuration

## 📦 Deployment

### Frontend (Node.js)
```bash
# Build for production
npm run build

# Start in production
NODE_ENV=production npm start
```

### Backend (Flask)
```bash
# Set production variables
export FLASK_ENV=production
python run.py
```

Use PM2 or Docker for production deployments.

## 📚 Additional Resources

- [Express.js Docs](https://expressjs.com/)
- [Flask Docs](https://flask.palletsprojects.com/)
- [EJS Templating](https://ejs.co/)
- [MySQL Docs](https://dev.mysql.com/doc/)

## 📄 License

This project is proprietary software.

## 👥 Contributors

Fusion FitNet Team

---

**Happy Coding! 🎉**
