# WebForm Project

This project demonstrates how to build a simple web application that allows users to submit a form with their details (name, email, phone number, and message). The data is stored in a MySQL database and can be fetched to display it.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Flask (Python)
- **Database**: MySQL
- **Libraries**: 
  - Flask
  - Flask-CORS (for handling Cross-Origin Resource Sharing)
  - MySQL Connector (for connecting to MySQL from Flask)
  - Regex (for validating email and phone format)

## Features

1. **Form Submission**: Users can submit their name, email, phone number, and message.
2. **Data Validation**: Email and phone number inputs are validated using regex.
3. **Database**: Submitted data is stored in a MySQL database.
4. **Fetch Data**: Users can view all submitted data from the database.

## Project Setup

### Prerequisites

1. **Install MySQL**: Make sure MySQL is installed on your local machine.
2. **Install Python**: Install Python (preferably version 3.6+).

### Backend Setup (Flask)

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/DarshanaPatil04/WebForm.git
   cd WebForm
