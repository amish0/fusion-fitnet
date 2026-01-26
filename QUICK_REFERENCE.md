# Quick Reference Guide - Fusion FitNet Node.js + Flask

## 🚀 Quick Start Commands

### Start Backend (Terminal 1)
```bash
cd fusion-fitnet-new/backend
venv\Scripts\activate  # Windows
python run.py
# Backend runs at http://localhost:5000
```

### Start Frontend (Terminal 2)
```bash
cd fusion-fitnet-new/frontend
npm start
# Frontend runs at http://localhost:3000
```

### Test Everything
```bash
# Backend health check
curl http://localhost:5000/health

# Frontend home page
curl http://localhost:3000

# Login endpoint
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"pass123"}'
```

## 📁 Directory Structure at a Glance

```
fusion-fitnet-new/
├── frontend/                 # Node.js + Express
│   ├── routes/              # Page route handlers
│   ├── views/               # EJS templates
│   ├── public/              # Static CSS/JS
│   ├── server.js            # Express entry
│   ├── package.json
│   └── .env
│
├── backend/                 # Python Flask
│   ├── app/
│   │   ├── routes/          # API endpoints
│   │   └── database.py      # DB connection
│   ├── run.py               # Flask entry
│   ├── requirements.txt
│   └── .env
│
├── README.md                # Main documentation
├── SETUP.md                 # Setup instructions
├── ARCHITECTURE.md          # System design
└── MIGRATION_CHECKLIST.md   # Migration status
```

## 🔌 API Quick Reference

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/auth/signup` | POST | Register user |
| `/api/auth/login` | POST | Login user |
| `/api/auth/logout` | POST | Logout user |
| `/api/user/profile` | GET | Get profile |
| `/api/gallery` | GET | Get gallery |
| `/api/events` | GET | Get events |
| `/api/team` | GET | Get team |
| `/api/blog` | GET | Get blog posts |
| `/api/cart/{id}` | GET | Get cart |
| `/api/cart/add` | POST | Add to cart |
| `/api/cart/remove` | POST | Remove from cart |
| `/api/contact/submit` | POST | Submit contact |

## 📝 Configuration Files

### Frontend `.env`
```env
NODE_ENV=development
PORT=3000
SESSION_SECRET=your-secret-key
FLASK_API=http://localhost:5000
```

### Backend `.env`
```env
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

## 🧪 Common Testing Commands

### Test Signup
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name":"John Doe",
    "email":"john@test.com",
    "password":"pass123"
  }'
```

### Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"john@test.com",
    "password":"pass123"
  }'
```

### Test Gallery API
```bash
curl http://localhost:5000/api/gallery
```

### Test Cart
```bash
curl -X POST http://localhost:5000/api/cart/add \
  -H "Content-Type: application/json" \
  -d '{
    "user_id":1,
    "product_id":5,
    "quantity":2
  }'
```

## 🔧 Development Workflow

### 1. Make Changes
- Edit files in `frontend/` or `backend/`

### 2. Frontend Changes
- Edit `.ejs` files in `views/`
- Edit CSS in `public/css/`
- Edit JS in `public/js/`
- Edit routes in `routes/`
- Server auto-reloads with nodemon (if using npm run dev)

### 3. Backend Changes
- Edit routes in `app/routes/`
- Restart Flask with `python run.py`

### 4. Test Changes
- Frontend: http://localhost:3000
- Backend: http://localhost:5000/health

## 🐛 Troubleshooting Quick Tips

**Port already in use?**
```bash
# Find and kill process
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Can't connect to database?**
```bash
# Check MySQL is running
mysql -u fusisktz_admin -p
# password: BamSF1+2K4*X
```

**Module not found?**
```bash
# Frontend
npm install

