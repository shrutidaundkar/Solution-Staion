const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  title: String,
  question: String,
  tags: [],
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
  question_type: String,
  comment_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "QuestionComments",
  },
});

module.exports = mongoose.model("Questions", QuestionSchema);
