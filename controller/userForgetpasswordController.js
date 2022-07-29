const bcrypt = require("bcrypt");
const User = require("../model/user.model");
const validator = require("validator");
const { createTransporter } = require("../helper/emailConfig");
const Token = require("../model/token.model");
const { v4: uuidv4 } = require("uuid");

// uuidv4().split("-").join("");
const errorDey = (err) => {
  if (err) {
    console.log(`error: ${err}`);
  }
};

// SEND EMAIL TO USER
const sendEmail = async (emailOptions) => {
  let emailTransporter = await createTransporter();
  await emailTransporter.sendMail(emailOptions);
};


module.exports.forgetPassword = async (req, res) => {
  const { email } = await req.body;
  if (validator.isEmail(email)) {
    // check if email exist in db
    const user = await User.findOne({ email });
    if (user) {
      // generate token
      const token = uuidv4().split("-").join("");
      const checkTokenEmail = await Token.findOne({ email }).exec();
      if (checkTokenEmail) {
        await Token.updateOne({ email }, { token });
        sendEmail({
          subject: `verification link for password reset`,
          text: `Your verification link is ${process.env.LINK}/${token}`,
          to: process.env.FOREIGN_EMAIL,
          from: process.env.EMAIL,
        });

        return res.json({
          successful: true,
          message: `successfully sent an email to ${email}`,
        });
      } else {
        const newToken = await new Token({ email, token }).save();

        sendEmail({
          subject: `verification link for password reset`,
          text: `Your verification link is ${process.env.LINK}/${token}`,
          to: process.env.FOREIGN_EMAIL,
          from: process.env.EMAIL,
        });

        return res.json({
          successful: true,
          message: `successfully sent an email to ${email}`,
        });
      }
    } else {
      res.json({
        successful: false,
        message: `Email has been sent`,
      });
    }
  } else {
    res.json({
      successful: false,
      message: `Email is not valid`,
    });
  }
};

module.exports.verifyAndChangePassword = async (req, res) => {};
