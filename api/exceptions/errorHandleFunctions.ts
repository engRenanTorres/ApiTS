import { MysqlError } from "mysql";
import { Request, Response } from 'express';



export default {

  
  wrongLogin: ( res: Response ) => {
    return res.status(400).json({
      success: 0,
      message: "Invalid email or password or Params not found"
    });
  },
  
  
  userNotFound404: ( res: Response ) => {
    return res.status(404).json({
      success: 0,
      message: "User not found!"
    });
  },
  
  missingParams412: ( error: Error, res: Response ) => {
    return res.status(412).json({
      success: 0,
      message: "Missing params.",
      serverMessage: error.message
    })
  },
  dataBaseError500: ( error: MysqlError, res: Response ) => {
    return res.status(500).json({
      success: 0,
      message: "Database conection error",
      errno: error.errno,
      sqlMessage: error.sqlMessage,
    });
  },
  serverUnknownError500: ( res: Response ) => {
    return res.status(500).json({
      success: 0,
      message: "Server Error."
    })
  }
  
} 

 
