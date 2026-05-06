const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

// Load env variables
dotenv.config();

// Database connection
const connectDB = require("./config/db");

connectDB();


const app = express();

// ======================================
// Middleware
// ======================================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

// ======================================
// Routes
// ======================================

// Home Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Restaurant Reservation API Running 🚀",
  });
});

// Auth Routes
app.use(
  "/api/auth",
  require("./routes/authRoutes")
);

// Restaurant Routes
app.use(
  "/api/restaurants",
  require("./routes/restaurantRoutes")
);

// Booking Routes
app.use(
  "/api/bookings",
  require("./routes/bookingRoutes")
);

// ======================================
// 404 Route
// ======================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API Route Not Found",
  });
});

// ======================================
// Server
// ======================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port http://localhost:${PORT}`
  );
});