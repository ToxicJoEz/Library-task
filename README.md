# Library Management System

This is a Node.js backend project for a Library Management System.

## Features
- User registration and login
- JWT authentication
- Book management
- Borrowing and returning books
- Input validation with Joi
- Password hashing with Bcrypt
- Global error handling and input sanitization

## Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/ToxicJoEz/Library-task.git

2. Install dependencies:

npm install

3. Create a .env file in the root with:

MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
PORT=3000
NODE_ENV = "development"

4. Start the server:

npm run dev
