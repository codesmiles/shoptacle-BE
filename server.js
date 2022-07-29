// jshint esversion: 6
require("dotenv").config();
const express = require('express');
const authRoute = require("./route/authRoute");
const mongoose = require("mongoose"); 
const url = `mongodb://localhost:27017/shoptacleDB`;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', authRoute);



// connect to mongoose
mongoose.connect(url, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`Connected to MongoDB`);
  }
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
