import request from 'supertest';
import server from '../server';

describe('Restaurant Routes', () => {
  it('should return a 404 when a get request is sent to /', async () => {
    let results = await request(server).get('/');
    expect(results.statusCode).toBe(404);
  })


})