const { JWTProvider } = require("../configures/jwt-provider");
const { UserService } = require("../services/user-service");

const UserController = {
  async index(req, res) {
    try {
      const datas = await UserService.gets();

      return res.status(200).json(datas);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  async show(req, res) {
    try {
      const data = req.user;
      // const token = JWTProvider.generate(req.user._id);
      // const data = await UserService.getProfile(token);
      const { password: pwd, ...info } = data._doc;

      return res.status(200).json(info);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

module.exports = { UserController };
