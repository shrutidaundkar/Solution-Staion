const { Router } = require("express");
const router = Router();
const QuestionsObject = require("../model/Questions");
const mongoose = require("mongoose");
router.get("/", async (req, res) => {
  try {
    QuestionsObject.aggregate([
      {
        $lookup: {
          from: "questioncomments",
          let: { question_id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$question_id", "$$question_id"],
                },
              },
            },
            {
              $project: {
                _id: 1,
                user_id: 1,
                comment: 1,
                created_at: 1,
              },
            },
          ],
          as: "questioncomments",
        },
      },
      {
        $lookup: {
          from: "answers",
          let: { question_id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$question_id", "$$question_id"],
                },
              },
            },
            {
              $lookup: {
                from: "answercomments",
                let: { answer_id: "$_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ["$answer_id", "$$answer_id"],
                      },
                    },
                  },
                  {
                    $project: {
                      _id: 1,
                      user_id: 1,
                      comment: 1,
                      created_at: 1,
                    },
                  },
                ],
                as: "answercomments",
              },
            },
            {
              $project: {
                _id: 1,
                user_id: 1,
                answer: 1,
                created_at: 1,
                question_id: 1,
                created_at: 1,
                answercomments: 1,
              },
            },
          ],
          as: "answerDetails",
        },
      },

      {
        $project: {
          _id: 1,
          title: 1,
          question: 1,
          tags: 1,
          user_id: 1,
          status: 1,
          question_type: 1,
          created_at: 1,
          answerDetails: 1,
          questioncomments: 1,
        },
      },
    ])
      .exec()
      .then((questionDetails) => {
        res.status(200).send(questionDetails);
      })
      .catch((e) => {
        console.log("Error: ", e);
        res.status(400).send(e);
      });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    QuestionsObject.init();
    let question = new QuestionsObject({
      title: req.body.title,
      question: req.body.question,
      tags: req.body.tags,
      user_id: req.body.user,
      status: "OPEN",
      question_type: req.body.type,
    });
    await question
      .save()
      .then((data) => res.status(201).send({ status: true, result: data }))
      .catch((err) =>
        res.status(400).send({ status: false, message: err.message })
      );
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    QuestionsObject.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(req.params.id) },
      },
      {
        $lookup: {
          from: "answers",
          let: { question_id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$question_id", "$$question_id"],
                },
              },
            },
            {
              $lookup: {
                from: "answercomments",
                let: { answer_id: "$_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ["$answer_id", "$$answer_id"],
                      },
                    },
                  },
                  {
                    $project: {
                      _id: 1,
                      user_id: 1,
                      comment: 1,
                      created_at: 1,
                    },
                  },
                ],
                as: "answercomments",
              },
            },
            {
              $project: {
                _id: 1,
                user_id: 1,
                answer: 1,
                created_at: 1,
                question_id: 1,
                created_at: 1,
                answercomments: 1,
              },
            },
          ],
          as: "answerDetails",
        },
      },
      {
        $lookup: {
          from: "questioncomments",
          let: { question_id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$question_id", "$$question_id"],
                },
              },
            },
            {
              $project: {
                _id: 1,
                question_id: 1,
                user: 1,
                comment: 1,
                // created_at: 1,
                // question_id: 1,
                created_at: 1,
              },
            },
          ],
          as: "questioncomments",
        },
      },
      // {
      //   $unwind: {
      //     path: "$answerDetails",
      //     preserveNullAndEmptyArrays: true,
      //   },
      // },
      {
        $project: {
          _id: 1,
          title: 1,
          question: 1,
          tags: 1,
          user_id: 1,
          status: 1,
          question_type: 1,
          created_at: 1,
          answerDetails: 1,
          questioncomments: 1,
        },
      },
    ])
      .exec()
      .then((questionDetails) => {
        res.status(200).send(questionDetails);
      })
      .catch((e) => {
        console.log("Error: ", e);
        res.status(400).send(error);
      });
  } catch (error) {
    res.status(500).send(error.message);
  }
});
module.exports = router;
