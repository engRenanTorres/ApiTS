import express from "express";
import  userRouter  from "./users/userRouter";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "../swagger.json";
import logginMiddleware from "./logging/logginMiddleware";
import migrations from "../config/migrations";
import adminUser from "../config/adminUser";

require("dotenv").config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

const app = express();
app.use(express.json());
migrations;
app.use(logginMiddleware);
app.use("/api/users", userRouter);
adminUser();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


export default app;



