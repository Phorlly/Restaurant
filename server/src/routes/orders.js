const { Router } = require("express");
const { authenticate } = require("../configures/authenticate");
const { OrderController } = require("../controllers/order");

const orderRoutes = Router();
const adminOrderRoutes = orderRoutes;

//For Customer only
orderRoutes.post("/", authenticate, OrderController.store);
orderRoutes.get("/user", authenticate, OrderController.show);

//For Staff only
adminOrderRoutes.get("/:shop/:status", authenticate, OrderController.index);
adminOrderRoutes.put("/:id/:status", authenticate, OrderController.update);
adminOrderRoutes.delete("/:id", authenticate, OrderController.destroy);

module.exports = { orderRoutes, adminOrderRoutes };
