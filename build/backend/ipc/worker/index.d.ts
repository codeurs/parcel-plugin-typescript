import { Keys } from '../handler';
export interface RequestMessage<R, K extends keyof R = keyof R> {
    type: 'request';
    id: string;
    method: K;
    data: R[K];
}
export interface ResponseMessage<R, K extends keyof R = keyof R> {
    type: 'response';
    id: string;
    method: K;
    data: {
        result: R[K];
        error: null;
    } | {
        result: null;
        error: string;
    };
}
export declare class Worker<RQ = {}, RS = {}> {
    private readonly onMessage;
    private readonly child;
    constructor(path: string);
    request<M extends Keys<RQ, RS>>(method: M, data: RQ[M]): Promise<RS[M]>;
    kill(): void;
}
