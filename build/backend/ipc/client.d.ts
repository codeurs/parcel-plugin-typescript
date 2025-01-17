export declare type Keys<T, U> = (keyof T) & (keyof U);
export declare type Client<RQ, RS, K extends Keys<RQ, RS> = Keys<RQ, RS>> = {
    [P in K]: (data: RQ[P]) => Promise<RS[P]>;
};
export declare function Client<RQ, RS>(name: string, keys: Array<Keys<RQ, RS>>): Client<RQ, RS, Keys<RQ, RS>>;
