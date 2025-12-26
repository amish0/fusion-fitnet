const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// Middleware
router.use(bodyParser.urlencoded({ extended: true }));

// Mock database connection
const users = [];

router.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  if (users.find((u) => u.email === email)) {
    return res.status(400).send('Email already registered!');
  }

  users.push({ id: users.length + 1, name, email, password });
  res.redirect('/auth/login');
});

// Updated GET route to include CSS for the signup page
router.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Sign Up</title>
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
      <form action="/auth/signup" method="POST">
        <h2>Sign Up</h2>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required>

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>

        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>

        <button type="submit">Sign Up</button>
      </form>
    </body>
    </html>
  `);
});

module.exports = router;