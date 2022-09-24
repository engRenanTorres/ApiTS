import { Server } from "http";
import request from "supertest";
import app from "../app";

const server = app.listen(4000);
export const loginRequest = request(server).post("/api/users/login")


