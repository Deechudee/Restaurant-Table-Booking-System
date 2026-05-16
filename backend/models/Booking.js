const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    guestsCount: {
      type: Number,
      required: true,
      min: 1,
      max: 15,
    },

    bookingDate: {
      type: String,
      required: true,
    },

    startTime: {
      type: String,
      required: true,
    },

    endTime: {
      type: String,
      required: true,
    },


    specialRequest: {
      type: String,
      maxlength: 200,
    },

    bookingStatus: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"],
      default: "Pending",
    },

    contactNumber: {
      // store digits-only phone as string to avoid issues with leading zeros
      type: String,
      required: true,
      trim: true,
    },

  },
  {
    timestamps: true,
  }
);

// Backward compatibility: schema now uses startTime/endTime.
// bookingTime is deprecated but can still exist in older documents.
module.exports = mongoose.model("Booking", bookingSchema);

