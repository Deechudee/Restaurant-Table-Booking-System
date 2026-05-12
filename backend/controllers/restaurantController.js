const Restaurant = require("../models/Restaurant");



// ===================================
// Get All Restaurants
// ===================================
async function getAllRestaurants(req, res) {
  try {
    const restaurants = await Restaurant.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: restaurants.length,
      restaurants,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// ===================================
// Get Single Restaurant
// ===================================
async function getSingleRestaurant(req, res) {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }

    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

// ===================================
// Get Logged-in Owner Restaurant
// ===================================
async function getOwnerRestaurants(
  req,
  res
) {
  try {

    const restaurants =
      await Restaurant.find({
        owner: req.user.id,
      });

    if (!restaurants) {
      return res.status(404).json({
        message:
          "Restaurant not found",
      });
    }

    res.status(200).json({
      restaurants,
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });
  }
}
// ===================================
// Create Restaurant
// ===================================
async function createRestaurant(req, res) {
  try {
    const newRestaurant = await Restaurant.create({
      ...req.body,
      owner: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Restaurant created successfully",
      restaurant: newRestaurant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// ===================================
// Update Restaurant
// ===================================
async function updateRestaurant(req, res) {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }

    // Owner validation
    if (restaurant.owner.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Unauthorized access",
      });
    }

    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Restaurant updated successfully",
      updatedRestaurant,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

// ===================================
// Delete Restaurant
// ===================================
async function deleteRestaurant(req, res) {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }

    // Owner validation
    if (restaurant.owner.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Unauthorized access",
      });
    }

    await restaurant.deleteOne();

    res.status(200).json({
      success: true,
      message: "Restaurant deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = {
  getAllRestaurants,
  getSingleRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getOwnerRestaurants,
};