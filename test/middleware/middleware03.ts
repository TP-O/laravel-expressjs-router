import { NextFunction, Request, Response } from 'express';

class Middleware03 {
  handle(arg: any) {
    return (req: Request, res: Response, next: NextFunction) => {
      req.body[arg] = 'Passed middleware03';
      next();
    };
  }
}

export default new Middleware03();
