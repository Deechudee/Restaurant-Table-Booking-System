const express = require("express");

const router = express.Router();

const {
  createBooking,
  getUserBookings,
  getRestaurantBookings,
  updateBookingStatus,
  cancelBooking,
} = require("../controllers/bookingController");

const {
  protect,
  ownerOnly,
} = require("../middleware/authMiddleware");

// ======================================
// Customer Routes
// ======================================

// Create Booking
router.post(
  "/",
  protect,
  createBooking
);

// Get Logged-in User Bookings
router.get(
  "/my-bookings",
  protect,
  getUserBookings
);

// Cancel Booking
router.delete(
  "/:id",
  protect,
  cancelBooking
);

// ======================================
// Restaurant Owner Routes
// ======================================

// Get Restaurant Bookings
router.get(
  "/restaurant/all",
  protect,
  ownerOnly,
  getRestaurantBookings
);

// Update Booking Status
router.put(
  "/status/:id",
  protect,
  ownerOnly,
  updateBookingStatus
);

module.exports = router;