"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
const Path = require("path");
const KoaRouter = require("koa-router");
const FileUtil = require("./fileutil");
const decorators_1 = require("./decorators");
const paramType_1 = require("./paramType");
const baseController_1 = require("./baseController");
require("reflect-metadata");
__export(require("./baseController"));
__export(require("./decorators"));
class WebApiRouter {
    constructor() {
    }
    router(controllerFolder, urlPrefix) {
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
    isAvalidController(exportClass) {
        return Reflect.getPrototypeOf(exportClass) == baseController_1.BaseController;
    }
    setRouterForClass(exportClass, file) {
        let controllerRouterPath = this.buildControllerRouter(file);
        let controller = new exportClass();
        for (let funcName in exportClass.prototype[decorators_1.Router]) {
            let method = exportClass.prototype[decorators_1.Router][funcName].method.toLowerCase();
            let path = exportClass.prototype[decorators_1.Router][funcName].path;
            this.setRouterForFunction(method, controller, funcName, path ? `/${this.urlPrefix}${path}` : `/${this.urlPrefix}${controllerRouterPath}/${funcName}`);
        }
    }
    buildControllerRouter(file) {
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
    setRouterForFunction(method, controller, funcName, routerPath) {
        this.koaRouter[method](routerPath, (ctx, next) => __awaiter(this, void 0, void 0, function* () { yield this.execApi(ctx, next, controller, funcName); }));
    }
    execApi(ctx, next, controller, funcName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield controller[funcName](...this.buildFuncParams(ctx, controller, controller[funcName]));
                if (!!result) {
                    ctx.body = result;
                }
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
    buildFuncParams(ctx, controller, func) {
        let paramsInfo = controller[decorators_1.Router][func.name].params;
        let params = [];
        if (paramsInfo) {
            for (let i = 0; i < paramsInfo.length; i++) {
                if (paramsInfo[i]) {
                    params.push(paramsInfo[i].type(this.getParam(ctx, paramsInfo[i].paramType, paramsInfo[i].name)));
                }
                else {
                    params.push(ctx);
                }
            }
        }
        if (params.length === 0) {
            params.push(ctx);
        }
        return params;
    }
    getParam(ctx, paramType, name) {
        switch (paramType) {
            case paramType_1.ParamType.Query:
                return ctx.query[name];
            case paramType_1.ParamType.Path:
                return ctx.params[name];
            case paramType_1.ParamType.Body:
                return ctx.request.body;
            default:
                console.error('does not support this param type');
        }
    }
}
exports.WebApiRouter = WebApiRouter;
//# sourceMappingURL=index.js.map