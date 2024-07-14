const { Router } = require("express");
const { CartController } = require("../controllers/cart");
const { authenticate } = require("../configures/authenticate");

const cartRoutes = Router();
const itemRoutes = cartRoutes;

//For cart routes
cartRoutes.put("/", authenticate, CartController.storeItem);
cartRoutes.get("/", authenticate, CartController.showByUser);
cartRoutes.put("/clear", authenticate, CartController.trash);

//For item routes
itemRoutes.put("/", authenticate, CartController.update);
itemRoutes.delete("/:id", authenticate, CartController.destroy);

module.exports = { cartRoutes, itemRoutes };
