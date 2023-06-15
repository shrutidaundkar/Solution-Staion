const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  uid: {
    type: String,
    unique: true,
    required: true,
  },
  name: String,
  email: String,
  points: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Users", UserSchema);
