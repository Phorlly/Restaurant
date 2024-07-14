const { Address } = require("../models/Address");
const { Restaurant } = require("../models/Restaurant");
const { CartService } = require("./cart-service");
const { Item } = require("../models/Item");
const { Order } = require("../models/Order");

const OrderService = {
  async set(body, user) {
    try {
      const ads = body.address;
      let old = null;
      if (ads._id) {
        const isExisting = await Address.findById(ads._id);
        if (isExisting) {
          old = isExisting;
        } else {
          old = await Address.create(ads);
        }
      }

      if (!user.addresses.includes(old._id)) {
        user.addresses.push(old._id);
        await user.save();
      }

      const shop = await Restaurant.findById(body.restaurant);
      if (!shop) throw new Error("Restaurant not found");

      const cat = await CartService.getByUser(user._id);
      if (!cat) throw new Error("Cart not found");

      let orderTtems = [];
      for (const item of cat.items) {
        const oderItem = await Item.creat({
          food: item.food,
          quantity: item.quantity,
          price: item.food.price * item.quantity,
          ingredients: item.ingredients,
        });
        orderTtems.push(oderItem._id);
      }

      const total = await CartService.calulate(cat);
      const res = await Order.create({
        customer: user._id,
        restaurant: shop._id,
        address: old._id,
        items: orderTtems,
        amount: total,
      });
      shop.orders.push(res._id);
      await shop.save();

      // const payment = await PaymentService.payment(order);
      // console.log(`The payment was successfully => ${payment}`);

      // return payment;
      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async cancel(param) {
    try {
      await Order.findByIdAndDelete(param);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async getByUser(user) {
    try {
      const res = await Order.find({ customer: user });
      if (!res) throw new Error("The data not found!");

      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async get(param) {
    try {
      const res = await Order.findById(param);
      if (!res) throw new Error("The data not found!");

      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async gets(param, status) {
    try {
      let res = await Order.find({ restaurant: param });
      if (!res) throw new Error("The data not found!");
      if (status) res = res.filter((val) => val.status === status);

      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async change(param, status) {
    try {
      const validStatus = ["PENDING", "DELEVERED", "COMPLETED", "CANCELLED"];
      if (!validStatus.includes(status))
        throw new Error("Please select a status");

      const res = await Order.findById(param);
      if (!res) throw new Error("The res not found!");
      res.status = status;
      await res.save();

      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = { OrderService };
