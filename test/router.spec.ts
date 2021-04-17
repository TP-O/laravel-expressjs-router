import request from 'supertest';
import { app } from './setup';

describe('Test Router', () => {
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
    expect(res.body).toHaveProperty('message03');
  });
});
