import { JwtPayload, verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from 'express';

export function checkToken(roles: Array<number>) {

  return (req :Request , res :Response, next :NextFunction) => {
   let token = req.get("authorization");
   const tokenPayload = process.env.TOKEN_KEY;
   if (!tokenPayload) throw new Error('Token key is not set');
   if(token){
     token = token.slice(7);
     verify(
       token,
       tokenPayload, 
       (error, decode)=>{
          let userData: JwtPayload;
          if( typeof decode === 'object' ){
            userData = decode;
            //verifica se a autoridade de acesso do usuário
            if (roles.length && !roles.includes(userData.role)) {
              // user's role is not authorized
              return res.status(401).json({ message: 'Acess denied! Unauthorized user.' });
            }
          }
 
         if(error){
           res.json({
             success: 0,
             message: "Acess denied! Invalid token."
           })
          } else next();
       });
   } else {
     res.status(401).json({
       success:0,
       message: "Acess denied! Missing token."
     })
   }
 }
}
