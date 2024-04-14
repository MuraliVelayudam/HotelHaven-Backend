const express = require("express");
const { userRegistration } = require("../controllers/userController");
const { check } = require("express-validator");
const userRouter = express.Router();

userRouter.post(
  "/register",
  [
    check("firstName", "FirstName is Required").isString(),
    check("lastName", "LastName is Required").isString(),
    check("email", "Email is Requited").isEmail(),
    check("password", "Password must be at least 6 characters long").isLength({
      min: 6,
    }),
  ],
  userRegistration
);

module.exports = userRouter;
