const { FoodService } = require("../services/food-service");
const { RestaurantService } = require("../services/restaurant-service");

const FoodController = {
  async index(req, res) {
    try {
      const datas = await FoodService.gets(req.params.shop, req.query);

      return res.status(200).json(datas);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  async update(req, res) {
    try {
      const data = await FoodService.change(req.params.id);

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  async search(req, res) {
    try {
      const datas = await FoodService.find(req.query.keyword);

      return res.status(200).json(datas);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  async store(req, res) {
    try {
      const item = req.body;
      const user = req.user;
      console.log(`The user id: ${user}`);
      const rst = await RestaurantService.get(item.restaurant);
      const data = await FoodService.set(item, rst);

      return res.status(200).json({ message: "Created Successfully!", data });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  async destroy(req, res) {
    try {
      const user = req.user;
      console.log(`The user id: ${user}`);
      await FoodService.remove(req.params.id);

      return res.status(200).json({ message: "Deleted Successfully!" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

module.exports = { FoodController };
