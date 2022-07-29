const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

// signup
router.post("/sign-up", userController.signUp);
router.post("/sign-in", userController.login);


module.exports = router;