const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/AuthTable", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to DataBase.");
  })
  .catch((e) => {
    console.log("Connection Failed");
  });
