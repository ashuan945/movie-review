# 🎬 Movie Review App

A full-stack Movie Review web application built using the **MERN stack**.
Users can browse movies, read reviews, and submit their own reviews.



## 🚀 Features

✅ View movie listings
✅ Search movies by title
✅ View detailed movie information
✅ Add and edit reviews
✅ Delete reviews
✅ RESTful API integration
✅ Responsive UI using React & Bootstrap



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



## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/ashuan945/movie-review.git
cd movie-review
```



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



## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|------------|
| GET | /api/v1/movies?page= | Get all movies (with pagination) |
| GET | /api/v1/movies/id/:id | Get movie details by ID |
| GET | /api/v1/movies?title= | Search movies by title |
| POST | /api/v1/movies/review | Add a new review |
| PUT | /api/v1/movies/review | Update a review |
| DELETE | /api/v1/movies/review | Delete a review |
| GET | /api/v1/movies/ratings | Get available movie ratings |



## 📸 Screenshots

### 🔑 Login
<img alt="image" src="https://github.com/user-attachments/assets/c4ce2529-d5d2-41cc-9528-a33618ab4829" width="600" />

### 🎬 Home Page / Movie List
<img alt="image" src="https://github.com/user-attachments/assets/b2af8861-1cdf-47f3-ae37-c825a2d12458" width="600" />

### 🔍 Movie Search
<img alt="image" src="https://github.com/user-attachments/assets/a222a192-fcb4-4a80-bbe5-ec9d1af51f90" width="600" />

### 🎥 Movie Details & Reviews
<img alt="image" src="https://github.com/user-attachments/assets/1df853ed-ac7b-40ee-b690-88543cd4a31c" width="600" />

### ✍️ Add Review
<img alt="image" src="https://github.com/user-attachments/assets/4718ba10-6dfd-4fdf-8ba0-ca90436738c8" width="600" />

