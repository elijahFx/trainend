// db.js
require("dotenv").config()
const mysql = require("mysql2/promise");

const createDbConnection = async () => {
    const db = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });
    return db;
};

module.exports = createDbConnection;
