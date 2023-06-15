const { Router } = require("express");
const router = Router();
const QuestionCommentObject = require("../model/QuestionComments");

router.post("/:id", async (req, res) => {
  try {
    await QuestionCommentObject.create({
      question_id: req.params.id,
      comment: req.body.comment,
      user_id: req.body.user,
    })
      .then((comment) => {
        res.status(201).send({
          status: true,
          data: comment,
        });
      })
      .catch((err) => {
        res.status(400).send({
          status: false,
          message: err.message,
        });
      });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: err.message,
    });
  }
});
module.exports = router;
