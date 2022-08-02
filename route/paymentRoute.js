const express = require("express");
const router = express.Router();
const flutterwaveController = require("../controller/paymentControllers/flutterwaveController");
const paystackController = require("../controller/paymentControllers/paystackController");
// FLUTTERWAVE

router.post("/flutterwave",flutterwaveController.flutterwavePay);//not working yet
router.post("/paystack/transaction/initialize",paystackController.initialize)

module.exports = router;