const { IngredientItem, IngredientCategory } = require("../models/Ingredient");
const { Restaurant } = require("../models/Restaurant");

const IngredientService = {
  async setCategory(name, shop) {
    try {
      let res = await IngredientCategory.findOne({
        name: name,
        restaurant: shop,
      });
      if (res) return res;

      const home = await Restaurant.findById(shop);
      if (!home) throw new Error("The data not found!");

      res = await IngredientCategory.create({
        name: name,
        restaurant: shop,
      });

      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async getCategory(param) {
    try {
      const res = await IngredientCategory.findById(param);
      if (!res) throw new Error("The data not found!");

      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async getCategories(param) {
    try {
      const res = await IngredientCategory.find({ restaurant: param });
      if (!res) throw new Error("The data not found!");

      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async getItems(param) {
    try {
      const res = await IngredientItem.find({ restaurant: param }).populate(
        "category"
      );
      if (!res) throw new Error("The data not found!");

      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async setItem(shop, name, category) {
    try {
      const cate = await this.getCategory(category);
      if (!cate) throw new Error("The data not found!");

      let res = await IngredientItem.findOne({
        name: name,
        restaurant: shop,
        category: cate._id,
      });
      if (res) return res;

      const home = await Restaurant.findById(shop);
      if (!home) throw new Error("The data not found!");

      res = await IngredientItem.create({
        name: name,
        category: cate._id,
        restaurant: shop,
      });
      cate.ingredients.push(res._id);
      await cate.save();

      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async change(param) {
    try {
      const res = await IngredientItem.findById(param).populate("category");
      if (!res) throw new Error("The data not found!");

      res.inStoke = !res.inStoke;
      await res.save();

      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = { IngredientService };
