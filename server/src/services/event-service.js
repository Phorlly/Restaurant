const { Restaurant } = require("../models/Restaurant");
const { Event } = require("../models/Category");

const EventService = {
  async set(body, param) {
    try {
      const shop = await Restaurant.findById(param);
      if (!shop) throw new Error("The data not found!");

      const res = await Event.create({
        title: body.title,
        noted: body.noted,
        startedAt: body.startedAt,
        endedAt: body.endedAt,
        restaurant: param,
        location: body.location,
        image: body.image,
      });

      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async gets() {
    try {
      const res = await Event.find();

      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async getByRestaurant(param) {
    try {
      const res = await Event.find({ restaurant: param });

      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async remove(param) {
    try {
      await Event.findByIdAndDelete(param);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async get(param) {
    try {
      const res = await Event.findById(param);
      if (!res) throw new Error("The data not found!");

      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = { EventService };
