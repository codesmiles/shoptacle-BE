const express = require("express");
const router = express.Router();
const userSignIncontroller = require("../controller/userSigninController");
const userSignUpController = require("../controller/userSignupController");


router.post("/sign-up", userSignUpController.signUp);
router.post("/sign-in",userSignIncontroller.login);

module.exports = router;