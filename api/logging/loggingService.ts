import pool from "../../config/database";
import type MySQLResult from "../interfaces/result";
import type { MysqlError } from "mysql";
import type Logs from "../interfaces/logs";

export const TABLE = "Logs";

export const register = (data: Logs) =>{
  pool.query(
    `INSERT INTO ${TABLE} (ip, login, date, time, endpoint, hierarchy, host) 
      VALUES(?,?,?,?,?,?,?)`,
    [
      data.ip,
      data.login? data.login : null,
      data.date,
      data.time,
      data.endpoint,
      data.hierarchy,
      data.host
    ],
    (error, results, fields) => {
      if(error) {
        console.log(error?.message);
      }
    }
  )
}