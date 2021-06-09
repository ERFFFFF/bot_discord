const mongoose = require("mongoose");

const memoModel = new mongoose.Schema({
  user_id: String,
  title: String,
  content: String,
  Date: Date.now()
})

module.exports = mongoose.model('Memo', memoModel);