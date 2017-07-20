"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const Bodyparser = require("koa-bodyparser");
const index_1 = require("../lib/index");
let app = new Koa();
app.use(Bodyparser());
app.use(new index_1.WebApiRouter().router('sample/controllers', 'api'));
app.use(ctx => {
    ctx.body = "welcome to WebApi-Router";
});
app.listen(3000);
//# sourceMappingURL=index.js.map