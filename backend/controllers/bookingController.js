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
      startTime,
      endTime,
      specialRequest,
      contactNumber,
    } = req.body;

    if (!restaurant || !bookingDate || !startTime || !endTime) {
      return res.status(400).json({
        message:
          "restaurant, bookingDate, startTime, and endTime are required",
      });
    }

    const parsedGuests = Number(guestsCount);
    if (!Number.isFinite(parsedGuests)) {
      return res.status(400).json({
        message: "guestsCount must be a number",
      });
    }

    const phoneStr = String(contactNumber || "").trim();
    const digitsOnly = phoneStr.replace(/\D/g, "");
    if (!digitsOnly || digitsOnly.length < 8) {
      return res.status(400).json({
        message:
          "contactNumber must be provided with at least 8 digits",
      });
    }

    // Check restaurant exists
    const existingRestaurant = await Restaurant.findById(restaurant);

    if (!existingRestaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }

    // Validate guests count for this single booking
    if (parsedGuests < 1 || parsedGuests > existingRestaurant.maxGuests) {
      return res.status(400).json({
        message: `Guests must be between 1 and ${existingRestaurant.maxGuests}`,
      });
    }

    // ==============================
    // Dynamic time overlap + capacity
    // Reject only if total overlapping guests exceed available capacity
    // overlap condition: newStart < existingEnd && newEnd > existingStart
    // ==============================

    // Load existing bookings for this restaurant on the same date
    // (Note: bookingDate is stored as string in YYYY-MM-DD format)
    const sameDayBookings = await Booking.find({
      restaurant,
      bookingDate,
    });

    const toMinutes = (hhmm) => {
      // supports HH:mm only
      const [h, m] = String(hhmm).split(":").map(Number);
      if (!Number.isFinite(h) || !Number.isFinite(m)) return null;
      return h * 60 + m;
    };

    const newStartMins = toMinutes(startTime);
    const newEndMins = toMinutes(endTime);


    if (newStartMins === null || newEndMins === null) {
      return res.status(400).json({
        message: "Invalid startTime/endTime format. Use HH:mm.",
      });
    }

    // if end <= start, treat as invalid range
    if (newEndMins <= newStartMins) {
      return res.status(400).json({
        message: "Invalid time range: endTime must be after startTime.",
      });
    }

    const overlappingBookings = sameDayBookings.filter((b) => {
      // Support older documents that may have stored bookingTime instead of start/end.
      // If we only have bookingTime, treat it as the start time and assume a 1-hour slot.
      const existingStart = b.startTime || b.bookingTime;
      const existingEnd = b.endTime || (b.bookingTime ? b.bookingTime : undefined);

      const existingStartMins = toMinutes(existingStart);
      let existingEndMins = toMinutes(existingEnd);

      if (existingStartMins === null) return false;
      if (existingEndMins === null) {
        existingEndMins = existingStartMins + 60; // 1 hour fallback
      }

      // true overlap if newStart < existingEnd && newEnd > existingStart
      return (
        newStartMins < existingEndMins &&
        newEndMins > existingStartMins
      );
    });

    const totalOverlappingGuests = overlappingBookings.reduce((sum, b) => {
      return sum + (Number(b.guestsCount) || 0);
    }, 0);

    const projectedGuests = totalOverlappingGuests + parsedGuests;

    if (projectedGuests > existingRestaurant.availableSeats) {

      return res.status(400).json({
        message: `Capacity exceeded for this time range. Available: ${existingRestaurant.availableSeats}, requested overlapping: ${projectedGuests}`,
      });
    }

    // Create booking
    const booking = await Booking.create({
      restaurant,
      customer: req.user.id,
      guestsCount: parsedGuests,
      bookingDate,
      startTime,
      endTime,
      specialRequest,
      contactNumber: digitsOnly,
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
    // startTime/endTime are stored as String (expected: HH:mm)
    const { bookingDate, startTime } = booking;

    if (bookingDate && startTime) {
      const normalizedTime = startTime.length === 5 ? `${startTime}:00` : startTime;
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