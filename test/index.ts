import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';
import * as Bodyparser from 'koa-bodyparser';
import { WebApiRouter } from '../lib/index';

let app = new Koa();

app.use(Bodyparser());

app.use(new WebApiRouter().router('test/controllers', 'api'));

app.use(ctx => {
    ctx.body = "welcome to WebApi-Router"
});

app.listen(3000);