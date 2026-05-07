const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    restaurantName: {
      type: String,
      required: [true, "Restaurant name is required"],
      trim: true,
    },

    image: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    },

    cuisine: {
      type: String,
      enum: [
        "Indian",
        "Chinese",
        "Japanese",
        "Italian",
        "Mexican",
        "Western",
      ],
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    area: {
      type: String,
      enum: ["North", "South", "East", "West", "Central"],
    },

    openingTime: {
      type: String,
      required: true,
    },

    closingTime: {
      type: String,
      required: true,
    },

    closedDays: {
      type: [String],
      default: [],
    },
    
    address: {
      type: String,
      required: true,
    },

    phoneNumber: {
      type: String,
      required: true,
    },

    website: {
      type: String,
    },

    maxGuests: {
      type: Number,
      required: true,
      min: 1,
    },

    description: {
      type: String,
      maxlength: 500,
    },
    
    menu: [
      {
        itemName: String,
        price: Number,
        image: String,
      },
    ],

    reviews: [
      {
        userName: String,
        rating: Number,
        comment: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);