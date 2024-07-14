const { Router } = require("express");
const { IngredientController } = require("../controllers/ingredient");
const { authenticate } = require("../configures/authenticate");

const ingredientRoutes = Router();

ingredientRoutes.get("/:shop", authenticate, IngredientController.showCategory);
ingredientRoutes.get("/:shop", authenticate, IngredientController.showItem);
ingredientRoutes.post(
  "/category",
  authenticate,
  IngredientController.storeCategory
);
ingredientRoutes.post("/item", authenticate, IngredientController.showItem);
ingredientRoutes.put("/:id", authenticate, IngredientController.update);

module.exports = { ingredientRoutes };
