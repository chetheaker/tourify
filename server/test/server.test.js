const app = require('../dist/server.js');
const supertest = require('supertest');
const request = supertest(app);
jest.setTimeout(30000);

describe('User endpoints', () => {
  it('should create a new user', async (done) => {
    user = {
      email: 'test@gmail.com',
      first_name: 'John',
      last_name: 'Doe',
      password: 'password'
    };
    const response = await request.post('/register').send(user);
    expect(response.body.acknowledged).toBe(true);
  });
});

// describe('Trips endpoints', () => {
//   it('/trips/explore', async () => {
//     const response = await request.get('/trips/explore');
//     expect(response.body).toEqual({ user: false });
//   });
// });
