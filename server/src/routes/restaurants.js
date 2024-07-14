const { Router } = require("express");
const { authenticate } = require("../configures/authenticate");
const { RestaurantController } = require("../controllers/restaurant");

const restaurantRoutes = Router();
const adminRestaurantRoutes = restaurantRoutes;

//For Customer and Admin only
restaurantRoutes.get("/", RestaurantController.index);
restaurantRoutes.get("/search", RestaurantController.search);
restaurantRoutes.get("/:id", RestaurantController.show);
restaurantRoutes.post(
  "/:id/favorite",
  authenticate,
  RestaurantController.favorite
);

//For Admin only
adminRestaurantRoutes.get(
  "/owner",
  authenticate,
  RestaurantController.showByUser
);
adminRestaurantRoutes.post("/", authenticate, RestaurantController.store);
adminRestaurantRoutes.put(
  "/:id/status",
  authenticate,
  RestaurantController.update
);
adminRestaurantRoutes.delete(
  "/:id",
  authenticate,
  RestaurantController.destroy
);

module.exports = { restaurantRoutes, adminRestaurantRoutes };
