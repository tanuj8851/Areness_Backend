const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};
