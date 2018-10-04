import { BaseController } from './baseController';
import { ParamType } from "./paramType";
import 'reflect-metadata';

const Router = Symbol();
export { Router };

export function GET(path?: string) {
    return (target: BaseController, name: string) => setMethodDecorator(target, name, 'GET', path);
}

export function POST(path?: string) {
    return (target: BaseController, name: string) => setMethodDecorator(target, name, 'POST', path);
}

export function DELETE(path?: string) {
    return (target: BaseController, name: string) => setMethodDecorator(target, name, 'DELETE', path);
}

export function PUT(path?: string) {
    return (target: BaseController, name: string) => setMethodDecorator(target, name, 'PUT', path);
}

export function PATCH(path?: string) {
    return (target: BaseController, name: string) => setMethodDecorator(target, name, 'PATCH', path);
}

export function HEAD(path?: string) {
    return (target: BaseController, name: string) => setMethodDecorator(target, name, 'HEAD', path);
}

export function OPTIONS(path?: string) {
    return (target: BaseController, name: string) => setMethodDecorator(target, name, 'OPTIONS', path);
}

export function CONNECT(path?: string) {
    return (target: BaseController, name: string) => setMethodDecorator(target, name, 'CONNECT', path);
}

export function TRACE(path?: string) {
    return (target: BaseController, name: string) => setMethodDecorator(target, name, 'TRACE', path);
}

export function QueryParam(param: string) {
    return (target: BaseController, name: string, index: number) => {
        setParamDecorator(target, name, index, { name: param, type: ParamType.Query });
    };
}

export function PathParam(param: string) {
    return (target: BaseController, name: string, index: number) => {
        setParamDecorator(target, name, index, { name: param, type: ParamType.Path });
    }
}

export function BodyParam(target: BaseController, name: string, index: number) {
    setParamDecorator(target, name, index, { name: "", type: ParamType.Body });
}

function setMethodDecorator(target: BaseController, name: string, method: string, path?: string) {
    target[Router] = target[Router] || {};
    target[Router][name] = target[Router][name] || {};
    target[Router][name].method = method;
    target[Router][name].path = path;
}

function setParamDecorator(target: BaseController, name: string, index: number, value: { name: string, type: ParamType }) {
    let paramTypes = Reflect.getMetadata("design:paramtypes", target, name);
    target[Router] = target[Router] || {};
    target[Router][name] = target[Router][name] || {};
    target[Router][name].params = target[Router][name].params || [];
    target[Router][name].params[index] = { type: paramTypes[index], name: value.name, paramType: value.type };
}