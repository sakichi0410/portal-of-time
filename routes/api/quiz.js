var express = require("express");
var router = express.Router();
const quiz = require("../../src/quiz.js");

router.get("/quiz/get/:quiz_id", async function (req, res, next) {
  const getQuiz = await quiz.getQuiz(req.params.quiz_id);
  res.json(getQuiz);
});

module.exports = router;