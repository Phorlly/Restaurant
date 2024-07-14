const { EventService } = require("../services/event-service");

const EventController = {
  async store(req, res) {
    try {
      const data = await EventService.set(req.body, req.params.id);

      return res.status(201).json({ message: "Created Successfully!", data });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  async index(req, res) {
    try {
      const datas = await EventService.gets();

      return res.status(200).json(datas);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  async show(req, res) {
    try {
      const data = await EventService.get(req.params.id);

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  async showByRestaurant(req, res) {
    try {
      const data = await EventService.getByRestaurant(req.params.shop);

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  async destroy(req, res) {
    try {
      await EventService.remove(req.params.id);

      return res
        .status(200)
        .json({ message: "Deleted Successfully!", success: true });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = { EventController };
