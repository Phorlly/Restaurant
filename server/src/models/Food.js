const { Schema, model } = require("mongoose");

const foodSchema = new Schema({
  name: String,
  noted: String,
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  images: [String],
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
  },
  isVegetarian: {
    type: Boolean,
    default: false,
  },
  isSeasonal: {
    type: Boolean,
    default: false,
  },
  ingredients: [
    {
      type: Schema.Types.ObjectId,
      ref: "IngredientItem",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Food = model("Food", foodSchema);

module.exports = { Food };
