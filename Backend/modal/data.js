const mongoose = require("mongoose");

const Structure = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  Description: {
    type: String,
    
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  sold: {
    type: Boolean,
    required: true
  }
});

const modal = mongoose.model("data", Structure);

module.exports = modal;