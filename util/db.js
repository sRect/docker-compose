const path = require("path");
// const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");
const { logger } = require(path.resolve(__dirname, "../util/logger"));

// https://github.com/demopark/sequelize-docs-Zh-CN/blob/master/core-concepts/getting-started.md
// 此处的host应该指向docker-compose中的容器名
const db = new Sequelize("todolist", "root", "123456", {
  dialect: "mysql",
  // host: "todolist_mysql_server",
  host: "localhost",
});

const connectMySQL = () => {
  db.authenticate()
    .then(() => {
      console.log("mysql连接成功");
    })
    .catch((e) => {
      console.log(e);
      console.log("连接失败，3秒后重试");
      logger.error(`数据库连接失败: ${e.message}`);
      setTimeout(connectMySQL, 3000);
    });
};

// https://www.npmjs.com/package/mysql2
// const connectMySQL = async () => {
//   const connection = await mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "123456",
//     database: "todolist",
//     port: "3306",
//   });

//   connection.on("connection", () => {
//     console.log("数据库连接成功:", connection.threadId);
//   });

//   connection.on("error", (e) => {
//     console.log(e);
//     console.log("连接失败，3秒后重试");
//     logger.error(`数据库连接失败: ${e}`);
//     // db.end();
//     setTimeout(connectMySQL, 3000);
//   });
//   global.db = connection;
// };

exports.connectMySQL = connectMySQL;
exports.db = db;
