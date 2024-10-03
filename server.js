const express = require("express");
const mongoose = require("mongoose");
const app = express();
require('dotenv').config()
app.use(express.json());

// Import Routes
const authRoute = require("./routes/index");


// Route Middlewares
app.use("/api", authRoute);
const port = process.env.port;
mongoose
  .connect(
    "mongodb+srv://talal:talal123@cluster0.nraxkxv.mongodb.net/mydatabase?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected To MongoDB"),
      app.listen(port, () => {
        console.log("Server running on localhost:" + port);
      });
  })
  .catch((err) => console.log(`Err : ${err} `));
