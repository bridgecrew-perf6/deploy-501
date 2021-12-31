const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

var connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }
  // Vytvoření tasks
  let createTask = "CREATE TABLE IF NOT EXISTS tasks(id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, content varchar(255) NOT NULL, completed BOOLEAN DEFAULT false)";
  connection.query(createTask, function(err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });
  // Vytvoření users
  let createUsers = "CREATE TABLE IF NOT EXISTS users(id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, email varchar(255) NOT NULL, password varchar(255) NOT NULL)";
  connection.query(createUsers, function(err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });
});

module.exports = connection;
