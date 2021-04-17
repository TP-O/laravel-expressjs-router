import express from 'express';
import { lrouter } from '../src/index';
import middleware03 from './middleware/middleware03';

const app = express();
const router = lrouter({
  router: express.Router(),
  currentDir: __dirname,
  controllerPath: '/controllers',
  middlewarePath: '/middleware',
});

router.group(
  {
    prefix: '/api/v1',
    namespace: 'abc',
    middleware: ['middleware01@handle'],
  },
  () => {
    router.get({
      path: '/',
      action: (req: express.Request, res: express.Response) => {
        return res.status(200).json({ message: 'Welcome message!' });
      },
    });

    router.group(
      {
        prefix: '/tests',
      },
      () => {
        router.get({
          path: '/',
          action: 'test.controller@index',
        });
        router.post({
          path: '/',
          action: 'test.controller@store',
        });
        router.put({
          path: '/:id',
          action: 'test.controller@update',
        });
        router.delete({
          path: '/:id',
          action: 'test.controller@destroy',
        });
      },
    );

    router.get({
      path: '/pass',
      action: (req: express.Request, res: express.Response) => {
        return res.status(200).json({
          message01: req.body.middleware01,
          message02: req.body.middleware02,
          message03: req.body.middleware03,
        });
      },
      middleware: [
        'middleware02@handle:middleware02',
        middleware03.handle('middleware03'),
      ],
    });
  },
);

app.use(express.json());
app.use(router.init());

export { app };
