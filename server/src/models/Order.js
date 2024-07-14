const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["PENDING", "DELEVERED", "COMPLETED", "CANCELLED"],
    default: "PENDING",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  address: {
    type: Schema.Types.ObjectId,
    ref: "Address",
  },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "OrderItem",
    },
  ],
  payment: {
    type: Schema.Types.ObjectId,
    ref: "Payment",
  },
  qauntity: {
    type: Number,
    required: true,
    default: 1,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  paymentMethod: String,
  paymentStatus: String,
  deliveryMethod: String,
  deliveryStatus: String,
});

const Order = model("Order", orderSchema);

const orderItemSchema = new Schema({
  food: {
    type: Schema.Types.ObjectId,
    ref: "Food",
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    max: 100,
  },
  ingredients: [String],
  price: {
    type: Number,
    required: true,
    min: 0,
    max: 1000,
  },
});

const OrderItem = model("OrderItem", orderItemSchema);

module.exports = { Order, OrderItem };
