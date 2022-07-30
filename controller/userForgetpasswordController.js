const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const validator = require("validator");
const { createTransporter } = require("../helper/emailConfig");
const Token = require("../models/token.model");
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

//  to get the directory name
// console.log(`dirname: ${__dirname} and filename: ${__filename}`);

module.exports.forgetPassword = async (req, res) => {
  const { email } = await req.body;
  if (validator.isEmail(email)) {
    // check if email exist in db
    const user = await User.findOne({ email });
    if (user) {
      const checkTokenEmail = await Token.findOne({ email }).exec();

      // generate token and send email
      const token = uuidv4().split("-").join("");
      // hash token
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(token, salt);

      if (checkTokenEmail) {
        // update token
        await Token.updateOne({ email }, { token: hash });

        sendEmail({
          subject: `verification link for password reset`,
          text: `Your verification link is http://localhost:3000/${email}/${process.env.LINK}/${token}`,
          to: process.env.FOREIGN_EMAIL, //change to email
          from: process.env.EMAIL,
        });

        return res.json({
          successful: true,
          message: `successfully sent an email to ${email}`,
        });
      } else {
        await new Token({ email, token:hash }).save();
        sendEmail({
          subject: `verification link for password reset`,
          text: `Your verification link is http://localhost:3000/${email}/${process.env.LINK}/${token}`,
          to: process.env.FOREIGN_EMAIL, //change later
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
