# Fusion FitNet - Complete Setup Guide

Step-by-step guide to set up and run the entire Fusion FitNet application.

## Prerequisites

✅ **Required:**
- [Node.js 14+](https://nodejs.org/) - Download and install
- [Python 3.8+](https://www.python.org/) - Download and install
- [MySQL 5.7+](https://www.mysql.com/) - Download and install
- [Git](https://git-scm.com/) - Download and install

✅ **Optional:**
- [VS Code](https://code.visualstudio.com/) - Code editor
- [Postman](https://www.postman.com/) - API testing

## Step 1: Verify Prerequisites

### Check Node.js
```bash
node --version
npm --version
```

### Check Python
```bash
python --version
# or
python3 --version
```

### Check MySQL
```bash
mysql --version
# or connect to MySQL
mysql -u root -p
```

## Step 2: Clone/Extract Project

Navigate to your projects directory:
```bash
cd c:\Users\pdas2\Documents\
```

Your project structure:
```
fusion-fitnet-new/
├── frontend/
├── backend/
└── README.md
```

## Step 3: Setup MySQL Database

### Create Database
```bash
mysql -u root -p
```

```sql
CREATE DATABASE fusisktz_fusion_fitnet CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE fusisktz_fusion_fitnet;

-- Create Users Table
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create Products Table
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create Cart Items Table
CREATE TABLE cart_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create Contact Messages Table
CREATE TABLE contact_messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  subject VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create MySQL User
CREATE USER 'fusisktz_admin'@'localhost' IDENTIFIED BY 'BamSF1+2K4*X';
GRANT ALL PRIVILEGES ON fusisktz_fusion_fitnet.* TO 'fusisktz_admin'@'localhost';
FLUSH PRIVILEGES;

exit;
```

### Verify Database Creation
```bash
mysql -u fusisktz_admin -p
# Password: BamSF1+2K4*X

SHOW DATABASES;
USE fusisktz_fusion_fitnet;
SHOW TABLES;
```

## Step 4: Setup Backend (Python Flask)

### Navigate to Backend
```bash
cd c:\Users\pdas2\Documents\fusion-fitnet-new\backend
```

### Create Virtual Environment
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Mac/Linux
python3 -m venv venv
source venv/bin/activate
```

### Install Dependencies
```bash
pip install -r requirements.txt
```

### Configure Environment
Edit `.env` file:
```env
FLASK_ENV=development
FLASK_APP=app
DEBUG=True

DB_HOST=localhost
DB_PORT=3306
DB_USER=fusisktz_admin
DB_PASSWORD=BamSF1+2K4*X
DB_NAME=fusisktz_fusion_fitnet

SECRET_KEY=your-super-secret-key-change-in-production
```

### Test Backend Connection
```bash
python -c "from app import create_app; app = create_app(); print('✅ Flask app created successfully')"
```

### Start Backend Server
```bash
python run.py
```

Expected output:
```
✅ Database connected successfully
 * Serving Flask app 'app'
 * Debug mode: on
 * Running on http://127.0.0.1:5000
```

**Keep this terminal open!** Flask server runs at **http://localhost:5000**

### Test Backend
In a new terminal:
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{"status":"ok","message":"Flask API is running"}
```

## Step 5: Setup Frontend (Node.js)

### Open New Terminal (keep Flask running!)

### Navigate to Frontend
```bash
cd c:\Users\pdas2\Documents\fusion-fitnet-new\frontend
```

### Install Dependencies
```bash
npm install
```

### Configure Environment
Edit `.env` file:
```env
NODE_ENV=development
PORT=3000
SESSION_SECRET=your-secret-key-change-in-production
FLASK_API=http://localhost:5000
```

### Start Frontend Server
```bash
npm start
```

Or with auto-reload:
```bash
npm run dev
```

Expected output:
```
🚀 Frontend server running at http://localhost:3000
📡 Connected to Flask backend at http://localhost:5000
```

## Step 6: Access Application

Open browser and navigate to:

### Frontend
- **Home:** http://localhost:3000
- **Login:** http://localhost:3000/auth/login
- **Sign Up:** http://localhost:3000/auth/signup

### Backend API
- **Health Check:** http://localhost:5000/health
- **Gallery:** http://localhost:5000/api/gallery
- **Team:** http://localhost:5000/api/team
- **Events:** http://localhost:5000/api/events

## Step 7: Test Full Flow

### 1. Register New User
- Go to http://localhost:3000/auth/signup
- Fill in form with:
  - Name: John Doe
  - Email: john@example.com
  - Password: password123
  - Confirm Password: password123
- Click "Sign Up"

### 2. Login
- Go to http://localhost:3000/auth/login
- Enter:
  - Email: john@example.com
  - Password: password123
- Click "Login"

### 3. View Dashboard
- You should see user dashboard
- Can navigate to cart and other sections

### 4. Test Contact Form
- Scroll to contact section
- Fill and submit contact form
- Should see success message

## Running Both Servers

### Terminal 1 - Backend (Flask)
```bash
cd c:\Users\pdas2\Documents\fusion-fitnet-new\backend
venv\Scripts\activate  # or source venv/bin/activate on Mac/Linux
python run.py
```

### Terminal 2 - Frontend (Node.js)
```bash
cd c:\Users\pdas2\Documents\fusion-fitnet-new\frontend
npm start
```

Both should run simultaneously for the app to work properly.

## 🐛 Troubleshooting

### Backend Issues

**Error: Database connection failed**
- Solution: Check MySQL is running
- Solution: Verify credentials in `.env`
- Solution: Run the SQL setup script again

**Error: Module not found**
- Solution: `pip install -r requirements.txt --force-reinstall`

**Port 5000 already in use**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

### Frontend Issues

**Error: Cannot find module**
- Solution: `npm install`
- Solution: Clear node_modules: `rm -rf node_modules && npm install`

**Port 3000 already in use**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

**CORS Error**
- Solution: Ensure Flask backend is running
- Solution: Check `FLASK_API` URL in frontend `.env`

### General Issues

**"Cannot GET /"**
- Solution: Make sure you're accessing http://localhost:3000
- Solution: Check frontend is running

**"Connection refused"**
- Solution: Backend not running - start it in Terminal 1

**Database shows no data**
- Solution: Insert sample data into products table:
```sql
INSERT INTO products (name, description, price) VALUES 
('Yoga Mat', 'Premium yoga mat', 29.99),
('Dumbbells', '20kg dumbbell set', 49.99),
('Protein Powder', 'Whey protein powder', 34.99);
```

## 📝 Configuration Files

### Frontend .env
```env
NODE_ENV=development
PORT=3000
SESSION_SECRET=your-secret-key-change-in-production
FLASK_API=http://localhost:5000
```

### Backend .env
```env
FLASK_ENV=development
FLASK_APP=app
DEBUG=True

DB_HOST=localhost
DB_PORT=3306
DB_USER=fusisktz_admin
DB_PASSWORD=BamSF1+2K4*X
DB_NAME=fusisktz_fusion_fitnet

SECRET_KEY=your-secret-key-change-in-production
```

## 🚀 Production Deployment

### Backend (Flask)
```bash
# Install production server
pip install gunicorn

# Run with Gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 'app:create_app()'
```

### Frontend (Node.js)
```bash
# Build if needed
npm run build

# Start production server
NODE_ENV=production npm start
```

## 📊 Monitoring

### Check if Services Running

**Check Node.js:**
```bash
netstat -an | find "3000"
# or
curl http://localhost:3000
```

**Check Flask:**
```bash
netstat -an | find "5000"
# or
curl http://localhost:5000/health
```

## 🔗 Quick Links

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Backend Docs: `backend/README.md`
- Frontend Docs: `frontend/README.md`
- Project Docs: `README.md`

## ✅ Checklist

- [ ] MySQL installed and running
- [ ] Database created with tables
- [ ] Backend virtual environment created
- [ ] Backend dependencies installed
- [ ] Backend .env configured
- [ ] Backend server running on port 5000
- [ ] Backend health check working
- [ ] Frontend dependencies installed
- [ ] Frontend .env configured
- [ ] Frontend server running on port 3000
- [ ] Can access http://localhost:3000
- [ ] Can register new user
- [ ] Can login successfully
- [ ] Can view dashboard

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review backend/README.md
3. Review frontend/README.md
4. Check console logs for error messages

---

**Happy coding! 🎉**
