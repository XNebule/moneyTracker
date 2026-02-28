# 💰 MoneyTracker API

> A secure multi-user Expense Tracking REST API built with Node.js, Express, and PostgreSQL.

---

## 🚀 Project Status

**Phase 1 — Backend Foundation**
**Progress: Day 2 Completed ✅**

---

## 📌 Overview

MoneyTracker is a backend-focused REST API designed to demonstrate:

* Clean layered architecture
* Secure authentication (JWT)
* Password hashing (bcrypt)
* Relational database modeling
* Multi-user data isolation
* Proper HTTP status handling

This project is currently backend-only (no frontend yet).

---

## 🏗 Tech Stack

* **Node.js**
* **Express.js**
* **PostgreSQL**
* **bcrypt**
* **jsonwebtoken (JWT)**
* **dotenv**

---

## 🧠 Architecture

The project follows a layered architecture:

```
Client
   ↓
Routes
   ↓
Controllers
   ↓
Services
   ↓
PostgreSQL
```

### 📂 Folder Structure

```
/routes
/controllers
/services
/middleware
/db.js
/server.js
```

### Layer Responsibilities

| Layer       | Responsibility                           |
| ----------- | ---------------------------------------- |
| Routes      | Define API endpoints & attach middleware |
| Controllers | Handle request & response logic          |
| Services    | Execute database queries                 |
| Middleware  | Authentication & error handling          |

---

# 🔐 Authentication System

## 1️⃣ User Registration

**Endpoint**

```
POST /api/auth/register
```

### Features

* Validates email & password
* Hashes password using bcrypt
* Enforces UNIQUE email constraint
* Returns appropriate HTTP status codes

### Possible Responses

| Status Code | Meaning                   |
| ----------- | ------------------------- |
| 201         | User created successfully |
| 400         | Missing required fields   |
| 409         | Email already registered  |

---

## 2️⃣ User Login

**Endpoint**

```
POST /api/auth/login
```

### Login Flow

1. Validate email & password
2. Find user by email
3. Compare password using bcrypt
4. Generate JWT token
5. Return token to client

### Example Response

```json
{
  "token": "JWT_TOKEN"
}
```

### Status Codes

| Status Code | Meaning             |
| ----------- | ------------------- |
| 400         | Missing credentials |
| 401         | Invalid credentials |

---

# 🛡 JWT Authentication

All expense routes require authentication.

### Required Header

```
Authorization: Bearer <token>
```

### Middleware Responsibilities

* Extract token from header
* Verify token using `JWT_SECRET`
* Attach decoded payload to `req.user`
* Call `next()` if valid
* Return `401 Unauthorized` if invalid

---

# 💰 Expense API

All routes below require authentication.

Base Route:

```
/api/expenses
```

---

## Create Expense

```
POST /api/expenses
```

* Automatically assigns `user_id` from JWT
* Returns `201 Created`

---

## Get All Expenses

```
GET /api/expenses
```

* Returns only expenses belonging to logged-in user
* Enforces data isolation at database level

---

## Update Expense

```
PUT /api/expenses/:id
```

* Updates title and amount
* Filtered by `id` AND `user_id`
* Prevents cross-user modification

Returns:

* `200 OK`
* `404 Not Found` (if not owned by user)

---

## Delete Expense

```
DELETE /api/expenses/:id
```

* Deletes expense owned by logged-in user
* Returns confirmation message

---

# 🗄 Database Schema

## Users Table

| Column     | Type      | Constraints               |
| ---------- | --------- | ------------------------- |
| id         | SERIAL    | Primary Key               |
| email      | VARCHAR   | UNIQUE, NOT NULL          |
| password   | TEXT      | Hashed                    |
| created_at | TIMESTAMP | Default CURRENT_TIMESTAMP |

---

## Expenses Table

| Column     | Type      | Constraints               |
| ---------- | --------- | ------------------------- |
| id         | SERIAL    | Primary Key               |
| title      | TEXT      | NOT NULL                  |
| amount     | NUMERIC   | NOT NULL                  |
| user_id    | INTEGER   | Foreign Key → users(id)   |
| created_at | TIMESTAMP | Default CURRENT_TIMESTAMP |

### Relationship

```
User (1) → (Many) Expenses
```

---

# 🔒 Security Practices

* Password hashing using bcrypt
* JWT-based authentication
* Environment variables for secrets
* UNIQUE constraint on email
* Parameterized queries (SQL injection prevention)
* User-based data filtering
* Cross-user modification prevention

---

# 📅 Development Progress

## Day 1

* Understood Express request lifecycle
* Implemented basic CRUD
* Introduced layered architecture

## Day 2

* Implemented Update & Delete
* Added secure authentication system
* Added JWT middleware
* Enforced multi-user data isolation

---

# 🛠 How To Run Locally

### 1️⃣ Clone Repository

```
git clone <repository-url>
cd moneytracker
```

### 2️⃣ Install Dependencies

```
npm install
```

### 3️⃣ Create `.env` File

```
JWT_SECRET=your_secret_key
DATABASE_URL=your_postgres_connection_string
```

### 4️⃣ Start Server

```
npm start
```

Server runs on:

```
http://localhost:3000
```

---

# 🎯 Next Milestones

* Category system
* Expense → Category relationship
* JOIN queries
* Deployment (Backend)
* Frontend integration

---

# 📈 Learning Goals

This project is part of a structured 90-day roadmap focusing on:

* Backend fundamentals
* Authentication systems
* Database relations
* Clean architecture
* Production readiness