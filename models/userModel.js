const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user_id: String,
  Jdr: {
    Role: String,
    cards: Array
  },
  Date: Date
}, { collection: "User" })

module.exports = mongoose.model('User', userSchema);