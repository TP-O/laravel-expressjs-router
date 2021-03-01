import { Request, Response } from 'express';

class TestController {
  index(req: Request, res: Response) {
    res.status(200).json({
      tests: [],
    });
  }

  store(req: Request, res: Response) {
    res.status(201).json({
      id: req.body.id,
      title: req.body.title,
    });
  }

  update(req: Request, res: Response) {
    res.status(200).json({
      id: req.params.id,
      title: req.body.title,
    });
  }

  destroy(req: Request, res: Response) {
    res.status(200).json({
      id: req.params.id,
    });
  }
}

export default new TestController();
