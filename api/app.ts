import express from "express";
import  userRouter  from "./users/userRouter";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "../swagger.json";

require("dotenv").config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

const app = express();
app.use(express.json());
app.use("/api/users", userRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


export default app;



