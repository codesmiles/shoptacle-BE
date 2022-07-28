const express = require("express");
const router = express.Router();
const signupController = require("../controller/signupController");

// signup
router.post("/sign-up", signupController.signup);


module.exports = router;