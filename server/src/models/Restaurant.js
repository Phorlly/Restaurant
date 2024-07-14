const { Schema, model } = require("mongoose");

const restaurantSchama = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: String,
  noted: String,
  cuisineType: String,
  address: {
    type: Schema.Types.ObjectId,
    ref: "Address",
  },
  contactInfo: {},
  openingHours: String,
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isOpening: {
    type: Boolean,
    default: true,
  },
  foods: [
    {
      type: Schema.Types.ObjectId,
      ref: "Food",
    },
  ],
});

const Restaurant = model("Restaurant", restaurantSchama);

module.exports = { Restaurant };
