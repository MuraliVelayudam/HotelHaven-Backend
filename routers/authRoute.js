const express = require("express");
const { check } = require("express-validator");
const {
  userLogin,
  userVerifyToken,
  userSignOut,
} = require("../controllers/userController");
const verifyToken = require("../middlewares/authVerifyToken");

const authRouter = express.Router();

authRouter.post(
  "/login",
  [
    check("email", "Email is Required").isEmail(),
    check("password", "Password must be at least 6 characters long").isLength({
      min: 6,
    }),
  ],

  userLogin
);

authRouter.get("/verifyToken", verifyToken, userVerifyToken);

authRouter.post("/signOut", userSignOut);

module.exports = authRouter;
