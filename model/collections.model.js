const { Schema } = require("mongoose");
const { uuid } = require("uuidv4");

const clothesCollectionSchema = new Schema({
  collectionCategory:{
    required: true,
    type:String,
    trim: true,

  },
  color: {
    type: String,
    required: true,
    trim: true,
    default: "red",

  },
  size: {
    type: String,
    required: true,
    trim: true,
    // enum: ["S", "M", "L","XL","XXL"],
    default: "Medium",
  },
    quantity: {
    type: Number,
    required: true,
    trim: true,
    default: 1,
    },
    sizeInMeasurement:{
        type:String,
        required:true,
        trim:true,
    },
    
})




