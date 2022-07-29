const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4: uuidv4 } = require("uuid");

const tokenSchema = new Schema({
  _id: { type: String, required: true, default: uuidv4().split("-").join("") },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },

  token: {
    type: String,
    required: true,
  },  
},{timestamps:true});

const Token = mongoose.model("token", tokenSchema);
module.exports = Token;
