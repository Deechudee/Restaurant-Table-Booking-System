const express = require("express");

const router = express.Router();

const {
  getAllRestaurants,
  getSingleRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getOwnerRestaurant,
} = require("../controllers/restaurantController");

const {
  protect,
  ownerOnly,
} = require("../middleware/authMiddleware");

// ======================================
// Public Routes
// ======================================

// Get All Restaurants
router.get(
  "/",
  getAllRestaurants
);

// Get Single Restaurant
router.get(
  "/:id",
  getSingleRestaurant
);

// ======================================
// Restaurant Owner Routes
// ======================================

// Get Logged-in Owner Restaurant
router.get(
  "/owner/my-restaurant",
  protect,
  ownerOnly,
  getOwnerRestaurant
);

// Create Restaurant
router.post(
  "/",
  protect,
  ownerOnly,
  createRestaurant
);

// Update Restaurant
router.put(
  "/:id",
  protect,
  ownerOnly,
  updateRestaurant
);

// Delete Restaurant
router.delete(
  "/:id",
  protect,
  ownerOnly,
  deleteRestaurant
);

module.exports = router;