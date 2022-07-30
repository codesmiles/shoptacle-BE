const User = require("../models/user.model");
const Token = require("../models/token.model");
const validator = require("validator");
const bcrypt = require("bcrypt");

module.exports.resetPassword = async (req, res) => {
  let email = await req.params.email;
  let token = await req.params.token;
  let { password } = await req.body;

  // check token db
  const userTokenEmail = await Token.findOne({ email });
  if (userTokenEmail) {
    // check if token is active and render the token inactive after 1 hour
    const tokenExpireTime = userTokenEmail["createdAt"].getTime() / 1000 + 3600;
    const currTime = new Date().getTime() / 1000;

    if (tokenExpireTime >= currTime) {
      // decrypt the token by bcrypt compareSync compare with the token db
      const tokensMatch = bcrypt.compareSync(token, userTokenEmail.token);

      if (tokensMatch) {
        // check if email exist in db
        const user = await User.findOne({ email });
        if (user) {
          // hash password
          const salt = await bcrypt.genSalt(10);
          const hash = await bcrypt.hash(password, salt);
          // update password
          await User.updateOne({ email }, { password: hash });
          // delete token
          await Token.deleteOne({ email });
          res.json({
            successful: true,
            message: `successfully reset password`,
          });
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

};
