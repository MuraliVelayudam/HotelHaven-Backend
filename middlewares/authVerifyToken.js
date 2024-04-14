const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const secreteKey = process.env.SECRETE_KEY;

const verifyToken = async (req, res, next) => {
  const token = req.cookie["auth_Token"];
  try {
    if (!token) {
      return res.status(400).json({ error: "UnAuthorized" });
    }

    const decodeToken = jwt.verify(token);

    req.userId = decodeToken.userId;
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "UnAuthorized" });
  }
};

module.exports = verifyToken;
