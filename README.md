# 🎬 Movie Review App

A full-stack Movie Review web application built using the **MERN stack**.
Users can browse movies, read reviews, and submit their own reviews.

---

## 🚀 Features

✅ View movie listings
✅ Search movies by title
✅ View detailed movie information
✅ Add and edit reviews
✅ Delete reviews
✅ RESTful API integration
✅ Responsive UI using React & Bootstrap

---

## 🛠 Tech Stack

### Frontend

* React
* React Router
* Bootstrap / React-Bootstrap
* Axios

### Backend

* Node.js
* Express.js
* MongoDB

### Database

* MongoDB Atlas / Local MongoDB

---

## 📁 Project Structure

```
movie-review-app/
│
├── backend/
│   ├── api/
│   ├── dao/
│   ├── server.js
│   └── index.js
│
├── frontend/
|   ├── src/
│        ├── assets/
│        ├── components/
│        ├── services/
│        ├── App.js
│        └── index.js
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/ashuan945/movie-review.git
cd movie-review
```

---

### 2️⃣ Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file inside **backend/**:

```
MONGO_URI=your_mongodb_connection_string
MOVIEREVIEWS_NS=sample_mflix
PORT=5000
```

Run backend:

```bash
node index.js
```

---

### 3️⃣ Setup Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm start
```

Frontend runs on:

```
http://localhost:3000
```

Backend runs on:

```
http://localhost:5000
```

---

## 🔌 API Endpoints

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| GET    | /api/v1/movies   | Get all movies    |
| GET    | /api/v1/movies/  | Get movie details |
| POST   | /api/v1/reviews  | Add review        |
| PUT    | /api/v1/reviews/ | Update review     |
| DELETE | /api/v1/reviews/ | Delete review     |

---

## 🔐 Environment Variables

Create a `.env` file in the backend folder.

Example:

```
MONGO_URI=your_connection_string
MOVIEREVIEWS_NS=sample_mflix  
PORT=5000
```

⚠️ Do NOT commit `.env` to GitHub.

