import { NextFunction, Request, Response } from 'express';

class Middleware01 {
  handle() {
    return (req: Request, res: Response, next: NextFunction) => {
      req.body.middleware01 = 'Passed middleware01';
      next();
    };
  }
}

export default new Middleware01();
