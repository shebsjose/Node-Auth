const express = require("express");
const app = express();

//Connected to DB.
require("./database/connection");

// Import Routes.
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post")

//Middleware.
app.use(express.json());

//Routes Middleware.
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);

app.listen(5000, () => {
  console.log("Listening port on 5000");
});
