// const flutterwave = require("flutterwave-node-v3");
// const {chargeCard} = require("../../config/flutterwaveConfig");


module.exports.flutterwavePay = async (req, res) => {
    let {
      card_number,
      cvv,
      expiry_month,
      expiry_year,
      amount,
      fullname,
      email,
      phone_number,
      pin,
      otp,
    } = await req.body;

    // chargeCard()
  
  }