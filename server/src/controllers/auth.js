const { JWTProvider } = require("../configures/jwt-provider");
const { UserService } = require("../services/user-service");
const bcrypt = require("bcrypt");

const AuthController = {
  async signUp(req, res) {
    try {
      const data = await UserService.set(req.body);
      // const jwt = JWTProvider.generate(data._id);

      return res.status(201).json({ message: "Created successfully!", data });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  async signIn(req, res) {
    try {
      const { email, password } = req.body;

      const data = await UserService.getByEmail(email);
      await bcrypt.compare(password, data.password).then((isValid) => {
        if (!isValid) {
          return res.status(401).json({ message: "Invalid password!" });
        }
      });

      const jwt = JWTProvider.generate(data._id);

      // Exclude the password field
      const { password: pwd, ...userWithoutPassword } = data._doc;

      return res.status(200).json({
        message: "Logined successfully!",
        data: userWithoutPassword,
        token: jwt,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

module.exports = { AuthController };
