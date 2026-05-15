const Restaurant = require("../models/Restaurant");

async function addReview(
  req,
  res
) {

  try {

    const restaurant =
      await Restaurant.findById(
        req.params.id
      );

    if (!restaurant) {
      return res.status(404).json({
        message:
          "Restaurant not found",
      });
    }

    const review = {
      userName:
        req.body.userName,
      rating:
        req.body.rating,
      comment:
        req.body.comment,
    };

    restaurant.reviews.push(
      review
    );

    await restaurant.save();

    res.status(201).json(
      restaurant
    );

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });
  }
}

module.exports = {
  addReview,
};