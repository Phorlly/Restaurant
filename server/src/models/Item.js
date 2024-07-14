const { Schema, model } = require("mongoose");

const itemSchema = new Schema({
  cart: {
    type: Schema.Types.ObjectId,
    ref: "Cart",
  },
  food: {
    type: Schema.Types.ObjectId,
    ref: "Food",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  quantity: {
    type: Number,
    default: 1,
    min: 1,
    max: 100, // Maximum quantity allowed per item in a cart.
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100, // Maximum discount allowed per item in a cart.
  },
  ingredients: [String],
  price: {
    type: Number,
    required: true,
    min: 0, // Minimum price allowed per item in a cart.
    max: 10000, // Maximum price allowed per item in a cart.
  },
});

const Item = model("Item", itemSchema);

module.exports = { Item };
