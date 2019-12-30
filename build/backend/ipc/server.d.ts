import { Handler, Keys } from './handler';
export declare class Server<RQ, RS, K extends Keys<RQ, RS> = Keys<RQ, RS>> {
    private readonly app;
    private readonly server;
    constructor(name: string, handler: Handler<RQ, RS>);
    close(): void;
}
