import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from 'express';

export const checkToken = (req :Request , res :Response, next :NextFunction) => {
  let token = req.get("authorization");
  const tokenPayload = process.env.TOKEN_KEY;
  if (!tokenPayload) throw new Error('Token key is not set');
  if(token){
    token = token.slice(7);
    verify(
      token,
      tokenPayload, 
      (error, decode)=>{
        if(error){
          res.json({
            success: 0,
            message: "Invalid token."
          })
       	} else next();
      });
  } else {
    res.json({
      success:0,
      message: "Acess denied! Unautorized user."
    })
  }
}