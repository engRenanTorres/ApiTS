import { Router } from "express";
import { checkToken } from "../auth/tokenValidation";
import { 
  createUser, 
  getUserById, 
  getUsers, 
  updateUser, 
  deleteUser,
  login } from "./userController";


const userRouter = Router();
userRouter.post("/", checkToken, createUser);
userRouter.get("/:id", checkToken, getUserById);
userRouter.get("/", checkToken, getUsers);
userRouter.patch("/", checkToken, updateUser);
userRouter.delete("/", checkToken, deleteUser);
userRouter.post("/login",login);

export default userRouter;



