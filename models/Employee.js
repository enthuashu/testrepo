const mongoose = require("mongoose");

const userscehma = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  pin: {
    type: String,
  },
  age: {
    type: Number,
  },
});

const usermodel = mongoose.model("user", userscehma);

module.exports = usermodel;
