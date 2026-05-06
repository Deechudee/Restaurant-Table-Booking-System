const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/authController");

const {
  protect,
} = require("../middleware/authMiddleware");

// ======================================
// Public Routes
// ======================================

// Register User
router.post(
  "/register",
  registerUser
);

// Login User
router.post(
  "/login",
  loginUser
);

// ======================================
// Protected Routes
// ======================================

// Get Logged-in User Profile
router.get(
  "/profile",
  protect,
  getProfile
);

module.exports = router;