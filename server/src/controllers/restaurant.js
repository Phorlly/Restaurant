const { RestaurantService } = require("../services/restaurant-service");

const RestaurantController = {
  async index(req, res) {
    try {
      const datas = await RestaurantService.gets();

      return res.status(200).json(datas);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  },
  async search(req, res) {
    try {
      const datas = await RestaurantService.find(req.query.keyword);

      return res.status(200).json(datas);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  },
  async favorite(req, res) {
    try {
      const data = await RestaurantService.setFavorite(req.params.id, req.user);
      return res.status(200).json(data);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  },
  async showByUser(req, res) {
    try {
      const data = await RestaurantService.getByUser(req.user._id);

      return res.status(200).json(data);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  },
  async show(req, res) {
    try {
      const data = await RestaurantService.get(req.params.id);

      return res.status(200).json(data);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  },
  async store(req, res) {
    try {
      const data = await RestaurantService.set(req.body, req.user);

      return res.status(201).json({ message: "Created Successfully!!", data });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  },
  async update(req, res) {
    try {
      const user = req.user;
      console.log(`The user info: ${user}`);
      const data = await RestaurantService.change(req.params.id);

      return res.status(200).json({ message: "Updated Successfully!", data });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  },
  async destroy(req, res) {
    try {
      const user = req.user;
      console.log(`The user info: ${user}`);
      await RestaurantService.remove(req.params.id);

      return res
        .status(200)
        .json({ message: "Deleted Successfully!!", success: true });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  },
};
module.exports = { RestaurantController };
