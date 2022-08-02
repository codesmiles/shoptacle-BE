const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/user.model");
const validator = require("validator");

const errorDey = (err) => {
  if (err) {
    console.log(`error: ${err}`);
  }
};

module.exports.signUp = async (req, res) => {
  try {
    // await req.body
    let { fullName, email, password, stateOfResidence, gender, signForNewsLetter } =
      await req.body;

    if (validator.isEmail(email) && validator.isStrongPassword(password)) {
      //   // To check if it already exist in the database
      const emailExist = await User.findOne({ email });
      if (emailExist) {
        res.json({
          message: `Email already exist`,
          statusCode: 400,
        });
      } else {
        //------------------USING BCRYPT----------------------
        // generate salt to hashpassword
        const salt = await bcrypt.genSalt(10);
        // set password to a hashed password
        password = await bcrypt.hash(password, salt);

        //----------------------------------------------------

        const newUser = new User({
          fullName,
          email,
          password,
          gender,
          stateOfResidence,
          signForNewsLetter,
        });

        newUser.save((err, data) => {
          errorDey(err);
          res.json({
            successful: true,
            data,
          });
        });
      }
    } else {
      if (!validator.isEmail(email)) {
        res.json({
          successful: false,
          message: `Email is not valid`,
        });
      }
      if (!validator.isStrongPassword(password)) {
        res.json({
          successful: false,
          message: `Password requires at least 8 characters, one number and one special character`,
        });
      }
    }
  } catch (err) {
    errorDey(err);
  }
};