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
const baseController_1 = require("../lib/baseController");
const decorators_1 = require("../lib/decorators");
class Test extends baseController_1.default {
    test() {
        console.info("test");
        return "test";
    }
    test1(id, pwd, name, body) {
        console.info(`id:${id}, name:${name}, body:${body}`);
    }
}
__decorate([
    decorators_1.GET(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], Test.prototype, "test", null);
__decorate([
    decorators_1.GET('/aaa/:id/:pwd'),
    __param(0, decorators_1.PathParam('id')), __param(1, decorators_1.PathParam('pwd')), __param(2, decorators_1.QueryParam('name')), __param(3, decorators_1.BodyParam),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String, Object]),
    __metadata("design:returntype", void 0)
], Test.prototype, "test1", null);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Test;
//# sourceMappingURL=testController.js.map