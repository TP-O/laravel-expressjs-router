import { NextFunction, Request, Response } from 'express';

class Middleware01 {
  handle(req: Request, res: Response, next: NextFunction) {
    req.body.middleware02 = 'Passed middleware02';
    next();
  }
}

export default new Middleware01();
