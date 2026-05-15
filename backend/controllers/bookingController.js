const Booking = require("../models/Booking");
const Restaurant = require("../models/Restaurant");



// ==============================
// Create Booking
// ==============================
async function createBooking(req, res) {
  try {
    const {
      restaurant,
      guestsCount,
      bookingDate,
      bookingTime,
      specialRequest,
      contactNumber,
    } = req.body;

    // Check restaurant exists
    const existingRestaurant = await Restaurant.findById(restaurant);

    if (!existingRestaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }

    // Validate guests count
    if (guestsCount > existingRestaurant.maxGuests) {
      return res.status(400).json({
        message: `Maximum allowed guests is ${existingRestaurant.maxGuests}`,
      });
    }

    // Create booking
    const booking = await Booking.create({
      restaurant,
      customer: req.user.id,
      guestsCount,
      bookingDate,
      bookingTime,
      specialRequest,
      contactNumber,
    });

    res.status(201).json({
      success: true,
      message: "Table booked successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// ==============================
// Get Logged-in User Bookings
// ==============================
async function getUserBookings(req, res) {
  try {
    const bookings = await Booking.find({
      customer: req.user.id,
    })
      .populate("restaurant")
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

// ==============================
// Restaurant Owner Dashboard
// ==============================
async function getRestaurantBookings(req, res) {
  try {
    const restaurant = await Restaurant.findOne({
      owner: req.user.id,
    });

    if (!restaurant) {
      return res.status(404).json({
        message: "No restaurant found",
      });
    }

    const bookings = await Booking.find({
      restaurant: restaurant._id,
    })
      .populate("customer", "name email")
      .sort({ bookingDate: 1 });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}


async function getOwnerBookings(
  req,
  res
) {

  try {

    // FIND OWNER RESTAURANTS

    const restaurants =
      await Restaurant.find({
        owner: req.user.id,
      });

    // GET IDS

    const restaurantIds =
      restaurants.map(
        (restaurant) =>
          restaurant._id
      );

    // FIND BOOKINGS

    const bookings =
      await Booking.find({
        restaurant: {
          $in: restaurantIds,
        },
      })
      .populate(
        "customer",
        "name email"
      )
      .populate(
        "restaurant",
        "restaurantName"
      );

    res.status(200).json({
      success: true,
      bookings,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
}

// ==============================
// Update Booking Status
// ==============================
const updateBookingStatus =
  async (req, res) => {

    try {

      const booking =
        await Booking.findById(
          req.params.id
        );

      if (!booking) {
        return res.status(404).json({
          message:
            "Booking not found",
        });
      }

      booking.bookingStatus =
        req.body.bookingStatus;

      await booking.save();

      res.status(200).json({
        success: true,
        booking,
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });
    }
  };
// ==============================
// Cancel Booking
// ==============================
async function cancelBooking(req, res) {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    // Only booking owner can cancel
    if (booking.customer.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Unauthorized access",
      });
    }

    // Enforce cancel policy: user can cancel only if it's more than 1 hour before booking
    // bookingDate is stored as String (expected: YYYY-MM-DD)
    // bookingTime is stored as String (expected: HH:mm or HH:mm:ss)
    const { bookingDate, bookingTime } = booking;

    if (bookingDate && bookingTime) {
      const normalizedTime = bookingTime.length === 5 ? `${bookingTime}:00` : bookingTime; // HH:mm -> HH:mm:00
      const bookingDateTime = new Date(`${bookingDate}T${normalizedTime}`);

      if (!Number.isNaN(bookingDateTime.getTime())) {
        const diffMs = bookingDateTime.getTime() - Date.now();
        const oneHourMs = 60 * 60 * 1000;

        if (diffMs <= oneHourMs) {
          return res.status(400).json({
            message: "You can only cancel at least 1 hour before the booking time.",
          });
        }
      }
    }

    await booking.deleteOne();

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}


module.exports = {
  createBooking,
  getUserBookings,
  getRestaurantBookings,
  updateBookingStatus,
  cancelBooking,
  getOwnerBookings,
};