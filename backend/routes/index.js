const { Router } = require("express");
const router = Router();
const questionRoutes = require("./questionRoutes");
const questionCommentRoutes = require("./questionComment");
const answerCommentRoutes = require("./answerComment");
const userRoutes = require("./userRoutes");
const answerRoutes = require("./answerRoutes");
router.get("/", async (req, res) => {
  try {
    res.send("Welcome!");
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.use("/question", questionRoutes);
router.use("/questionComment", questionCommentRoutes);
router.use("/answer", answerRoutes);
router.use("/answerComment", answerCommentRoutes);
router.use("/user", userRoutes);
module.exports = router;
