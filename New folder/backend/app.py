from flask import Flask, jsonify, session, request
import json

app = Flask(__name__)
app.secret_key = 'your-secret-key'

# Mock user data
users = {
    "test@example.com": {
        "password": "password123",
        "username": "TestUser"
    },
    "amishkumar562@gmail.com": {
        "password": "password123",
        "username": "amish0"
    }
}

@app.route('/api/events', methods=['GET'])
def get_events():
    with open('data/event.json') as f:
        events = json.load(f)
    return jsonify(events)

@app.route('/api/user', methods=['GET'])
def get_user():
    user_id = session.get('user_id')
    if user_id:
        return jsonify({"user_id": user_id, "name": session.get('name')})
    return jsonify({"error": "User not logged in"}), 401

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    user = users.get(email)
    if user and user['password'] == password:
        return jsonify({"username": user['username']}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401

@app.route('/api/auth/logout', methods=['POST'])
def logout():
    session.clear()  # Clear the session data
    return jsonify({"message": "Logged out successfully"}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)