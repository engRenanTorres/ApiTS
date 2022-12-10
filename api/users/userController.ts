import { Request, Response } from 'express';
import { compareSync, genSaltSync, hashSync } from "bcryptjs";
import { sign } from 'jsonwebtoken';
import { 
  create, 
  getUserById as getUserByIdService, 
  getUsers as getUsersService, 
  updateUser as updateUserService, 
  deleteUser as deleteUserService,
  getUserByEmail as getUserByEmailService
} from "./userService";
import  errorHandler from '../exceptions/errorHandleFunctions';
import User, { UserBase } from '../interfaces/user';

require("dotenv").config();

const tokenPayload = process.env.TOKEN_KEY;
if (!tokenPayload) throw new Error('Token key is not set');

export const login = (req: Request,res: Response) => {
  const body = req.body;
  try {
    getUserByEmailService(body.login, (error, results)=>{
      if(error) return errorHandler.dataBaseError500(error,res);
      if(!results) return errorHandler.wrongLogin(res);
      const checkPassword = compareSync(body.password, results.password);
      if(checkPassword) {
        const jsonwebtoken:string = sign(
          { login: results.login, role: results.hierarchy },
          tokenPayload,
          {
            expiresIn: "1h"
          });
          return res.status(200).json({
            success: 1,
            message: "Login succefuly",
            token: jsonwebtoken
          })
      }
      else {
        return res.status(412).json({
          success: 0,
          message: "Invalid email or password or Params not found"
        })
      }
    })
  } catch(error){
    if(error instanceof Error){
      return res.status(412).json({
        success: 0,
        message: "Missing params.",
        serverMessage: error.message
      })
    }
    return res.status(500).json({
      success: 0,
      message: "Error."
    })
  }
}
export const createUser = (req: Request,res: Response) => {
  const body = req.body;
  const salt = genSaltSync(10);
  try{
    body.password = hashSync(body.password,salt);
    create(body,(error, results)=>{
      if(error) {
        return res.status(500).json({
          success: 0,
          message: "Database conection error during createUser",
          errno: error.errno,
          sqlMessage: error.sqlMessage,
  
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      })
    });

  }catch(error){
    if(error instanceof Error){
      return res.status(412).json({
        success: 0,
        message: "Missing params.",
        serverMessage: error.message
      })
    }
    return res.status(500).json({
      success: 0,
      message: "Error."
    })
  }
}
export const createUserFunction = (body: User) => {
  const salt = genSaltSync(10);
  try{
    body.password = hashSync(body.password,salt);
    create(body,(error, results)=>{
      if(error) {
        return ;
      }
      return console.log({
        success: 1,
        data: results
      })
    });

  }catch(error){
    if(error instanceof Error){
      return console.log({
        success: 0,
        message: "Missing params.",
        serverMessage: error.message
      })
    }
    return console.log({
      success: 0,
      message: "Error."
    })
  }
}

export const getUserById = (req: Request,res: Response) => {
  const id = req.params.id;
  getUserByIdService(id, (error, results)=>{
    if(error) {
      return res.status(500).json({
        success: 0,
        message: "Database conection error",
        errno: error.errno,
        sqlMessage: error.sqlMessage,

      });
    }
    if(!results){
      return res.status(404).json({
        success: 0,
        message: "Record not found!"
      })
    }
    return res.status(200).json({
      success: 1,
      data: results
    })
  })
}

export const getUserByLoginOrEmail = (req: Request,res: Response) => {
  const login = req.params.login;
  getUserByEmailService(login, (error, results)=>{
    if(error) {
      return res.status(500).json({
        success: 0,
        message: "Database conection error",
        errno: error.errno,
        sqlMessage: error.sqlMessage,

      });
    }
    if(!results){
      return res.status(404).json({
        success: 0,
        message: "Record not found!"
      })
    }
    return res.status(200).json({
      success: 1,
      data: results
    })
  })
}


export const getUsers = (req: Request,res: Response) => {
  getUsersService((error, results)=>{
    if(error) {
      return res.status(500).json({
        success: 0,
        message: "Database conection error",
        errno: error.errno,
        sqlMessage: error.sqlMessage,

      });
    }
    if(!results){
      return res.status(404).json({
        success: 0,
        message: "No users listed yet!"
      })
    }
    return res.status(200).json({
      success: 1,
      data: results
    })
  })
}

export const updateUser = (req: Request, res: Response) => {
  const body = req.body;
  const salt = genSaltSync(10);
  try {
    body.password = hashSync(body.password,salt);
    updateUserService(body, (error, results) => {
      if(error) {
        return res.status(500).json({
          success: 0,
          message: "Database conection error",
          errno: error.errno,
          sqlMessage: error.sqlMessage,
        });
      }
      if(!results || !results.affectedRows){
        return res.status(404).json({
          success: 0,
          message: "Failed to update user"
        })
      }
      return res.status(200).json({
        success: 1,
        message: "update successfully"
      })
    });

  } catch (error) {
    if(error instanceof Error){
      return res.status(412).json({
        success: 0,
        message: "Missing params.",
        serverMessage: error.message
      })
    }
    return res.status(500).json({
      success: 0,
      message: "Error."
    })
  }
}

export const deleteUser = (req: Request, res: Response) => {
  const data = req.body;
  try {
    deleteUserService(data, (error, results) => {
      if(error) {
        return res.status(500).json({
          success: 0,
          message: "Database conection error",
          errno: error.errno,
          sqlMessage: error.sqlMessage,
        });
      }
      if(!results) {
        return res.status(404).json({
          success: 0,
          message: "User not found!"
        });
      }
      return res.status(200).json({
        success: 1,
        message: "User deleted successfully"
      })
    })
  } catch(error){
    if(error instanceof Error){
      return res.status(412).json({
        success: 0,
        message: "Missing params.",
        serverMessage: error.message
      })
    }
    return res.status(500).json({
      success: 0,
      message: "Error."
    })
  }
}
