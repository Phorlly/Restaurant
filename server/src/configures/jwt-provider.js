const jwt = require("jsonwebtoken");
const { secretKey } = require("..");

const JWTProvider = {
  generate(payload) {
    return jwt.sign({ userId: payload }, secretKey, { expiresIn: "48h" });
  },
  verify(token) {
    return jwt.verify(token, secretKey).userId;
  },
};

module.exports = { JWTProvider };
