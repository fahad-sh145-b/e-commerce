# 🛒 E-Commerce Backend API

A RESTful E-Commerce Backend built with Node.js, Express.js, MongoDB, Mongoose, JWT Authentication, and Bcrypt.

## 🚀 Features

- User Registration
- User Login
- JWT Authentication
- Role-Based Authorization (Admin/User)
- Product Management
- Cart Management
- Order Management
- Password Hashing using Bcrypt
- MongoDB Database
- Express REST APIs

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Bcrypt
- Dotenv

---

## 📁 Project Structure

```
e-commerce-backend/
│
├── models/
├── routes/
├── middleware/
├── db.js
├── jwt.js
├── app.js
├── package.json
└── README.md
```

---

## ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/your-username/e-commerce-backend.git
```

Go to project directory

```bash
cd e-commerce-backend
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run the project

```bash
npm start
```

---

## 📌 API Endpoints

### Authentication

- POST /user/register
- POST /user/login

### Users

- GET /user
- GET /user/profile

### Products

- POST /product
- GET /product
- GET /product/:id
- PUT /product/:id

### Cart

- POST /cart/add
- GET /cart
- DELETE /cart/:productId

### Orders

- POST /order/create
- GET /order
- GET /order/admin
- GET /order/:id

---

## 👨‍💻 Author

**Fahad**
