const mongoose = require("mongoose");

const memoModel = new mongoose.Schema({
  title: String,
  content: String,
  Date: Date.now()
})

module.exports = mongoose.model('Memo', memoModel);