const path = require("path");
const Router = require("@koa/router");
// const { nanoid } = require("nanoid");
const { QueryTypes } = require("sequelize");
const ROOT = path.resolve(process.cwd(), "./");
const { db } = require(path.resolve(ROOT, "./util/db"));

const todoList = new Router();

// const list = Array(10)
//   .fill(null)
//   .map(() => ({
//     id: nanoid(),
//     isFinished: false,
//     text: nanoid(),
//   }));

todoList.get("/todoList/list", async (ctx, next) => {
  const reqParams = ctx.query;
  // https://github.com/demopark/sequelize-docs-Zh-CN/blob/master/core-concepts/getting-started.md#promises-%E5%92%8C-asyncawait

  const selects = {
    0: "SELECT * FROM todolist WHERE is_finished='0'",
    1: "SELECT * FROM todolist WHERE is_finished='1'",
    2: "SELECT * FROM todolist",
  };

  const filterType = reqParams.filterType || "2";

  console.log("filterType==》", filterType);

  try {
    const list = await db.query(selects[filterType], {
      type: QueryTypes.SELECT,
    });

    ctx.body = {
      code: 200,
      data: list || [],
      msg: "ok",
    };
  } catch (e) {
    console.log(e);
  }

  next();
});

todoList.get("/todoList/add", async (ctx, next) => {
  const reqParams = ctx.request.body;

  ctx.body = {
    code: 200,
    data: "",
    msg: "ok",
  };

  next();
});

module.exports = todoList;
