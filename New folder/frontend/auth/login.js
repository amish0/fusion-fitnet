const express = require('express');
const router = express.Router();
const session = require('express-session');
const bodyParser = require('body-parser');
const axios = require('axios');

// Middleware
router.use(bodyParser.urlencoded({ extended: true }));

// Mock database connection
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', password: 'hashed_password' },
];

// Updated POST route to redirect to the index page with username
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });

    if (response.status === 200) {
      const { username } = response.data;
      res.redirect(`/?username=${encodeURIComponent(username)}`);
    } else {
      res.status(response.status).send(response.data.message || 'Login failed');
    }
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Updated GET route to include CSS for the login page
router.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Login</title>
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
        form {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
        }
        label {
          display: block;
          margin-bottom: 8px;
          font-weight: bold;
        }
        input {
          width: 100%;
          padding: 10px;
          margin-bottom: 15px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        button {
          width: 100%;
          padding: 10px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        button:hover {
          background: #0056b3;
        }
      </style>
    </head>
    <body>
      <form action="/auth/login" method="POST">
        <h2>Login</h2>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>

        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>

        <button type="submit">Login</button>
      </form>
    </body>
    </html>
  `);
});

module.exports = router;