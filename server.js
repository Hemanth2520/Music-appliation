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

// Optional: CORS options (currently not used)
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      "http://localhost:5173",
      "http://localhost:4173",
      "https://music-appliation-n795.vercel.app/", // Replace with your deployed frontend
    ];
    const isAllowed = allowedOrigins.includes(origin);
    callback(null, isAllowed ? origin : false);
  },
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true,
};

// Use default open CORS (allow all origins for now)
app.use(cors());

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
