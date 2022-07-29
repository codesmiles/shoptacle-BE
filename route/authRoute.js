const express = require("express");
const router = express.Router();
const userSignIncontroller = require("../controller/userSigninController");
const userSignUpController = require("../controller/userSignupController");
const {hashPasswordMiddleware} = require("../middleware/hashing"); //hash password as a middleware
const checkUser = require("../middleware/isLoggedIn"); //check if user is logged in


router.post("/sign-up", userSignUpController.signUp);
router.post("/sign-in", userSignIncontroller.login);

module.exports = router;