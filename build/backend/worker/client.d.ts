import { Request, Response } from '../../interfaces';
import { Client } from '../ipc';
export declare const IPCClient: Client<Request, Response, "compile" | "typeCheck">;
