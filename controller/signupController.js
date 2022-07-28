const { v4: uuidv4 } = require('uuid');
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/signup.model");



exports.signup = (req, res) => {
    console.log("it works");
}