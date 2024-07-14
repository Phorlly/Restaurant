const { Router } = require("express");
const { AuthController } = require("../controllers/auth");
const { UserController } = require("../controllers/user");
const { authenticate } = require("../configures/authenticate");

const userRoutes = Router();

userRoutes.post("/create", AuthController.signUp);
userRoutes.post("/login", AuthController.signIn);

userRoutes.get("/", UserController.index);
userRoutes.get("/profile", authenticate, UserController.show);

module.exports = { userRoutes };
