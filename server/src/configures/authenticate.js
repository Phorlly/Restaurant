const { UserService } = require("../services/user-service");
const { JWTProvider } = require("./jwt-provider");

module.exports = {
  async authenticate(req, res, next) {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        console.error("No authorization header provided");
        return res
          .status(401)
          .json({ message: "No authorization header provided" });
      }

      const tokenParts = authorization.split(" ");
      if (tokenParts[0] !== "Bearer" || tokenParts.length !== 2) {
        console.error("Invalid authorization header format");
        return res
          .status(401)
          .json({ message: "Invalid authorization header format" });
      }

      const token = tokenParts[1];
      if (!token) {
        console.error("No token provided");
        return res.status(401).json({ message: "No token provided" });
      }

      const id = JWTProvider.verify(token);
      if (!id) {
        console.error("Invalid token");
        return res.status(401).json({ message: "Invalid token" });
      }

      const data = await UserService.get(id);
      if (!data) {
        console.error("User not found");
        return res.status(404).json({ message: "User not found" });
      }

      req.user = data;
      next();
    } catch (error) {
      console.error("Error in authentication middleware:", error);
      return res.status(500).json({ message: error.message });
    }
  },
};
