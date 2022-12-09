import { decode } from "jsonwebtoken";
import { NextFunction, Request, Response } from 'express';
import moment from "moment-timezone";
import Logs from "../interfaces/logs";
import { register } from "./loggingService";
import  errorHandler from '../exceptions/errorHandleFunctions';


const logginMiddleware = (req: Request, res: Response ,next: NextFunction) => {
  let log: Logs = {
    ip: "",
    date: "",
    time: "",
    endpoint: "",
    hierarchy: 0
  }
  if(req.headers.authorization){
    let token = req.headers.authorization;
    const tokenPayload = process.env.TOKEN_KEY;
    if (!tokenPayload) throw new Error('Token key is not set');
    const token2 = token.slice(7);
    const payload = decode(token2,{complete:true})?.payload;
    if( typeof payload === 'object' ){
      log = { ...log, 
        login: payload.login,
        hierarchy: payload.role
      }
    }
  }

  log = { ...log, 
    ip: req.ip,
    host: req.headers.host, 
    endpoint: req.originalUrl, 
    date: moment().tz('America/Sao_Paulo').format('DD/MM/YYYY'),
    time: moment().tz('America/Sao_Paulo').format('hh:mm'),
  }

  try {
    register(log);

  }catch(error){
  }
  next();
}

export default logginMiddleware;