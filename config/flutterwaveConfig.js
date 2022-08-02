const Flutterwave = require("flutterwave-node-v3");

const flw = new Flutterwave(
  process.env.FLUTTERWAVE_PUBLIC_KEY,
  process.env.FLUTTERWAVE_SECRET_KEY
);

const payload = {
    card_number,
    cvv,
    expiry_month,
    expiry_year,
    currency: "NGN",
    amount,
    redirect_url: "https://www.google.com",
    fullname,
    email,
    phone_number,
    enckey: process.env.FLUTTERWAVE_ENCRYPTION_KEY,
  };

const chargeCard = async () => {
  try {
    const response = await flw.Charge.card(payload);
    console.log(response);
    if (response.meta.authorization.mode === "pin") {
      let payload2 = payload;
      payload2.authorization = {
        mode: "pin",
        fields: ["pin"],
        pin,
      };
      const reCallCharge = await flw.Charge.card(payload2);

      const callValidate = await flw.Charge.validate({
        otp,
        flw_ref: reCallCharge.data.flw_ref,
      });
      console.log(callValidate);
    }
    if (response.meta.authorization.mode === "redirect") {
      var url = response.meta.authorization.redirect;
      // open(url);
    }

    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

// chargeCard()
// module.exports = chargeCard;
