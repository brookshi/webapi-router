import * as Path from 'path';
import * as KoaRouter from 'koa-router';
import * as Koa from 'koa';
import * as FileUtil from './fileUtil';
import { Router } from './decorators';
import { ParamType } from './paramType';
import { BaseController } from './baseController';
import 'reflect-metadata';

export * from './baseController';
export * from './decorators';

export class WebApiRouter {

    controllerFolder: string;
    urlPrefix: string;
    koaRouter: KoaRouter;
    defaultMethod: string;

    constructor() {
    }

    router(controllerFolder: string, urlPrefix?: string): (ctx: Koa.Context, next: Function) => Promise<void> {
        this.controllerFolder = controllerFolder;
        this.urlPrefix = urlPrefix;
        this.koaRouter = new KoaRouter();
        this.initRouterForControllers();

        return this.koaRouter.routes();
    }

    initRouterForControllers() {
        let files = FileUtil.getFiles(this.controllerFolder);
        files.forEach(file => {
            let exportClass = require(file).default;
            if (this.isAvalidController(exportClass)) {
                this.setRouterForClass(exportClass, file);
            }
        });
    }

    private isAvalidController(exportClass: any) {
        return Reflect.getPrototypeOf(exportClass) == BaseController;
    }

    private setRouterForClass(exportClass: any, file: string) {
        let controllerRouterPath = this.buildControllerRouter(file);
        let controller = new exportClass();
        for (let funcName in exportClass.prototype[Router]) {
            let method = exportClass.prototype[Router][funcName].method.toLowerCase();
            let path = exportClass.prototype[Router][funcName].path;
            this.setRouterForFunction(method, controller, funcName, path ? `/${this.urlPrefix}${path}` : `/${this.urlPrefix}${controllerRouterPath}/${funcName}`);
        }
    }

    private buildControllerRouter(file: string) {
        let relativeFile = Path.relative(Path.join(FileUtil.getApiDir(), this.controllerFolder), file);
        let controllerPath = '/' + relativeFile.replace(/\\/g, '/').replace('.js', '').toLowerCase();
        if (controllerPath.endsWith('controller')) {
            controllerPath = controllerPath.substring(0, controllerPath.length - 10);
        }
        if (controllerPath.endsWith('_') || controllerPath.endsWith('-')) {
            controllerPath = controllerPath.substring(0, controllerPath.length - 1);
        }
        return controllerPath;
    }

    private setRouterForFunction(method: string, controller: any, funcName: string, routerPath: string) {
        this.koaRouter[method](routerPath, async (ctx, next) => { await this.execApi(ctx, next, controller, funcName) });
    }

    private async execApi(ctx: Koa.Context, next: Function, controller: any, funcName: string): Promise<void> {
        try {
            const result = await controller[funcName](...this.buildFuncParams(ctx, controller, controller[funcName]));
            if (!!result) {
                ctx.body = result;
            }
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    }

    private buildFuncParams(ctx: any, controller: any, func: Function) {
        let paramsInfo = controller[Router][func.name].params;
        let params = [];
        if (paramsInfo) {
            for (let i = 0; i < paramsInfo.length; i++) {
                if (paramsInfo[i]) {
                    params.push(paramsInfo[i].type(this.getParam(ctx, paramsInfo[i].paramType, paramsInfo[i].name)));
                } else {
                    params.push(ctx);
                }
            }
        }
        if (params.length === 0) {
            params.push(ctx);
        }
        return params;
    }

    private getParam(ctx: any, paramType: ParamType, name: string) {
        switch (paramType) {
            case ParamType.Query:
                return ctx.query[name];
            case ParamType.Path:
                return ctx.params[name];
            case ParamType.Body:
                return ctx.request.body;
            default:
                console.error('does not support this param type');
        }
    }
}