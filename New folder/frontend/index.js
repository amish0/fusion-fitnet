const express = require('express');
const session = require('express-session');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Ensure routes for login, signup, and logout are properly set up
const loginRouter = require('./auth/login');
const signupRouter = require('./auth/signup');
const logoutRouter = require('./auth/logout');

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Use authentication routes
app.use('/auth/login', loginRouter);
app.use('/auth/signup', signupRouter);
app.use('/auth/logout', logoutRouter);

// Ensure username is passed and displayed in the navigation bar
app.get('/', async (req, res) => {
  try {
    const eventsResponse = await axios.get('http://localhost:5000/api/events');
    const events = eventsResponse.data;

    const eventsHTML = events.map(event => {
      const eventDate = new Date(event.date);
      return `
        <div class="event-card">
          <span class="event-date">${eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase()}</span>
          <h3>${event.title}</h3>
          <p>${event.description}</p>
          <a href="#contact" class="btn small">Register</a>
        </div>
      `;
    }).join('');

    const username = req.query.username || ''; // Ensure username is retrieved from query

    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>Fusion FitNet | Fitness & Strength Training</title>

        <!-- SEO -->
        <meta name="description" content="Fusion FitNet – Personalized fitness, expert coaches, and transformation programs.">
        <meta name="keywords" content="fitness, gym, personal training, strength, wellness">
        <meta name="author" content="Fusion FitNet">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <!-- CSS -->
        <link rel="stylesheet" href="css/style.css">

        <!-- Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'YOUR_GA_ID');
        </script>
      </head>

      <body>
        <header>
          <h1>Fusion FitNet</h1>
          <p class="tagline">Fitness • Strength • Transformation</p>
        </header>

        <nav class="navbar">
          <div class="logo">Fusion FitNet</div>
          <div class="menu-toggle" onclick="toggleMenu()">☰</div>

          <div class="nav-links" id="navLinks">
            <a href="#features">Features</a>
            <a href="#gallery">Gallery</a>
            <a href="#events">Events</a>
            <a href="#products">Products</a>
            <a href="#contact">Contact</a>
          </div>

          <div class="auth-dropdown">
            <div class="auth-icon">🔒</div>
            <div class="auth-menu">
              ${username ? `
                <span style="color: #007bff; font-weight: bold;">Welcome, ${username}</span>
                <a href="auth/logout">Logout</a>
              ` : `
                <a href="auth/login">Login</a>
                <a href="auth/signup">Sign Up</a>
              `}
            </div>
          </div>
        </nav>


        <!-- Existing sections... -->

        <section id="features">
          <h2>Why Choose Fusion FitNet?</h2>
          <div class="features">
            <div class="feature-card">
              <h3>Personalized Training</h3>
              <p>Custom workouts and plans designed to match your fitness level and goals.</p>
              <a href="#contact" class="btn">Join Now</a>
            </div>
            <div class="feature-card">
              <h3>Expert Coaches</h3>
              <p>Learn from certified trainers with years of experience in strength and wellness.</p>
              <a href="#contact" class="btn">Meet Our Coaches</a>
            </div>
            <div class="feature-card">
              <h3>Community Support</h3>
              <p>Join a motivated community that keeps you accountable and inspired every day.</p>
              <a href="#contact" class="btn">Get Started</a>
            </div>
          </div>
        </section>

        <section id="gallery" class="gallery-section">
          <h2>Our Gallery</h2>
          <p class="section-subtitle">A glimpse of our workouts and transformations.</p>

          <div class="gallery-grid">
            <img src="images/g1.jpg" loading="lazy" alt="Fusion FitNet workout session">
            <img src="images/g2.jpg" loading="lazy" alt="Strength training at Fusion FitNet">
            <img src="images/g3.jpg" loading="lazy" alt="Personal training session">
            <img src="images/g4.jpg" loading="lazy" alt="Group fitness class">
            <img src="images/g5.jpg" loading="lazy" alt="Transformation journey">
            <img src="images/g6.jpg" loading="lazy" alt="Fitness community event">
          </div>
        </section>

        <section id="events" class="events-section">
          <h2>Upcoming Events</h2>
          <div class="events-grid">
            ${eventsHTML}
          </div>
        </section>

        <section id="products" class="products-section">
          <h2>Our Products</h2>
          <p class="section-subtitle">Explore our range of fitness products.</p>

          <div class="products-grid">
            <div class="product-card">
              <img src="images/product1.jpg" alt="Product 1">
              <h3>Fitness Band</h3>
              <p>Track your workouts and progress with our premium fitness band.</p>
              <a href="cart.php" class="btn">Add to Cart</a>
            </div>
            <div class="product-card">
              <img src="images/product2.jpg" alt="Product 2">
              <h3>Yoga Mat</h3>
              <p>Comfortable and durable yoga mats for your daily practice.</p>
              <a href="cart.php" class="btn">Add to Cart</a>
            </div>
            <div class="product-card">
              <img src="images/product3.jpg" alt="Product 3">
              <h3>Dumbbells</h3>
              <p>High-quality dumbbells for strength training at home.</p>
              <a href="cart.php" class="btn">Add to Cart</a>
            </div>
          </div>
        </section>

        <section id="contact" class="contact-section">
          <h2>Get in Touch</h2>
          <p class="contact-subtitle">
            Have questions? Want to start your fitness journey?  
            We’d love to hear from you.
          </p>

          <div class="contact-container">
            <div class="contact-info">
              <div class="info-card">
                <span>📧</span>
                <h3>Email</h3>
                <p>ayanain@fusionfitnet.com</p>
              </div>

              <div class="info-card">
                <span>📞</span>
                <h3>Phone</h3>
                <p>+919147425114</p>
              </div>

              <div class="info-card">
                <span>📍</span>
                <h3>Location</h3>
                <p>India</p>
              </div>
            </div>

            <div class="contact-form">
              <form action="/contact" method="POST">
                <div class="form-group">
                  <input type="text" name="name" required>
                  <label>Your Name</label>
                </div>

                <div class="form-group">
                  <input type="email" name="email" required>
                  <label>Email Address</label>
                </div>

                <div class="form-group">
                  <textarea name="message" rows="5" required></textarea>
                  <label>Your Message</label>
                </div>

                <button type="submit" class="btn full">Send Message</button>
              </form>
            </div>
          </div>
        </section>

        <section class="mobile-cta">
          <h2>Start Your Fitness Journey Today</h2>
          <p>Join Fusion FitNet & transform your body</p>
          <a href="#contact">Join Now</a>
        </section>

        <a class="whatsapp" href="https://wa.me/919147425114" target="_blank">💬</a>

        <footer>
          © 2025 Fusion FitNet
        </footer>

        <script>
          function toggleMenu() {
            const navLinks = document.getElementById('navLinks');
            navLinks.classList.toggle('active');
          }
        </script>
      </body>
      </html>
    `);
  } catch (error) {
    res.status(500).send('Error fetching events');
  }
});

// Added route for dashboard
app.get('/dashboard', (req, res) => {
  const username = req.query.username;

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Dashboard</title>
      <link rel="stylesheet" href="/css/style.css">
      <style>
        body {
          font-family: Arial, sans-serif;
          background: #f4f4f9;
          color: #333;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
        .welcome {
          text-align: center;
        }
        .welcome h1 {
          font-size: 2.5rem;
          margin-bottom: 10px;
        }
        .welcome p {
          font-size: 1.2rem;
        }
      </style>
    </head>
    <body>
      <div class="welcome">
        <h1>Welcome, ${username}!</h1>
        <p>You have successfully logged in.</p>
      </div>
    </body>
    </html>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log(`Frontend server running at http://localhost:${PORT}`);
});