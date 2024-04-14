const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");
dotenv.config();

const db = process.env.MONGODB_CONNECTION_STRING;

mongoose
  .connect(db)
  .then(() => {
    console.log("Connected to MONGODB");
  })
  .catch((error) => console.log(error));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is Running On Port : ${port}`);
});
