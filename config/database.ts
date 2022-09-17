import mysql, {createPool} from "mysql";
require("dotenv").config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

const pool = createPool({
    host: process.env.DB_HOST ||'10.200.2.19',
    database: process.env.DB_TABLE ||'MaricaTelecomTestes',
    user: process.env.DB_USER ||'',
    password: process.env.DB_PASS ||'',
    multipleStatements:true,
    port: Number(process.env.DB_PORT) ||3306,
    connectionLimit:10
});



export default pool;