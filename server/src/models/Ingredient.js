const { Schema, model } = require("mongoose");

const ingredientCategory = new Schema({
  name: String,
  noted: String,
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
  },
  ingredients: [
    {
      type: Schema.Types.ObjectId,
      ref: "IngredientItem",
    },
  ],
});

const IngredientCategory = model("IngredientCategory", ingredientCategory);

const ingredientItem = new Schema({
  name: String,
  noted: String,
  inStoke: {
    type: Boolean,
    default: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "IngredientCategory",
  },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
  },
});

const IngredientItem = model("IngredientItem", ingredientItem);

module.exports = { IngredientCategory, IngredientItem };
