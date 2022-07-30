const express = require("express");
const router = express.Router();
const userSignIncontroller = require("../controller/userSigninController");
const userSignUpController = require("../controller/userSignupController");
const userForgotPasswordController = require("../controller/userForgetPasswordController");
const userResetPasswordController = require("../controller/userResetPasswordController");
const {hashPasswordMiddleware} = require("../middleware/hashing"); //hash password as a middleware
const checkUser = require("../middleware/isLoggedIn"); //check if user is logged in


router.post("/sign-up", userSignUpController.signUp);//sign up a new user
router.post("/sign-in", userSignIncontroller.login);//login a user
router.post("/forget-password", userForgotPasswordController.forgetPassword);//forgot password
router.post("/:email/reset-password/:token", userResetPasswordController.resetPassword);//reset password
module.exports = router;