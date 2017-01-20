const Router = Symbol();
export { Router }; 

export declare function GET(path?: string): Function;

export declare function POST(path?: string): Function;

export declare function DELETE(path?: string): Function;

export declare function PUT(path?: string): Function;

export declare function QueryParam(param: string): Function;

export declare function PathParam(param: string): Function;

export declare function BodyParam(target: baseController, name: string, index: number) : Function;