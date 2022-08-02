// jshint esversion: 6
require("dotenv").config();
const express = require("express");
const userRoute = require("./route/userRoute");
const paymentRoute = require("./route/paymentRoute");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/pay",paymentRoute);
// STRIPE
// var stripe = require('stripe')('Your_Secret_Key');



const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
