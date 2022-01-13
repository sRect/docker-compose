const Router = require("@koa/router");
const { nanoid } = require("nanoid");

const todoList = new Router();
const list = Array(10)
  .fill(null)
  .map(() => ({
    id: nanoid(),
    isFinished: false,
    text: nanoid(),
  }));

todoList.get("/todoList", async (ctx, next) => {
  ctx.body = {
    code: 200,
    data: list,
    msg: "ok",
  };

  next();
});

module.exports = todoList;
