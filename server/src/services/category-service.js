const { Category } = require("../models/Category");
const { Restaurant } = require("../models/Restaurant");

const CategoryService = {
  async set(body, user) {
    try {
      const shop = await Restaurant.findOne({ owner: user });
      if (!shop) throw new Error("The data not found!");

      const res = await Category.create({
        name: body,
        noted: body,
        restaurant: shop._id,
      });

      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async gets(param) {
    try {
      const res = await Category.find({ restaurant: param });

      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async get(param) {
    try {
      const res = await Category.findById(param);
      if (!res) throw new Error("The data not found!");

      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = { CategoryService };
