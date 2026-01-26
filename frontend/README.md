# Fusion FitNet Frontend - Node.js + Express

Frontend server for Fusion FitNet using Node.js and Express.

## 🚀 Quick Start

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

**Server runs at:** `http://localhost:3000`

## 📋 Environment Variables

Create a `.env` file in the frontend directory:

```env
NODE_ENV=development
PORT=3000
SESSION_SECRET=your-secret-key-here
FLASK_API=http://localhost:5000
```

## 📦 Dependencies

- **express** - Web framework
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variable management
- **axios** - HTTP client
- **express-session** - Session middleware
- **cookie-parser** - Cookie parsing middleware

## 📁 File Structure

```
frontend/
├── server.js           # Express server entry point
├── package.json        # Dependencies
├── .env               # Environment configuration
├── routes/            # Express route handlers
│   ├── index.js       # Home & gallery routes
│   ├── auth.js        # Authentication routes
│   ├── dashboard.js   # User dashboard routes
│   ├── cart.js        # Shopping cart routes
│   └── contact.js     # Contact form routes
├── views/             # EJS templates
│   ├── index.ejs      # Home page
│   ├── dashboard.ejs  # Dashboard
│   ├── cart.ejs       # Shopping cart
│   ├── contact.ejs    # Contact page
│   └── auth/
│       ├── login.ejs  # Login page
│       └── signup.ejs # Signup page
└── public/            # Static assets
    ├── css/           # Stylesheets
    │   ├── style.css
    │   └── auth.css
    └── js/            # JavaScript files
        ├── main.js
        ├── gallery.js
        ├── team.js
        ├── events.js
        ├── blog.js
        └── slider.js
```

## 🛣️ Routes

### Pages
- `GET /` - Home page
- `GET /contact` - Contact page
- `GET /dashboard` - User dashboard (protected)
- `GET /cart` - Shopping cart (protected)

### Authentication
- `GET /auth/login` - Login page
- `POST /auth/login` - Process login
- `GET /auth/signup` - Signup page
- `POST /auth/signup` - Process signup
- `GET /auth/logout` - Logout

### API Routes
- `POST /contact/submit` - Submit contact form
- `POST /cart/add` - Add item to cart
- `POST /cart/remove` - Remove item from cart

## 🔐 Session Management

Sessions are managed using `express-session` with cookies:
- Duration: 24 hours
- Secure: Enabled in production
- HttpOnly: Enabled (prevents XSS)
- SameSite: Strict

User data stored in session:
```javascript
{
  userId: number,
  userName: string,
  userEmail: string
}
```

## 🎨 Templating

Using EJS for server-side templating. Variables available in all templates:

```ejs
<% isLoggedIn %>     <!-- Boolean: user logged in -->
<% userName %>       <!-- String: user's name -->
<% userEmail %>      <!-- String: user's email -->
```

## 🌐 Frontend-Backend Communication

All API calls use Axios and communicate with Flask backend:

```javascript
// Example API call
const response = await axios.post(`${FLASK_API}/api/auth/login`, {
  email,
  password
});
```

## 🛠️ Middleware Stack

1. **Static Files** - Serves CSS, JS, images from `public/`
2. **Body Parser** - Parses JSON and form data
3. **Cookie Parser** - Parses cookies
4. **Session Handler** - Manages user sessions
5. **Custom Route Handlers** - Process requests

## ⚙️ Configuration

### Development Mode
- Debug logging enabled
- Auto-reload with nodemon
- Console errors displayed

### Production Mode
- DEBUG=false
- Sessions use secure cookies
- Error details hidden from users

## 📝 API Integration

Frontend communicates with Flask backend at:
```
http://localhost:5000  (development)
```

Ensure backend is running before starting frontend!

## 🔗 Useful Links

- `http://localhost:3000/` - Home page
- `http://localhost:3000/auth/login` - Login
- `http://localhost:3000/auth/signup` - Sign up
- `http://localhost:3000/dashboard` - Dashboard
- `http://localhost:3000/cart` - Shopping cart

## 📚 Scripts

```bash
npm start          # Start production server
npm run dev        # Start development with nodemon
npm install        # Install dependencies
```

## 🐛 Debug Mode

Enable debug logging:
```bash
DEBUG=* npm start
```

## 🚨 Error Handling

- 404 errors return custom error page
- 500 errors logged to console
- User-friendly error messages displayed

---

For full documentation, see [../README.md](../README.md)
