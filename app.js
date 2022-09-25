require("dotenv").config();
const env = process.env.environment;

var createError = require("http-errors");
var express = require("express");
var session = require('express-session');
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var baseRouter = require('./routes/base.js');
var usersRouter = require("./routes/api/users.js");
var quizRouter = require("./routes/api/quiz.js");
var signin = require("./routes/sign/signin.js");
var signup = require("./routes/sign/signup.js");
var signout = require("./routes/sign/signout.js");
var mainMenu = require("./routes/base/mainMenu.js");
var gameMenu = require("./routes/base/gameMenu.js");
var s_modeDisp = require("./routes/singleplay/modeDisp.js");
var s_gamePlay = require("./routes/singleplay/gamePlay.js");
var s_resultScore = require("./routes/singleplay/resultScore.js");
var s_resultDetail = require("./routes/singleplay/resultDetail.js");
var m_modeDisp = require("./routes/multiplay/modeDisp.js");
var m_gamePlay = require("./routes/multiplay/gamePlay.js");
var m_createRoom = require("./routes/multiplay/createRoom.js");
var m_resultScore = require("./routes/multiplay/resultScore.js");
var m_resultDetail = require("./routes/multiplay/resultDetail.js");

var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.set('view engine', 'ejs');

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  // cookie:{
  // httpOnly: true,
  // secure: false,
  // maxage: 1000 * 60 * 30
  // }
}));

app.use("/", baseRouter);
app.use("/api/users", usersRouter);
app.use("/api/quiz", quizRouter);
app.use("/signin", signin);
app.use("/signup", signup);
app.use("/signout", signout);
app.use("/mainMenu", mainMenu);
app.use("/gameMenu", gameMenu);
app.use('/single/modeDisp', s_modeDisp);
app.use('/single/gamePlay', s_gamePlay);
app.use('/single/resultScore', s_resultScore);
app.use('/single/resultDetail', s_resultDetail);
app.use('/multi/modeDisp', m_modeDisp);
app.use('/multi/gamePlay', m_gamePlay);
app.use('/multi/createRoomPlay', m_createRoom);
app.use('/multi/resultScore', m_resultScore);
app.use('/multi/resultDetail', m_resultDetail);
// app.use('/login',login);
// app.use(function(req, res, next){
//   console.log(req.session.username);
//   if(req.session.username){
//     next();
//   }else{
//     res.redirect('login');
//   }
// });

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error.jade");
});

module.exports = app;
