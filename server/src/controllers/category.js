const { CategoryService } = require("../services/category-service");

const CategoryController = {
  async index(req, res) {
    try {
      const datas = await CategoryService.gets(req.params.restaurant);

      return res.status(200).json(datas);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  async show(req, res) {
    try {
      const user = req.user;
      console.log(`The user id: ${user}`);
      const data = await CategoryService.get(req.params.id);

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  async store(req, res) {
    try {
      const data = await CategoryService.set(req.body.name, req.user._id);

      return res.status(201).json({ message: "Created Successfully!", data });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

module.exports = { CategoryController };
