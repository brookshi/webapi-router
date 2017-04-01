"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const index_1 = require("../../lib/index");
const decorators_1 = require("../../lib/decorators");
const Koa = require("koa");
class TestController extends index_1.BaseController {
    get(ctx) {
        console.info('TestController - get');
        return 'get';
    }
    getPromise() {
        return __awaiter(this, void 0, void 0, function* () {
            console.info('TestController - getPromise');
            yield this.delay();
            return { result: 'getPromise' };
        });
    }
    getWithPath() {
        console.info('TestController - getWithPath');
        return { result: 'getWithPath' };
    }
    getWithPathParam(id, name) {
        console.info(`TestController - getWithPathParam with param id: ${id}, name: ${name}`);
        return 'ok';
    }
    getWithQueryParam(id) {
        console.info(`TestController - getWithQueryParam with query param id: ${id}`);
        return 'ok';
    }
    post(body) {
        console.info(`TestController - post with body: ${JSON.stringify(body)}`);
        return 'ok';
    }
    postWithPathParam(name, body) {
        console.info(`TestController - post with name: ${name}, body: ${JSON.stringify(body)}`);
        return 'ok';
    }
    delete(id) {
        console.info(`TestController - delete with id: ${id}`);
        return 'ok';
    }
    put(id, name, body) {
        console.info(`TestController - update with id: ${id}, name: ${name}, body: ${JSON.stringify(body)}`);
        return 'ok';
    }
    delay() {
        return new Promise((resolve, reject) => { setTimeout(() => resolve(), 2000); });
    }
}
__decorate([
    decorators_1.GET(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = (typeof Koa !== "undefined" && Koa).Context) === "function" && _a || Object]),
    __metadata("design:returntype", String)
], TestController.prototype, "get", null);
__decorate([
    decorators_1.GET(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestController.prototype, "getPromise", null);
__decorate([
    decorators_1.GET('/func/getwithpath'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], TestController.prototype, "getWithPath", null);
__decorate([
    decorators_1.GET('/user/:id/:name'),
    __param(0, decorators_1.PathParam('id')), __param(1, decorators_1.PathParam('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", String)
], TestController.prototype, "getWithPathParam", null);
__decorate([
    decorators_1.GET('/user'),
    __param(0, decorators_1.QueryParam('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TestController.prototype, "getWithQueryParam", null);
__decorate([
    decorators_1.POST(),
    __param(0, decorators_1.BodyParam),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TestController.prototype, "post", null);
__decorate([
    decorators_1.POST('/user/:name'),
    __param(0, decorators_1.PathParam('name')), __param(1, decorators_1.BodyParam),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TestController.prototype, "postWithPathParam", null);
__decorate([
    decorators_1.DELETE('/user/:id'),
    __param(0, decorators_1.PathParam('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TestController.prototype, "delete", null);
__decorate([
    decorators_1.PUT('/user/:id/:name'),
    __param(0, decorators_1.PathParam('id')), __param(1, decorators_1.PathParam('name')), __param(2, decorators_1.BodyParam),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", void 0)
], TestController.prototype, "put", null);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TestController;
var _a;
//# sourceMappingURL=testController.js.map