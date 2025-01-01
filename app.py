from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import re

app = Flask(__name__)
CORS(app)

# Database configuration
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'root1',
    'database': 'users'
}

def get_db_connection():
    return mysql.connector.connect(**db_config)

def validate_email(email):
    pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return re.match(pattern, email) is not None

def validate_phone(phone):
    pattern = r'^\+?1?\d{9,15}$'
    return re.match(pattern, phone) is not None

@app.route('/api/submit', methods=['POST'])
def submit_form():
    data = request.json
    
    # Validate required fields
    required_fields = ['name', 'email', 'phone_number', 'message']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'All fields are required'}), 400
    
    # Validate email and phone
    if not validate_email(data['email']):
        return jsonify({'error': 'Invalid email format'}), 400
    
    if not validate_phone(data['phone_number']):
        return jsonify({'error': 'Invalid phone number format'}), 400
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Insert data into the UserData table
        insert_query = """
        INSERT INTO UserData (name, email, phone_number, message)
        VALUES (%s, %s, %s, %s)
        """
        values = (data['name'], data['email'], data['phone_number'], data['message'])
        
        cursor.execute(insert_query, values)
        conn.commit()
        
        cursor.close()
        conn.close()
        
        return jsonify({'message': 'Data submitted successfully'}), 201
        
    except mysql.connector.Error as err:
        return jsonify({'error': f'Database error occurred: {str(err)}'}), 500

@app.route('/api/data', methods=['GET'])
def get_data():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
        # Fetch all records from UserData table
        cursor.execute("SELECT * FROM UserData")
        users = cursor.fetchall()
        
        cursor.close()
        conn.close()
        
        return jsonify(users), 200
        
    except mysql.connector.Error as err:
        return jsonify({'error': f'Error fetching data: {str(err)}'}), 500

if __name__ == '__main__':
    app.run(debug=True) 