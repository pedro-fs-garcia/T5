import * as express from 'express';

declare global {
    namespace Express {
        interface Request {
            user?: Record<string, any>;
        }
    }
}

import { Request } from 'express';

declare module 'express' {
  export interface Request {
    user?: any;
  }
}

