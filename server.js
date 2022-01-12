const Koa = require("koa");
const Router = require("@koa/router");
const path = require("path");
const static = require("koa-static");
const bodyParser = require("koa-bodyparser");
// const koalogger = require("koa-logger");
const ROOT = path.resolve(process.cwd(), "./");
const { accessLogger } = require(path.resolve(ROOT, "./util/logger"));

const index = require(path.resolve(ROOT, "./routes/index"));
const uuid = require(path.resolve(ROOT, "./routes/uuid"));

const app = new Koa();
const router = new Router();

app.use(accessLogger());
// app.use(koalogger());
app.use(static(path.resolve(__dirname, "./public")));
app.use(bodyParser());

// 加载所有子路由
router.use("/", index.routes(), index.allowedMethods());
router.use("/api", uuid.routes(), uuid.allowedMethods());
// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods());

app.on("error", function (err) {
  console.log("logging error ", err.message);
  console.log(err);
});

app.listen(4000, () => {
  console.log("====your app is running at port 4000=====");
});
