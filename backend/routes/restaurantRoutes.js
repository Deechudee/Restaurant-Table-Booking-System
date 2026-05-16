const express = require("express");

const router = express.Router();

const {
  getAllRestaurants,
  getSingleRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getOwnerRestaurants,
  getDashboardStats,
} = require(
  "../controllers/restaurantController"
);

const {
  protect,
  ownerOnly,
} = require(
  "../middleware/authMiddleware"
);

// ======================================
// OWNER ROUTES
// ======================================

router.get(
  "/dashboard-stats",
  protect,
  ownerOnly,
  getDashboardStats
);

router.get(
  "/owner/my-restaurants",
  protect,
  ownerOnly,
  getOwnerRestaurants
);

// ======================================
// PUBLIC ROUTES
// ======================================

router.get(
  "/",
  getAllRestaurants
);

router.get(
  "/:id",
  getSingleRestaurant
);

// ======================================
// CREATE
// ======================================

router.post(
  "/",
  protect,
  ownerOnly,
  createRestaurant
);

// ======================================
// UPDATE
// ======================================

router.put(
  "/:id",
  protect,
  ownerOnly,
  updateRestaurant
);

// ======================================
// DELETE
// ======================================

router.delete(
  "/:id",
  protect,
  ownerOnly,
  deleteRestaurant
);

module.exports = router;