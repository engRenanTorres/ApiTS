import MySQLResult from "../api/interfaces/result";

const mysql = require('mysql');
require("dotenv").config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});


const migrations = mysql.createConnection({
  host: process.env.DB_HOST ||'http://localhost',
  user: process.env.DB_USER ||'',
  password: process.env.DB_PASS ||'',
  database: process.env.DB_SCHEMA
});

migrations.connect(function(err:Error) {
  if (err) throw err;
  console.log("Connected! to DB");
  let sql = "CREATE TABLE IF NOT EXISTS `"+ process.env.DB_SCHEMA +"`.`users` ("
    +"`id` int NOT NULL AUTO_INCREMENT,"
    +"`first_name` varchar(200) CHARACTER SET latin1 COLLATE latin1_general_ci DEFAULT NULL,"
    +"`family_names` varchar(200) CHARACTER SET latin1 COLLATE latin1_general_ci DEFAULT NULL,"
    +"`login` varchar(12) CHARACTER SET latin1 COLLATE latin1_general_ci DEFAULT NULL,"
    +"`email` varchar(45) DEFAULT NULL,"
    +"`password` varchar(200) CHARACTER SET latin1 COLLATE latin1_general_ci DEFAULT NULL,"
    +"`hierarchy` int DEFAULT NULL,"
    +"PRIMARY KEY (`id`),"
    +"UNIQUE KEY `id_UNIQUE` (`id`),"
    +"UNIQUE KEY `login_UNIQUE` (`login`),"
    +"UNIQUE KEY `email_UNIQUE` (`email`)"
  +") ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci";
  migrations.query(sql, function (err:Error, result: MySQLResult) {
    if (err) throw err;
    !result.warningCount && console.log("Users table created");
  });
  sql = "CREATE TABLE IF NOT EXISTS `"+ process.env.DB_SCHEMA +"`.`logs` ("
    +"`id` BIGINT NOT NULL AUTO_INCREMENT,"
    +"`ip` VARCHAR(60) NULL,"
    +"`login` varchar(12) CHARACTER SET latin1 COLLATE latin1_general_ci DEFAULT NULL,"
    +"`date` VARCHAR(12) NULL,"
    +"`time` VARCHAR(5) NULL,"
    +"`endpoint` VARCHAR(45) NULL,"
    +"`hierarchy` INT NULL,"
    +"`host` VARCHAR(45) NULL,"
    +"PRIMARY KEY (`id`),"
    +"INDEX `fk_login_idx` (`login` ASC) VISIBLE,"
    +"CONSTRAINT `fk_login`"
    +"  FOREIGN KEY (`login`)"
    +"  REFERENCES `"+ process.env.DB_SCHEMA +"`.`users` (`login`)"
    +"  ON DELETE NO ACTION"
    +"  ON UPDATE NO ACTION)";
  migrations.query(sql, function (err:Error, result: MySQLResult) {
    if (err) throw err;
    !result.warningCount && console.log("Logs table created");
  });
});

export default migrations;