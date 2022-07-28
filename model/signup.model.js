const mongoose = require("mongoose");
const {Schema } = mongoose;
const { v4: uuidv4 } = require('uuid');


// validate email
const validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};



const userSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
      default: uuidv4().split("-").join(""),
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      type: String,
      validate: [validateEmail, "Please fill a valid email address"],
      match: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
      trim: true,
    },
    stateOfResidence: {
      type: String,
      required: true,
      trim: true,
      default: "Lagos",
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      maxlength: 50,
    },
    signForNewsLetter: {
      type: Boolean,
      required: true,
      default: false,
    },
    isLoggedIn: {
      type: Boolean,
      require: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const SignUp = mongoose.model("SignUp", userSchema);
module.exports = SignUp;
