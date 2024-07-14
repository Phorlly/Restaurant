const { Schema, model } = require("mongoose");

const cartShema = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  qauntity: {
    type: Number,
    required: true,
    default: 1,
  },
  totalDiscount: {
    type: Number,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["PENDING", "PROCESSING", "DELIVERED"],
    default: "PENDING",
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  deliveryDate: Date,
  deliveryAddress: String,
  deliveryPhone: String,
});

const Cart = model("Cart", cartShema);

module.exports = { Cart };
