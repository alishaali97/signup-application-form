const request = require('supertest');
const app = require('../app');

describe('POST /api/auth/signup', () => {
  it('rejects missing email', async () => {
    const res = await request(app).post('/api/auth/signup').send({ password: 'secret123' });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/required/i);
  });

  it('rejects missing password', async () => {
    const res = await request(app).post('/api/auth/signup').send({ email: 'a@b.com' });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/required/i);
  });
});

describe('POST /api/auth/signin', () => {
  it('rejects missing credentials', async () => {
    const res = await request(app).post('/api/auth/signin').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/required/i);
  });
});

describe('POST /api/auth/signout', () => {
  it('rejects requests with no authorization header', async () => {
    const res = await request(app).post('/api/auth/signout');
    expect(res.statusCode).toBe(401);
  });
});
