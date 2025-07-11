# 🎵 Harmonify Music App

A full-featured music streaming application built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). It includes admin and user functionality, music player, authentication, playlists, and more.

🌐 **Live Site:**
🔗 [https://music-appliation-n795.vercel.app](https://music-appliation-n795.vercel.app)

---

## 📁 Project Structure

```
harmonify-music-app/
├── admin/        # Admin dashboard (React)
├── client/       # User-facing music app frontend (React)
├── server/       # Backend API with Express.js and MongoDB
└── README.md
```

---

## 🚀 Features

* 🎷 Music Player with Play/Pause, Skip, Seek, Volume control
* 🔐 Authentication (Login, Signup)
* 🢁 Admin Panel for managing songs/albums
* 📂 Playlist and Like functionality
* 🎨 Responsive UI using Tailwind CSS
* ☁️ Media Upload with Cloudinary
* 🔁 Real-time updates and state sync
* 🌍 Deployed on Vercel (Frontend) and Render (Backend)

---

## 🔧 Tech Stack

| Layer       | Tech                              |
| ----------- | --------------------------------- |
| Frontend    | React, Tailwind CSS, React Router |
| Backend     | Node.js, Express.js, MongoDB, Zod |
| Auth        | JWT                               |
| File Upload | Multer, Cloudinary                |
| Deployment  | Vercel (client), Render (server)  |

---

## 🛠️ Getting Started

### 1. Clone the repo:

```bash
git clone https://github.com/Hemanth2520/Music-appliation.git
cd Music-appliation
```

### 2. Install dependencies:

```bash
# For client
cd client
npm install

# For admin
cd ../admin
npm install

# For server
cd ../server
npm install
```

### 3. Environment variables:

Create `.env` files for both client and server. Example for server:

```env
PORT=5000
MONGODB_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. Run locally:

```bash
# Server
cd server
npm run dev

# Client
cd ../client
npm start

# Admin
cd ../admin
npm start
```



## 🌐 Live URL

> Visit the deployed version of the music app:

🎷 [https://music-appliation-n795.vercel.app](https://music-appliation-n795.vercel.app)

---

