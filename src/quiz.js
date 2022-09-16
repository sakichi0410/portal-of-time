const mysql = require("mysql2/promise");
const config = require("../config.js");

getQuiz = async function (quiz_id) {
  console.log("quiz.js getQuiz 1");
  let connection = null;
  try {
    connection = await mysql.createConnection(config.dbSetting);
    var sql =
      "SELECT * FROM t_quiz where id = ?;";
    let param = [quiz_id];
    const [rows, fields] = await connection.query(sql, param);
    console.log("quiz.js getQuiz 2");
    return rows;
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
};

exports.getQuiz = getQuiz;