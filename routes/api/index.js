var express = require("express");
var router = express.Router();
const quiz = require("../../src/quiz.js");

router.get("/quiz/get/:quiz_id", async function (req, res, next) {
  console.log("index.js router.get /quiz/:quiz_id 1");
  const getQuiz = await quiz.getQuiz(req.params.quiz_id);
  console.log("index.js router.get /quiz/:quiz_id 2");
  res.json(getQuiz);
});

module.exports = router;
