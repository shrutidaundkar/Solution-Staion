const mongoose = require("mongoose");

const AnswerCommentsSchema = new mongoose.Schema({
  answer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Answers",
  },
  comment: String,
  created_at: {
    type: Date,
    default: Date.now(),
  },
  //user: String,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
});

module.exports = mongoose.model("AnswerComments", AnswerCommentsSchema);
