"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paramType_1 = require("./paramType");
require("reflect-metadata");
const Router = Symbol();
exports.Router = Router;
function GET(path) {
    return (target, name) => setMethodDecorator(target, name, 'GET', path);
}
exports.GET = GET;
function POST(path) {
    return (target, name) => setMethodDecorator(target, name, 'POST', path);
}
exports.POST = POST;
function DELETE(path) {
    return (target, name) => setMethodDecorator(target, name, 'DELETE', path);
}
exports.DELETE = DELETE;
function PUT(path) {
    return (target, name) => setMethodDecorator(target, name, 'PUT', path);
}
exports.PUT = PUT;
function QueryParam(param) {
    return (target, name, index) => {
        setParamDecorator(target, name, index, { name: param, type: paramType_1.ParamType.Query });
    };
}
exports.QueryParam = QueryParam;
function PathParam(param) {
    return (target, name, index) => {
        setParamDecorator(target, name, index, { name: param, type: paramType_1.ParamType.Path });
    };
}
exports.PathParam = PathParam;
function BodyParam(target, name, index) {
    setParamDecorator(target, name, index, { name: "", type: paramType_1.ParamType.Body });
}
exports.BodyParam = BodyParam;
function setMethodDecorator(target, name, method, path) {
    target[Router] = target[Router] || {};
    target[Router][name] = target[Router][name] || {};
    target[Router][name].method = method;
    target[Router][name].path = path;
}
function setParamDecorator(target, name, index, value) {
    let paramTypes = Reflect.getMetadata("design:paramtypes", target, name);
    target[Router] = target[Router] || {};
    target[Router][name] = target[Router][name] || {};
    target[Router][name].params = target[Router][name].params || [];
    target[Router][name].params[index] = { type: paramTypes[index], name: value.name, paramType: value.type };
}
//# sourceMappingURL=decorators.js.map