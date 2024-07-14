const { Cart } = require("../models/Cart");
const { Item } = require("../models/Item");
const { Food } = require("../models/Food");

const CartService = {
  async set(user) {
    try {
      const res = await Cart.create({ customer: user });

      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async getByUser(user) {
    try {
      let res = await Cart.findOne({ customer: user }).populate([
        {
          path: "items",
          populate: {
            path: "food",
            populate: { path: "restaurant", select: "_id" },
          },
        },
      ]);
      if (!res) throw new Error("The data not found!");

      let items = await Item.find({ cart: res._id }).populate({
        path: "food",
      });
      console.log(`Cart item: ${items}`);

      let totalPrice = 0;
      let totalDiscountedPrice = 0;
      let totalItem = 0;

      for (const item in res.items) {
        totalPrice += item.price;
        totalDiscountedPrice += item.discount;
        totalItem += item.quantity;
      }

      res.price = totalPrice;
      res.totalDiscount = totalDiscountedPrice;
      res.discount = totalPrice - totalDiscountedPrice;

      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async setItem(body, user) {
    try {
      const cat = await Cart.findOne({ customer: user });
      const fud = await Food.findById(body);
      const isPresent = await Item.findOne({
        food: fud._id,
        cart: cat._id,
        user: user,
      });

      if (!isPresent) {
        const item = await Item.create({
          food: fud._id,
          cart: cat._id,
          user: user,
          quantity: 1,
          price: fud.price,
        });

        cat.items.push(item);
        await cat.save();

        return item;
      }

      return isPresent;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async change(body, quantity) {
    try {
      const res = await Item.findById(body).populate([
        { path: "food", populate: { path: "restaurant", select: "_id" } },
      ]);
      if (!res) throw new Error("The data not found!");

      res.quantity = quantity;
      res.price = quantity * res.food.price;
      await res.save();

      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async remove(param, user) {
    try {
      const res = await Cart.findOne({ customer: user._id });
      if (!res) throw new Error("The data not found!");

      //Remove the item from the cart
      res.items = res.items.filter((val) => !val.equals(param));
      await res.save();

      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async clear(user) {
    try {
      const res = await Cart.findOne({ customer: user._id });
      if (!res) throw new Error("The data not found!");

      //Clear the item from the cart
      res.items = [];
      await res.save();

      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async calulate(cart) {
    try {
      let total = 0;
      for (const item in cart.items) {
        total += item.food.price * item.quantity;
      }

      return total;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = { CartService };
