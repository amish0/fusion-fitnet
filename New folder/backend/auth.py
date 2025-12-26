from flask import Flask, request, session, redirect, url_for

app = Flask(__name__)
app.secret_key = 'your-secret-key'

# Mock database
users = [
    {"id": 1, "name": "John Doe", "email": "john@example.com", "password": "hashed_password"}
]

@app.route('/login', methods=['POST'])
def login():
    email = request.form.get('email')
    password = request.form.get('password')

    user = next((u for u in users if u['email'] == email), None)

    if user and password == 'hashed_password':
        session['user_id'] = user['id']
        session['name'] = user['name']
        return redirect(url_for('dashboard'))
    else:
        return "Invalid email or password", 401

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('login'))

@app.route('/signup', methods=['POST'])
def signup():
    name = request.form.get('name')
    email = request.form.get('email')
    password = request.form.get('password')

    if any(u['email'] == email for u in users):
        return "Email already registered!", 400

    users.append({"id": len(users) + 1, "name": name, "email": email, "password": password})
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=True, port=5000)