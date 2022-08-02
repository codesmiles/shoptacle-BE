const express = require("express");
const router = express.Router();
const userSignIncontroller = require("../controller/userControllers/userSigninController");
const userSignUpController = require("../controller/userControllers/userSignupController");
const userForgotPasswordController = require("../controller/userControllers/userForgetPasswordController");
const userResetPasswordController = require("../controller/userControllers/userResetPasswordController");
const checkUser = require("../middleware/isLoggedIn"); //check if user is logged in


// ROUTES
router.post("/sign-up", userSignUpController.signUp); //sign up a new user
router.post("/sign-in", userSignIncontroller.login); //login a user
router.post("/forget-password", userForgotPasswordController.forgetPassword); //forgot password
router.post(
  "/:email/reset-password/:token",
  userResetPasswordController.resetPassword
); //reset password


module.exports = router;
