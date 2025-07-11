# Music-appliation
Musi application 


# 🎧 SoundWave - MERN Stack Music App

Welcome to **SoundWave**, a full-featured music streaming application built with the MERN stack. It features user and admin dashboards, authentication, playlist creation, music streaming, and much more.

## 📁 Folder Structure

.
├── admin/ # Admin dashboard (React)
├── client/ # User-facing frontend (React)
├── server/ # Backend (Node.js, Express, MongoDB)
└── README.md

yaml
Copy
Edit

---

## 🚀 Features

- 🎵 Music streaming with player controls
- 🔐 JWT authentication (signup/login/logout)
- 🎛️ Admin dashboard for managing songs and users
- 🎨 Responsive UI with Tailwind CSS
- 📂 Playlist & Library Management
- 📻 Radio & Featured Albums
- 🌩️ Cloudinary Integration for Music Uploads

---

## 🧰 Tech Stack

- **Frontend:** React.js, Tailwind CSS, React Router, Lucide Icons
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, Multer
- **Auth:** JWT, Bcrypt
- **Storage:** Cloudinary
- **Other Tools:** Zod (Validation), Dotenv, Axios

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

---bash
git clone https://github.com/your-username/soundwave-music-app.git
cd soundwave-music-app
2. Setup Environment Files
For both admin, client, and server folders, create .env files.
/server/.env

---
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
/client/.env and /admin/.env

---
VITE_API_URL=http://localhost:5000
3. Install Dependencies
Server
cd server
npm install

Client
cd ../client
npm install

Admin
cd ../admin
npm install


4. Start Development Servers
Server
cd server
nodemon server.js

Client
cd ../client
npm run dev

Admin
cd ../admin
npm run dev


💡 Make sure MongoDB is running and Cloudinary credentials are correctly configured.
