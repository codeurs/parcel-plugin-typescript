import { Request, Response } from '../../interfaces';
import { Handler } from '../ipc';
declare const handler: Handler<Request, Response>;
export = handler;
