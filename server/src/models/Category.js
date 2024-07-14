const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
  name: String,
  noted: String,
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
  },
});

const Category = model("Category", categorySchema);

const eventSchema = new Schema({
  image: String,
  startedAt: String,
  endedAt: String,
  title: String,
  noted: String,
  location: String,
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
  },
});

const Event = model("Event", eventSchema);

module.exports = { Category, Event };
