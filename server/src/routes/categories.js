const { Router } = require("express");
const { CategoryController } = require("../controllers/category");
const { authenticate } = require("../configures/authenticate");

const categoryRoutes = Router();
const adminCategoryRoutes = categoryRoutes;

//For customers accessing routes
categoryRoutes.get("/:restaurant", CategoryController.index);

//For admin accessing routes
adminCategoryRoutes.post("/", authenticate, CategoryController.store);
adminCategoryRoutes.get("/:id", authenticate, CategoryController.show);

module.exports = { categoryRoutes, adminCategoryRoutes };
