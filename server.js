// jshint esversion: 6
require("dotenv").config();
const express = require('express');
const authRoute = require("./route/authRoute");
const mongoose = require("mongoose"); //import mongoose

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', authRoute);


const url = `mongodb://localhost:27017/shoptacleDB`;

// connect to mongoose
mongoose.connect(url, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`Connected to MongoDB`);
  }
});






app.listen(3000, () => {
    console.log(`Server is running on port ${3000}`);
})