# Backend
pip install -r requirements.txt
```

**CORS error?**
- Ensure Flask backend is running
- Check `FLASK_API` in frontend `.env`

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Main documentation |
| `SETUP.md` | Step-by-step setup guide |
| `ARCHITECTURE.md` | System architecture |
| `MIGRATION_CHECKLIST.md` | Migration status |
| `frontend/README.md` | Frontend docs |
| `backend/README.md` | Backend docs |
| `QUICK_REFERENCE.md` | This file |

## 🌐 Access Points

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:3000 | Main application |
| Backend | http://localhost:5000 | API server |
| Backend Health | http://localhost:5000/health | Health check |
| Login | http://localhost:3000/auth/login | User login |
| Dashboard | http://localhost:3000/dashboard | User dashboard |
| Cart | http://localhost:3000/cart | Shopping cart |

## 💾 Database Quick Commands

### Connect to Database
```bash
mysql -u fusisktz_admin -p
# password: BamSF1+2K4*X
```

### Common Queries
```sql
-- Show all users
USE fusisktz_fusion_fitnet;
SELECT * FROM users;

-- Show cart items
SELECT ci.*, p.name, p.price 
FROM cart_items ci
LEFT JOIN products p ON ci.product_id = p.id;

-- Show contact messages
SELECT * FROM contact_messages ORDER BY submitted_at DESC;

-- Insert sample product
INSERT INTO products (name, description, price) 
VALUES ('Yoga Mat', 'Premium yoga mat', 29.99);

-- Delete user
DELETE FROM users WHERE id = 1;
```

## 🔐 Security Reminders

- [ ] Change `SESSION_SECRET` in frontend `.env`
- [ ] Change `SECRET_KEY` in backend `.env`
- [ ] Never commit `.env` files to git
- [ ] Use HTTPS in production
- [ ] Update password requirements
- [ ] Enable rate limiting for API
- [ ] Add request validation

## 📦 Dependency Management

### Update Frontend Dependencies
```bash
cd frontend
npm update
npm install <new-package>
npm uninstall <package>
```

### Update Backend Dependencies
```bash
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install --upgrade <package>
pip freeze > requirements.txt
```

## 🚀 Production Deployment

### Backend Deployment
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 'app:create_app()'
```

### Frontend Deployment
```bash
NODE_ENV=production npm start
# or use PM2
npm install -g pm2
pm2 start server.js --name "fusion-fitnet-frontend"
```

## 📊 Monitoring

### Check Services
```bash
# Node.js running?
curl http://localhost:3000

# Flask running?
curl http://localhost:5000/health

# MySQL running?
mysql -u root -p -e "SELECT 1;"
```

### View Logs
```bash
# Backend logs (in console where flask is running)
# Frontend logs (in console where npm start is running)

# Check error logs in production
pm2 logs
```

## 🎯 Key Files to Know

| File | Purpose |
|------|---------|
| `frontend/server.js` | Express configuration |
| `frontend/routes/auth.js` | Login/signup routes |
| `backend/app/__init__.py` | Flask app setup |
| `backend/app/routes/auth.py` | Auth API |
| `backend/app/database.py` | Database layer |
| `frontend/views/index.ejs` | Home page template |
| `frontend/public/css/style.css` | Main styles |
| `frontend/public/js/main.js` | JS utilities |

## ⚡ Performance Tips

- Use `npm run dev` for frontend development (auto-reload)
- Use Flask debug mode for backend development
- Clear browser cache if styles/JS not updating
- Use database indexes for frequently queried fields
- Implement caching for static content
- Minimize API calls on page load

## 🤝 Git Integration (if using)

```bash
# Initialize git
git init

# Create .gitignore
echo "node_modules/" >> .gitignore
echo "venv/" >> .gitignore
echo ".env" >> .gitignore
echo ".DS_Store" >> .gitignore

# First commit
git add .
git commit -m "Initial commit: Node.js + Flask migration"

# Push to repository
git remote add origin <your-repo-url>
git push -u origin main
```

## 📞 Quick Help

**Question:** How do I restart the servers?
**Answer:** Ctrl+C in both terminals, then run `npm start` and `python run.py` again

**Question:** How do I change the port?
**Answer:** Edit `.env` file (NODE_ENV=PORT for frontend, FLASK_ENV for backend)

**Question:** How do I reset the database?
**Answer:** Drop and recreate tables from SETUP.md SQL script

**Question:** How do I add a new route?
**Answer:** Create in `routes/` (frontend) or `app/routes/` (backend)

**Question:** How do I add a new page?
**Answer:** Create `.ejs` file in `views/`, add route in `routes/`

---

**Last Updated:** 2024-01-26
**Version:** 1.0.0
**Status:** Ready for Development
