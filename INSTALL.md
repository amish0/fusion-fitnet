# Fusion FitNet - Node.js Conversion Installation Steps

This document outlines the steps to set up and run the converted Fusion FitNet application, which now uses a Node.js backend and a static HTML/CSS/JavaScript frontend.

## Prerequisites

*   Node.js (LTS version recommended)
*   npm (Node Package Manager, usually comes with Node.js)
*   Git (for cloning the repository)

## Installation Steps

### 1. Clone the repository (if you haven't already)

If you have not yet cloned the project, do so using Git:

```bash
git clone <repository_url> # Replace with the actual repository URL
cd fusion-fitnet
```

### 2. Backend Setup

The backend is built with Node.js and Express.js.

1.  Navigate into the `fusion-fitnet-backend` directory:
    ```bash
    cd fusion-fitnet-backend
    ```

2.  Install the Node.js dependencies:
    ```bash
    npm install
    ```
    *(Note: If `npm install` command execution fails within the agent environment, you would need to run this command manually in your terminal to ensure `express`, `cors`, `body-parser`, `fs`, and `crypto` are available.)*

3.  Start the backend server:
    ```bash
    node server.js
    ```
    The backend server will typically run on `http://localhost:3000`. You should see a message like "Server is running on http://localhost:3000" in your console.

### 3. Frontend Setup

The frontend consists of static HTML, CSS, and JavaScript files. You can serve it using a simple static file server for development, or by directly opening the `index.html` file in your browser.

#### Option A: Using `http-server` (Recommended for Development)

`http-server` is a simple, zero-configuration command-line http server.

1.  Install `http-server` globally (if you don't have it):
    ```bash
    npm install -g http-server
    ```
    If you prefer to install it locally in the project root (see "Running Both Simultaneously" below), you can skip the `-g`.

2.  Navigate into the `fusion-fitnet-frontend` directory:
    ```bash
    cd fusion-fitnet-frontend
    ```

3.  Start the static file server:
    ```bash
    http-server
    ```
    This will usually serve the frontend application on `http://localhost:8080`.

#### Option B: Directly Opening `index.html`

1.  Navigate to the `fusion-fitnet-frontend` directory in your file explorer.
2.  Open the `index.html` file with your preferred web browser.

    *Note: Some client-side API calls might encounter Cross-Origin Resource Sharing (CORS) issues if the frontend is opened directly from the file system (`file://` protocol) and the backend is running on `http://localhost:3000`. Using `http-server` (Option A) resolves this by serving the frontend from an HTTP origin.*

### 4. Running Both Simultaneously (for Development)

For a smoother development experience, you can set up a root `package.json` to start both the backend and frontend servers with a single command.

1.  Navigate back to the project root directory (`fusion-fitnet`).
2.  Create a `package.json` file in this root directory if one doesn't exist, and add the following content:

    ```json
    {
      "name": "fusion-fitnet-root",
      "version": "1.0.0",
      "private": true,
      "scripts": {
        "start-backend": "cd fusion-fitnet-backend && node server.js",
        "start-frontend": "cd fusion-fitnet-frontend && http-server",
        "dev": "npm-run-all --parallel start-backend start-frontend"
      },
      "devDependencies": {
        "npm-run-all": "^4.1.5",
        "http-server": "^14.1.1"
      }
    }
    ```
    *(Note: You might need to install `npm-run-all` and `http-server` in the root: `npm install npm-run-all http-server`)*

3.  From the project root (`fusion-fitnet`), run:
    ```bash
    npm install
    npm run dev
    ```
    This will start both the backend (on port 3000) and the frontend (on port 8080) concurrently.

## Important Considerations

*   **Data Storage:** The authentication (login/signup) stores user data in `fusion-fitnet-backend/data/users.json` and the cart functionality uses an in-memory `carts` object. **These are for demonstration purposes only and are NOT suitable for a production environment.** A real application would integrate with a robust database (e.g., MySQL, PostgreSQL, MongoDB) and employ proper session management.
*   **Security (Passwords):** Passwords are currently hashed using a simple SHA256 algorithm via Node.js's `crypto` module. **For production, you MUST use a strong, slow, and salt-generating hashing algorithm like `bcrypt`** to protect user passwords from brute-force attacks.
*   **Error Handling:** The current error handling is basic. Production-ready applications require comprehensive error logging and user-friendly error messages.
*   **Deployment:** The deployment strategy would differ significantly for a production environment, involving process managers (like PM2) for the Node.js backend and a web server (like Nginx or Apache) for serving static frontend files.
