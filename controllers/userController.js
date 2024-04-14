const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

// Register User

const userRegistration = async (req, res) => {
  const errors = validationResult(req);

  const { firstName, lastName, email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: "User Already Registered" });
    }

    user = new User({
      firstName,
      lastName,
      email,
      password,
    });

    await user.save();

    const token = jwt.sign({ userId: user.id }, process.env.SECRETE_KEY, {
      expiresIn: "1d",
    });

    res.cookie("auth_Token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "Production",
      maxAge: 86400000,
    });

    res.status(201).json({ message: "User Successfully Created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Error" });
  }
};

// User Login

const userLogin = async (req, res) => {
  const errors = validationResult(req);

  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.SECRETE_KEY, {
      expiresIn: "1d",
    });

    res.cookie("auth_Token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "Production",
      maxAge: 86400000,
    });

    res.status(200).json({ message: "User Successfully Logged In" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Error" });
  }
};

// Get Verify Token

const verifyUserToken = (req, res) => {
  res.status(200).json({ userId: req.userId });
};

// Sign Out

const userSignOut = (req, res) => {
  res.cookie("auth_Token", "", {
    expires: new Date(0),
  });

  res.status(200).json({ message: "Signed Out Successfully" });
};

module.exports = {
  userRegistration,
  userLogin,
  verifyUserToken,
  userSignOut,
};
