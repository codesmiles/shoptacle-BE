const User = require("../models/user.model");
const Token = require("../models/token.model");
const validator = require("validator");
const bcrypt = require("bcrypt");

const errorDey = (err) => {
  if (err) {
    console.log(`error: ${err}`);
  }
};
module.exports.resetPassword = async (req, res) => {
  try {
    let email = await req.params.email;
    let token = await req.params.token;
    let { password } = await req.body;

    // check token db
    const userTokenEmail = await Token.findOne({ email });
    if (userTokenEmail) {
      // check if token is active and render the token inactive after 1 hour
      const tokenExpireTime =
        userTokenEmail["createdAt"].getTime() / 1000 + 3600;
      const currTime = new Date().getTime() / 1000;

      if (tokenExpireTime >= currTime) {
        // decrypt the token by bcrypt compareSync compare with the token db
        const tokensMatch = bcrypt.compareSync(token, userTokenEmail.token);

        if (tokensMatch) {
          // check if email exist in db
          const user = await User.findOne({ email });
          if (user) {
            if (validator.isStrongPassword(password)) {
              // hash password
              const salt = await bcrypt.genSalt(10);
              const hash = await bcrypt.hash(password, salt);
              // update password
              await User.updateOne(
                { email },
                { password: hash, isLoggedIn: true }
              );
              // delete token
              await Token.deleteOne({ email });
              res.json({
                successful: true,
                message: `successfully reset password`,
              });
            } else {
              res.json({
                successful: false,
                message: `Password is not strong enough it should be at least 8 characters long and contain at least one number, one uppercase and one lowercase letter`,
              });
            }
          } else {
            res.json({
              successful: false,
              message: `invalid email or token`,
            });
          }
        } else {
          res.json({
            successful: false,
            message: `invalid email or token`,
          });
        }
      } else {
        await Token.deleteOne({ email });
        res.json({
          successful: false,
          message: `token is expired`,
        });
      }
    }
  } catch (err) {
    errorDey(err);
  }
};
