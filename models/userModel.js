const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: String,
  Jdr: {
    Role: String,
    cards: Array
  },
  memo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: UserModel
    }
  ],
  Date: Date.now()
})

module.exports = mongoose.model('User', userSchema);