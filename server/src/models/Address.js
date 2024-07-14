const { Schema, model } = require("mongoose");

const addressSchema = new Schema({
  name: String,
  province: String,
  district: String,
  commune: String,
  village: String,
  houseNumber: String,
  buildingNumber: String,
  floor: String,
  street: String,
  city: String,
  state: String,
  postalCode: String,
  country: String,
});

const Address = model("Address", addressSchema);

module.exports = { Address };
