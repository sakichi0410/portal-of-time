require("dotenv").config();
const env = process.env.environment;

var createError = require("http-errors");
var express = require("express");
var session = require('express-session');
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var baseRouter = require('./routes/base.js');
var apiRouter = require("./routes/api/index.js");
var mainMenu = require("./routes/base/mainMenu.js");

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
app.use("/api", apiRouter);
app.use("/mainMenu", mainMenu);
// app.use('/gameMenu',gameMenu);
// app.use('/gamePlay',gamePlay);
// app.use('/modeDisp',modeDisp);
// app.use('/resultDisp',modeDisp);
// app.use('/resultScore',modeScore);`
// app.use('/',mainMenu);
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
  res.render("error");
});

module.exports = app;
