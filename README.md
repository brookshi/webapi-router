# webapi-router
[<img src="https://badge.fury.io/js/webapi-router.svg">](https://www.npmjs.com/package/webapi-router/)

create restful api application with the same feeling of Asp.Net WebApi

## Feature
Dont need write the annoying koa.use(...). Instead, webapi-router will auto use the controller file path for router path.

Also, use decorator `@GET(path)` can indicate the router path directly.

Support `@GET`, `@POST`, `@DELETE`, `@PUT`, `@OPTIONS`, `@HEAD`, `@PATCH`.

## Usage
### 1. set folder of controllers and restful api prefix in index.ts/js.
```ts
import { WebApiRouter } from '../lib/index';

app.use(new WebApiRouter().router('sample/controllers', 'api'));
```
### 2. add controller base on BaseController
```ts
export class TestController extends BaseController
{

}
```
### 3. add decorator for function
```ts
///:name is a path param, get it in arguments by using @PathParam
/// get body by using @BodyParam
/// get query param by using @QueryParam
@POST('/user/:name') // argument is option, if empty, will using controller file path as router path.
postWithPathParam(@PathParam('name') name: string, @QueryParam('id') id: string, @BodyParam body: any) {
    console.info(`TestController - post with name: ${name}, body: ${JSON.stringify(body)}`);
    return 'ok';
}
```

## That is all!!
