import { NextFunction, Request, Response } from 'express';

class Middleware01 {
  handle(arg: any) {
    return (req: Request, res: Response, next: NextFunction) => {
      req.body[arg] = 'Passed middleware02';
      next();
    };
  }
}

export default new Middleware01();
