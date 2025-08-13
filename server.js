require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");
const songRoute = require("./router/song-route");
const albumRoute = require("./router/album-route");

const connectDb = require("./utils/db");
const connectCloudinary = require("./utils/cloudinary");
const errorMiddleware = require("./middlewares/error-middleware");

// ✅ Define allowed origins outside
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4173",
  "https://music-appliation-n795.vercel.app"
];

// ✅ CORS middleware
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true
}));

// Middleware
app.use(express.json());

// ✅ Root route for Render health check
app.get("/", (req, res) => {
  res.send("🎵 Harmonify Backend is Running!");
});

// ✅ Route Mounts
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);
app.use("/api/song", songRoute);
app.use("/api/album", albumRoute);
app.use("/api/admin", adminRoute);

// ✅ Error Middleware
app.use(errorMiddleware);

// ✅ Connect to DB and start server
const PORT = process.env.PORT || 5001;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running on port: ${PORT}`);
  });
});

// ✅ Connect Cloudinary
connectCloudinary();
