const { Router } = require("express");
const { FoodController } = require("../controllers/food");

const foodRoutes = Router();

foodRoutes.get("/:shop/restaurant", FoodController.index);
foodRoutes.get("/search", FoodController.search);
foodRoutes.post("/", FoodController.store);
foodRoutes.put("/:id", FoodController.update);
foodRoutes.delete("/:id", FoodController.destroy);

module.exports = { foodRoutes };
