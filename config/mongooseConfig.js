const mongoose = require("mongoose");
const url = `mongodb://localhost:27017/shoptacleDB`;
// connect to mongoose
mongoose.connect(url, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`Connected to MongoDB`);
  }
});

module.exports = { mongoose };
