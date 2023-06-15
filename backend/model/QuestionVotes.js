const mongoose = require("mongoose");

const QuestionVotesSchema = new mongoose.Schema({
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Questions",
  },
  //user: String,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
});

module.exports = mongoose.model("QuestionVotes", QuestionVotesSchema);
