const { Food } = require("../models/Food");

const FoodService = {
  async gets(param, body) {
    try {
      const query = { restaurant: param };
      console.log(body.nonveg);

      if (body.vegetarian === "true") query.isVegetarian = true;
      if (body.nonveg === "true") query.vegetarian = false;
      if (body.seasonal === "true") query.isSeasonal = true;
      if (body.category) query.category = body.category;

      const res = await Food.find(query).populate([
        { path: "ingredients", populate: { path: "category", select: "name" } },
        "category",
        { path: "restaurant", select: "name _id" },
      ]);

      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async set(body, shop) {
    try {
      const { name, noted, price, images, category, ingredients } = body;
      const res = await Food.create({
        name,
        noted,
        category,
        ingredients,
        images,
        price,
        restaurant: shop._id,
      });

      shop.foods.push(res._id);
      await shop.save();

      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async find(keyword) {
    try {
      let query = {};
      if (keyword) {
        query.$or = [
          { name: { $regex: keyword, $options: "i" } },
          { "category.name": { $regex: keyword, $options: "i" } },
        ];
      }
      const res = await Food.find(query);

      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async change(param) {
    try {
      const res = await Food.findById(param).populate([
        { path: "ingredients", populate: { path: "category", select: "name" } },
        "category",
        { path: "restaurant", select: "name _id" },
      ]);

      if (!res) throw new Error("The data not found!");
      res.isAvailable = !res.isAvailable;
      await res.save();

      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async get(param) {
    try {
      const res = await Food.findById(param);
      if (!res) throw new Error("The data not found!");

      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async remove(param) {
    try {
      const res = await Food.findById(param);
      if (!res) throw new Error("The data not found!");

      await Food.findByIdAndDelete(param);
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = { FoodService };
