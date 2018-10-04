import { BaseController } from '../../lib/index';
import { GET, POST, DELETE, PUT, PathParam, QueryParam, BodyParam, PATCH, HEAD, CONNECT, OPTIONS, TRACE } from '../../lib/decorators';
import * as Koa from 'koa';

export default class TestController extends BaseController {

    @GET()
    get(ctx: Koa.Context): string {
        console.info('TestController - get');
        return 'get';
    }

    @GET()
    async getPromise(): Promise<Object> {
        console.info('TestController - getPromise');
        await this.delay();
        return { result: 'getPromise' };
    }

    @GET('/func/getwithpath')
    getWithPath(): Object {
        console.info('TestController - getWithPath');
        return { result: 'getWithPath' };
    }

    @GET('/user/:id/:name')
    getWithPathParam(@PathParam('id') id: number, @PathParam('name') name: string): string {
        console.info(`TestController - getWithPathParam with param id: ${id}, name: ${name}`);
        return 'ok';
    }

    @GET('/user')
    getWithQueryParam(@QueryParam('id') id: number) {
        console.info(`TestController - getWithQueryParam with query param id: ${id}`);
        return 'ok';
    }

    @POST()
    post(@BodyParam body: any) {
        console.info(`TestController - post with body: ${JSON.stringify(body)}`);
        return 'ok';
    }

    @POST('/user/:name')
    postWithPathParam(@PathParam('name') name: string, @BodyParam body: any) {
        console.info(`TestController - post with name: ${name}, body: ${JSON.stringify(body)}`);
        return 'ok';
    }

    @DELETE('/user/:id')
    delete(@PathParam('id') id: number) {
        console.info(`TestController - delete with id: ${id}`);
        return 'ok';
    }

    @PUT('/user/:id/:name')
    put(@PathParam('id') id: number, @PathParam('name') name: string, @BodyParam body: any) {
        console.info(`TestController - update with id: ${id}, name: ${name}, body: ${JSON.stringify(body)}`);
        return 'ok';
    }

    @PATCH('/user/:name')
    patch(@PathParam('name') name: string, @BodyParam body: any) {
        console.info(`TestController - patch with name: ${name}, body: ${JSON.stringify(body)}`);
        return 'ok';
    }

    @HEAD()
    head(ctx: Koa.Context): string {
        console.info('TestController - head');
        return 'head';
    }

    @OPTIONS()
    options(ctx: Koa.Context): string {
        console.info('TestController - options');
        return 'options';
    }

    @TRACE()
    trace(ctx: Koa.Context): string {
        console.info('TestController - trace');
        return 'trace';
    }

    delay(): Promise<void> {
        return new Promise<void>((resolve, reject) => { setTimeout(() => resolve(), 2000) });
    }
}