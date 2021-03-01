import express from 'express';
import request from 'supertest';
import { lrouter } from '../src/index';

const app = express();
const router = lrouter(express.Router(), '/test/controllers');

const middleware01 = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  req.body.middleware01 = 'Passed middleware01';
  next();
};

const middleware02 = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  req.body.middleware02 = 'Passed middleware02';
  next();
};

router.group(
  {
    prefix: '/api/v1',
    namespace: 'abc',
    middleware: [middleware01],
  },
  () => {
    router.get('/', (req: express.Request, res: express.Response) => {
      return res.status(200).json({ message: 'Welcome message!' });
    });

    router.group(
      {
        prefix: '/tests',
      },
      () => {
        router.get('/', 'test.controller@index');
        router.post('/', 'test.controller@store');
        router.put('/:id', 'test.controller@update');
        router.delete('/:id', 'test.controller@destroy');
      },
    );

    router.get(
      '/pass',
      (req: express.Request, res: express.Response) => {
        return res.status(200).json({
          message01: req.body.middleware01,
          message02: req.body.middleware02,
        });
      },
      [middleware02],
    );
  },
);

app.use(express.json());
app.use(router.init());

describe('Route Test', () => {
  it('should return message welcome', async () => {
    const res = await request(app).get('/api/v1');

    expect(res.status).toEqual(200);
    expect(res.body).toEqual({ message: 'Welcome message!' });
  });

  it('should return all tests', async () => {
    const res = await request(app).get('/api/v1/tests');

    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('tests');
  });

  it('should return stored test', async () => {
    const res = await request(app).post('/api/v1/tests').send({
      id: 1,
      title: 'Test 01',
    });

    expect(res.status).toEqual(201);
    expect(res.body).toEqual({ id: 1, title: 'Test 01' });
  });

  it('should return updated test', async () => {
    const res = await request(app).put('/api/v1/tests/1').send({
      title: 'Test 01',
    });

    expect(res.status).toEqual(200);
    expect(res.body).toEqual({ id: '1', title: 'Test 01' });
  });

  it('should return id of deleted test', async () => {
    const res = await request(app).delete('/api/v1/tests/1');

    expect(res.status).toEqual(200);
    expect(res.body).toEqual({ id: '1' });
  });

  it('should pass middleware', async () => {
    const res = await request(app).get('/api/v1/pass');

    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('message01');
    expect(res.body).toHaveProperty('message02');
  });
});
