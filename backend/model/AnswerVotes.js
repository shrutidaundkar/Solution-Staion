const mongoose = require("mongoose");

const AnswerVotesSchema = new mongoose.Schema({
  answer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Answers",
  },
  //user: String,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
});

module.exports = mongoose.model("AnswerVotes", AnswerVotesSchema);
