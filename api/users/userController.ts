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
require("dotenv").config();

const tokenPayload = process.env.TOKEN_KEY;
if (!tokenPayload) throw new Error('Token key is not set');

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

export const login = (req: Request,res: Response) => {
  const body = req.body;
  try {
    getUserByEmailService(body.login, (error, results)=>{
      if(error) {
        return res.status(500).json({
          success: 0,
          message: "Login error during database conection",
          errno: error.errno,
          sqlMessage: error.sqlMessage,
  
        });
      }
      if(!results){
        return res.status(400).json({
          success: 0,
          message: "Invalid email/login or password or Params not found"
        })
      }
      const checkPassword = compareSync(body.password, results.password);
      if(checkPassword) {
        const jsonwebtoken:string = sign(
          { result: results },
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
      console.log(results);
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
