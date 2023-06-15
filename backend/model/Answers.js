const mongoose = require("mongoose");

const AnswersSchema = new mongoose.Schema({
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Questions",
  },
  answer: String,
  created_at: {
    type: Date,
    default: Date.now(),
  },
  //user: String,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  status: String,
  comment_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comments",
  },
});

module.exports = mongoose.model("Answers", AnswersSchema);
