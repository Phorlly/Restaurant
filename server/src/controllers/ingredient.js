const { IngredientService } = require("../services/ingredient-service");

const IngredientController = {
  async storeCategory(req, res) {
    try {
      const { name, shop } = req.body;
      const data = await IngredientService.setCategory(name, shop);

      return res.status(201).json({ message: "Created Successfully!", data });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  async storeItem(req, res) {
    try {
      const { name, shop, category } = req.body;
      const data = await IngredientService.setItem(shop, name, category);

      return res.status(201).json({ message: "Created Successfully!", data });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  async update(req, res) {
    try {
      const data = await IngredientService.change(req.params.id);

      return res.status(200).json({ message: "Updated Successfully!", data });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  async showItem(req, res) {
    try {
      const data = await IngredientService.getItems(req.params.shop);

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  async showCategory(req, res) {
    try {
      const data = await IngredientService.getCategories(req.params.shop);

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = { IngredientController };
