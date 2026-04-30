# Mini SaaS Task Management System

A full-stack SaaS-style task management application where users can securely register, log in, and manage their own private tasks.

---

## 🚀 Features

* User Authentication (Signup & Login)
* Secure password hashing using bcrypt
* JWT-based authentication
* Protected routes
* Multi-user task management
* Create, update, and delete tasks
* Each user can access only their own tasks
* Clean and responsive UI

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* Sequelize ORM

### Database

* PostgreSQL

### Authentication

* bcrypt
* JSON Web Tokens (JWT)

---

## 📁 Project Structure

```
Mini-SaaS-Task-App/
│
├── backend/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── .env
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   ├── App.jsx
    │   └── index.css
    └── package.json
```

---

## ⚙️ Backend Setup

1. Navigate to backend folder:

```
cd backend
```

2. Install dependencies:

```
npm install
```

3. Create `.env` file:

```
PORT=5000

DB_NAME=your_database_name
DB_USER=your_postgres_username
DB_PASS=your_postgres_password
DB_HOST=localhost

JWT_SECRET=your_secret_key
```

4. Start backend server:

```
npm run dev
```

---

## 💻 Frontend Setup

1. Navigate to frontend folder:

```
cd frontend
```

2. Install dependencies:

```
npm install
```

3. Start frontend:

```
npm run dev
```

4. Open in browser:

```
http://localhost:5173
```

---

## 🔐 Authentication Flow

* User signs up or logs in
* Server validates credentials
* JWT token is generated
* Token is stored in localStorage
* Token is sent in Authorization header for protected routes

---

## 📌 API Endpoints

### Auth Routes

* POST `/api/auth/signup`
* POST `/api/auth/login`

### Task Routes (Protected)

* GET `/api/tasks` → Get user tasks
* POST `/api/tasks` → Create task
* PUT `/api/tasks/:id` → Update task status
* DELETE `/api/tasks/:id` → Delete task

---

## ❗ Important Notes

* Each task is linked to a specific user via `userId`
* Users cannot access tasks of other users
* `.env` file is not included in the repository for security

---

## 🌐 Deployment

* Frontend: Vercel / Netlify
* Backend: Render / Heroku
* Database: Supabase / Neon

## 👨‍💻 Author

Narala Chakradhar Reddy

---

## ✅ Status

Project completed as part of Full Stack Developer Intern Screening Task.
