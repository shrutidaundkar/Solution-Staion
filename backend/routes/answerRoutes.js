const { Router } = require("express");
const router = Router();
const AnswersObject = require("../model/Answers");

router.post("/", async (req, res) => {
  try {
    let answerOb = new AnswersObject({
      question_id: req.body.question_id,
      answer: req.body.answer,
      status: "ANSWERED",
      user_id: req.body.user,
    });
    await answerOb
      .save()
      .then((data) => res.status(201).send({ status: true, result: data }))
      .catch((err) =>
        res.status(400).send({ status: false, message: err.message })
      );
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
