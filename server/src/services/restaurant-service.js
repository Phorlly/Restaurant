const { Address } = require("../models/Address");
const { Restaurant } = require("../models/Restaurant");

const RestaurantService = {
  async set(body, user) {
    try {
      const { title, contactInfo, noted, openingHours, cuisineType, images } =
        body;

      const ads = await Address.create(body);
      const res = await Restaurant.create({
        address: ads,
        owner: user,
        title,
        contactInfo,
        noted,
        openingHours,
        cuisineType,
        images,
      });

      return res;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  async get(param) {
    try {
      const res = await Restaurant.findById(param);
      if (!res) throw new Error("The data not found!");

      return res;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  async remove(param) {
    try {
      this.get(param);
      await Restaurant.findByIdAndDelete(param);
    } catch (err) {
      throw new Error(err.message);
    }
  },
  async gets() {
    try {
      const res = await Restaurant.find();

      return res;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  async getByUser(user) {
    try {
      const res = await Restaurant.findOne({ owner: user })
        .populate("owner")
        .populate("address");
      if (!res) throw new Error("The data not found!");

      return res;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  async find(keyword) {
    try {
      const res = await Restaurant.find({
        $or: [
          {
            title: { $regex: keyword, $options: "i" },
            noted: { $regex: keyword, $options: "i" },
            cuisineType: { $regex: keyword, $options: "i" },
          },
        ],
      });

      return res;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  async setFavorite(param, user) {
    try {
      const shop = this.get(param);
      const res = {
        _id: shop._id,
        title: shop.title,
        noted: shop.noted,
        images: shop.images,
      };

      const favorites = user.favorites || [];
      const index = favorites.findIndex((val) => val._id === param);

      if (index === -1) {
        favorites.push(res);
      } else {
        favorites.splice(index, 1);
      }
      await user.save();

      return res;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  async change(param) {
    try {
      const res = await Restaurant.findById(param)
        .populate("owner")
        .populate("address");

      if (!res) throw new Error("The data not found!");
      res.isOpening = !res.isOpening;
      await res.save();

      return res;
    } catch (err) {
      throw new Error(err.message);
    }
  },
};

module.exports = { RestaurantService };
