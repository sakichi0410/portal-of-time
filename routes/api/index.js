var express = require("express");
var router = express.Router();
const quiz = require("../../src/quiz.js");
const user = require("../../src/user.js");

router.get("/quiz/get/:quiz_id", async function (req, res, next) {
  const getQuiz = await quiz.getQuiz(req.params.quiz_id);
  res.json(getQuiz);
});

router.post("/user/signup/check", async function (req, res, next) {
  const checkUser = await user.checkUser(req.body);
  res.json({ result: checkUser });
});

router.post("/user/signup/create", async function (req, res, next) {
  const createUser = await user.createUser(req.body);
  res.json({ user_id: createUser });
});

router.post("/user/signin", async function (req, res, next) {
  const signUser = await user.signUser(req.body);
  res.json({ user_id: signUser });
});

router.get("/user/:user_id", async function (req, res, next) {
  const getUser = await user.getUser(req.params.user_id);
  res.send(getUser);
});

module.exports = router;
