const mongoose = require("mongoose");

const QuestionCommentsSchema = new mongoose.Schema({
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Questions",
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

module.exports = mongoose.model("QuestionComments", QuestionCommentsSchema);
