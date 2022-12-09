import { Router } from "express";
import { checkToken } from "../auth/authMiddleware";
import role from "../interfaces/Role";
import { 
  createUser, 
  getUserById, 
  getUsers, 
  updateUser, 
  deleteUser,
  login, 
  getUserByLoginOrEmail} from "./userController";


const userRouter = Router();
userRouter.post("/", checkToken([role.AdmMT,role.Dev]), createUser);
userRouter.get("/:id", checkToken([role.AdmMT,role.Dev]), getUserById);
userRouter.get("/", checkToken([role.AdmMT,role.Dev,role.Marketing,role.SupervisorC,role.OperadorCC]), getUsers);
userRouter.patch("/", checkToken([role.AdmMT,role.Dev]), updateUser);
userRouter.delete("/", checkToken([role.AdmMT,role.Dev]), deleteUser);
userRouter.post("/login",login);

export default userRouter;



