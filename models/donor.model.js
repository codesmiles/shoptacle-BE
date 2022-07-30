const {mongoose} = require("../config/mongooseConfig");
const { v4: uuidv4 } = require('uuid');

const donorSchema = new mongoose.Schema({
    _id: { type: String, required: true, default: uuidv4().split("-").join("") },
    userId: { type: String, required: true },
    full_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    reference: {
        type: String,
        required: true
    }
    });
    const Donor = mongoose.model('Donor', donorSchema);
    module.exports = {Donor}