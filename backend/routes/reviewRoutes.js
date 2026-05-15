const express = require("express");

const router = express.Router();

const {
  addReview,
} = require("../controllers/reviewController");

const {
  protect,
} = require("../middleware/authMiddleware");

router.post(
  "/restaurants/:id/reviews",
  protect,
  addReview
);

module.exports = router;