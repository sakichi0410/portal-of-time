const mysql = require("mysql2/promise");
const config = require("../config.js");

checkUser = async function (data) {
  let connection = null;
  try {
    connection = await mysql.createConnection(config.dbSetting);
    const sql = "SELECT * FROM t_users WHERE email = ?;";
    const [rows, fields] = await connection.query(sql, data.email);
    var result = 0;
    if (rows.length != 0) {
      result = 1;
    }
    return result;
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
};

createUser = async function (data) {
  let connection = null;
  try {
    connection = await mysql.createConnection(config.dbSetting);
    const sql =
      "INSERT INTO t_users (name,email,password) VALUES(?,?,?);";
    var param = [data.name, data.email, data.password];
    const [rows, fields] = await connection.query(sql, param);
    return rows.insertId;
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
};

getUser = async function (user_id) {
  let connection = null;
  try {
    //console.log("user.js getUser 1");
    connection = await mysql.createConnection(config.dbSetting);
    const sql = "SELECT * FROM t_users WHERE id = ?;";
    var param = [user_id];
    const [rows, fields] = await connection.query(sql, param);
    //console.log(rows);
    //console.log("user.js getUser 2");
    return rows;
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
};

signUser = async function (data) {
  let connection = null;
  try {
    console.log("test");
    connection = await mysql.createConnection(config.dbSetting);
    const sql = "SELECT * FROM t_users WHERE email = ?;";
    var param = [data.email];
    const [rows, fields] = await connection.query(sql, param);
    var user_id = 0;
    if (rows[0].password == data.password) {
      user_id = rows[0].id;
    }
    //console.log(rows);
    return user_id;
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
};

exports.checkUser = checkUser;
exports.createUser = createUser;
exports.getUser = getUser;
exports.signUser = signUser;