const { Router } = require("express");
const router = Router();
const UserObject = require("../model/Users");

router.get("/:uid", async (req, res) => {
  try {
    const existingUser = await UserObject.findOne({ uid: req.params.uid });
    if (existingUser) {
      res.status(200).send({
        status: true,
        user: existingUser,
      });
    } else {
      res.status(400).send({
        status: false,
        user: "User not Found!",
      });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.get("/id/:id", async (req, res) => {
  try {
    const existingUser = await UserObject.findOne({ _id: req.params.id });
    if (existingUser) {
      res.status(200).send({
        status: true,
        user: existingUser,
      });
    } else {
      res.status(400).send({
        status: false,
        user: "User not Found!",
      });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.post("/", async (req, res) => {
  try {
    const existingUser = await UserObject.findOne({ uid: req.body.uid });
    if (existingUser) {
      // User with the given uid already exists
      res.status(200).send({ status: true, result: existingUser });
    } else {
      let user = new UserObject({
        uid: req.body.uid,
        name: req.body.name,
        email: req.body.email,
      });
      await user
        .save()
        .then((data) => res.status(201).send({ status: true, result: data }))
        .catch((err) =>
          res.status(400).send({ status: false, message: err.message })
        );
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});
module.exports = router;
