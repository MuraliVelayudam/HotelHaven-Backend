const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require("./routers/userRoute");
const authRouter = require("./routers/authRoute");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(cookieParser());

app.use("/api/user/", userRouter);
app.use("/api/auth/", authRouter);

module.exports = app;
