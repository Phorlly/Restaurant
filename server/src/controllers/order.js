const { OrderService } = require("../services/order-service");

const OrderController = {
  //For Customer Order only
  async store(req, res) {
    try {
      const data = await OrderService.set(req.body, req.user);

      return res.status(201).json({ message: "Created Successfully!", data });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  async show(req, res) {
    try {
      const data = OrderService.getByUser(req.user._id);

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  //For Admin Order only
  async index(req, res) {
    try {
      const data = await OrderService.gets(req.params.shop, req.query.status);

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  async update(req, res) {
    try {
      const data = await OrderService.change(req.params.id, req.params.status);

      return res.status(200).json({ message: "Updated Successfully!", data });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  async destroy(req, res) {
    try {
      await OrderService.cancel(req.params.id);

      return res.status(200).json("Deleted Successfully");
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

module.exports = { OrderController };
