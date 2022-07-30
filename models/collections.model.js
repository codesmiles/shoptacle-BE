const {mongoose} = require("../config/mongooseConfig");
const { uuid } = require("uuidv4");

const clothesCollectionSchema = new mongoose.Schema({
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




