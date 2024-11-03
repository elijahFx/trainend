require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();

app.use(cors());
app.use(express.json());

const exerRoutes = require("./routes/exercise");
const addictionRoutes = require("./routes/addiction")
const userRoutes = require("./routes/users")

app.use("/exercises", exerRoutes);
app.use("/addictions", addictionRoutes)
app.use("/users", userRoutes)


const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Ошибка подключения к базе данных:", err);
    return;
  }
  console.log("Подключение к базе данных успешно");
});

app.listen(process.env.PORT, () => {
  console.log(`Сервер запущен на порте ${process.env.PORT}`);
});

module.exports = db;
