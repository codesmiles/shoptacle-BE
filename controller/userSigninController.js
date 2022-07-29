const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user.model");
const validator = require("validator");

const errorDey = (err) => {
  if (err) {
    console.log(`error: ${err}`);
  }
};

module.exports.login = async (req, res) => {
  let { email, password } = req.body;

  if (validator.isEmail(email)) {

    const emailMatch = await User.findOne({ email });
    
    if (emailMatch) {
      const passwordsMatch = bcrypt.compareSync(password, emailMatch.password);
    
      if (passwordsMatch) {
        // change isLoggedIn to true
        emailMatch.isLoggedIn = true;
        jwt.sign(
          {_id: emailMatch._id, isLoggedIn: emailMatch.isLoggedIn},
          process.env.JWT_SECRET,
          { expiresIn: "1h" },
          (err, token) => {
            errorDey(err);
            res.json({token});
          }
        );
      }else{
        res.json({
          successful: false,
          message: `invalid email or password`,
        });
      }
    }else{
      res.json({
        successful: false,
        message: `invalid email or password`,
      });
    }
  } else{
    res.json({
      successful: false,
      message: `Email is not valid`,
    });
  }
};
