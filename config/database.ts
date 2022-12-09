import {createPool} from "mysql";
require("dotenv").config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

const pool = createPool({
    host: process.env.DB_HOST ||'http://localhost',
    database: process.env.DB_SCHEMA||'RenanTestes',
    user: process.env.DB_USER ||'',
    password: process.env.DB_PASS ||'',
    multipleStatements:true,
    port: Number(process.env.DB_PORT) ||3306,
    connectionLimit:10
});

const tables = {
    USERS: "users",
    LOGS: "logs"
}

export default pool;