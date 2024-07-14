const { CartService } = require("../services/cart-service");

const CartController = {
  async showByUser(req, res) {
    try {
      const data = await CartService.getByUser(req.user);

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  async store(req, res) {
    try {
      const data = await CartService.set(req.user);

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  async storeItem(req, res) {
    try {
      const data = await CartService.setItem(req.body, req.user._id);

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  async update(req, res) {
    try {
      const { item, quantity } = req.body;
      const data = await CartService.change(item, quantity);

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  async trash(req, res) {
    try {
      const data = await CartService.clear(req.user);

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  async destroy(req, res) {
    try {
      const data = await CartService.remove(req.params.id, req.user);

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

module.exports = { CartController };
