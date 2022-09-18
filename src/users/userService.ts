import pool from "../../config/database";
import type User from "../interfaces/user";
import type MySQLResult from "../interfaces/result";
import type { MysqlError } from "mysql";

export const TABLE = "Users";

export const create = (data: User, callBack:(error: MysqlError | null, results: MySQLResult | null) => void) =>{
  pool.query(
    `INSERT INTO ${TABLE}(first_name, family_names, login, email, password, hierarchy) 
      VALUES(?,?,?,?,?,?)`,
    [
      data.firstName,
      data.familyName,
      data.login,
      data.email,
      data.password,
      data.hierarchy
    ],
    (error, results, fields) => {
      if(error) {
        return callBack(error,null);
      }
      return callBack(null, results);
    }
  )
}
export const getUsers = (callBack:(error: MysqlError | null, results: MySQLResult | null) => void) => {
  pool.query(
    `SELECT id, first_name, family_names, login, email, hierarchy FROM ${TABLE}`,
    [],
    (error, results, fields) => {
      if(error){
        return callBack(error,null);
      }
      return callBack(null, results);
    }
  )
}
export const getUserById = (id: number, callBack:(error: MysqlError | null, results: MySQLResult | null) => void) => {
  pool.query(
    `SELECT id, first_name, family_names, login, email, hierarchy FROM ${TABLE} WHERE id = ?`,
    [id],
    (error, results, fields) => {
      if(error){
        return callBack(error,null);
      }
      return callBack(null, results[0]);
    }
  )
}
export const getUserByEmail = (email: string, callBack:(error: MysqlError | null, results?: User | null) => void) => {
  pool.query(
    `SELECT * FROM ${TABLE} WHERE email = ?`,
    [email],
    (error, results, fields) => {
      if(error){
        return callBack(error);
      }
      return callBack(null, results[0]);
    }
  )
}

export const updateUser = (data: User, callBack:(error: MysqlError | null, results: MySQLResult | null) => void) => {
  pool.query(
    `UPDATE ${TABLE} SET first_name = ?, family_names = ?, login = ?, email = ?, hierarchy = ?, password = ? WHERE id = ?`,
    [
      data.firstName,
      data.familyName,
      data.login,
      data.email,
      data.hierarchy,
      data.password,
      data.id
    ],
    (error, results, fields) => {
      if(error){
        return callBack(error,null);
      }
      return callBack(null, results);
    }
  )
}
export const deleteUser = (data: User, callBack:(error: MysqlError | null, results: MySQLResult | null) => void) => {
  pool.query(
    `DELETE FROM ${TABLE} WHERE id = ?`,
    [ data.id ],
    (error, results, fields) => {
      if(error){
        return callBack(error,null);
      }
      return callBack(null, results.affectedRows);
    }
  )
}
  
