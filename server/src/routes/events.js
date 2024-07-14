const { Router } = require("express");
const { EventController } = require("../controllers/event");

const eventRoutes = Router();

eventRoutes.get("/", EventController.index);
eventRoutes.post("/:id", EventController.store);
eventRoutes.get("/:id", EventController.show);
eventRoutes.get("/:shop", EventController.showByRestaurant);
eventRoutes.delete("/:id", EventController.destroy);

module.exports = { eventRoutes };
