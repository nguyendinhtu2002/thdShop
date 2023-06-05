const jwt =require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
const refreshToken = (id) => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET);
};
module.exports = { generateToken, refreshToken };
