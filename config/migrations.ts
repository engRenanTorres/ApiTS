const mysql = require('mysql');
require("dotenv").config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});


const con = mysql.createConnection({
  host: process.env.DB_HOST ||'http://localhost',
  user: process.env.DB_USER ||'',
  password: process.env.DB_PASS ||'',
  database: process.env.DB_SCHEMA
});

con.connect(function(err:Error) {
  if (err) throw err;
  console.log("Connected! to DB");
  var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
  con.query(sql, function (err:Error, result: object) {
    if (err) throw err;
    console.log("Table created");
  });
});