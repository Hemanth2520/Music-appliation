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
// connectDb();
const connectCloudinary = require("./utils/cloudinary");

const errorMiddleware = require("./middlewares/error-middleware");

// let's tackle cors
const corsOptions = {
  // origin: "http://localhost:5173",
  origin: (origin, callback) => {
    // Check if the origin is allowed
    const allowedOrigins = [
      // "http://localhost:5173",
      // "http://localhost:4173",
      // "https://thapatechnical.site",
      // "https://www.thapatechnical.site",
      " http://localhost:5001",
    ];
    const isAllowed = allowedOrigins.includes(origin);
    callback(null, isAllowed ? origin : false);
  },
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

// app.use(cors(corsOptions));
app.use(cors());

app.use(express.json());


// Mount the Router: To use the router in your main Express app, you can "mount" it at a specific URL prefix

app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);
app.use("/api/song",songRoute);
app.use("/api/album",albumRoute);


// let's define admin route
app.use("/api/admin", adminRoute);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5001;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
  });
});

connectCloudinary();