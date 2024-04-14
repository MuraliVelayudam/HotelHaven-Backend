const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const verifyToken = async (req, res, next) => {
  const token = req.cookies["auth_Token"];

  if (!token) {
    return res.status(400).json({ error: "UnAuthorized" });
  }
  try {
    const decodeToken = jwt.verify(token, process.env.SECRETE_KEY);
    req.userId = decodeToken.userId;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "UnAuthorized" });
  }
};

module.exports = verifyToken;
