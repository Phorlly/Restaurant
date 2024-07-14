const { JWTProvider } = require("../configures/jwt-provider");
const { User } = require("../models/User");
const bcrypt = require("bcrypt");

const UserService = {
  async set(body) {
    try {
      let { name, email, password, role } = body;
      const isExisting = await User.findOne({ email });

      if (isExisting) {
        throw new Error("Email already exists");
      } 

      password = await bcrypt.hash(password, 8);
      const res = await User.create({
        name,
        email,
        password,
        role,
      });

      return res;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  async getByEmail(email) {
    try {
      const res = await User.findOne({ email: email });
      if (!res) throw new Error("The data not found");

      return res;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  async get(param) {
    try {
      const res = await User.findById(param);
      if (!res) throw new Error("The data not found");

      return res;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  async getProfile(token) {
    try {
      const id = JWTProvider.verify(token);
      const res = await this.get(id);

      return res;
    } catch (err) {
      throw new Error(err.message); 
    }
  },
  async gets() {
    try {
      const res = await User.findAll();

      return res;
    } catch (err) {
      throw new Error(err.message);
    }
  },
};

module.exports = { UserService };
