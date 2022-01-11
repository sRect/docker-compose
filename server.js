const Koa = require("koa");
const Router = require("koa-router");
const path = require("path");
const static = require("koa-static");
const { nanoid } = require("nanoid/async");
const { accessLogger, logger } = require(path.resolve(
  __dirname,
  "./util/logger"
));

const app = new Koa();
const router = new Router();

app.use(static(path.resolve(__dirname, "./")));
app.use(accessLogger());

router.get("/api/uuid", async (ctx, next) => {
  ctx.body = {
    code: 200,
    data: await nanoid(),
    msg: "ok",
  };

  next();
});

router.get("/", async (ctx, next) => {
  logger.info("我是首页");
  await ctx.render("index", {
    title: "Hello Koa 2!",
  });

  next();
});

app.use(router.routes()).use(router.allowedMethods());

app.on("error", function (err) {
  console.log("logging error ", err.message);
  console.log(err);
});

app.listen(4000, () => {
  console.log("====your app is running at port 4000=====");
});
