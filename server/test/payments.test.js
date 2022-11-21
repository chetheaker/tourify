const app = require('../dist/server.js');
const supertest = require('supertest');
const request = supertest(app);
let session = supertest.agent(app);
const mocks = require('./mocks.js');
const client = require('../dist/models/db.js');

async function authenticateUser() {
  const user = mocks.user;
  const register = await session.post('/register').send(user);
  const registeredUser = await client
    .db('tourify')
    .collection('users')
    .findOne({ email: user.email });

  const login = await session
    .post('/login')
    .send({ email: user.email, password: user.password });
}

jest.setTimeout(6000);
describe('Stripe endpoints', () => {
  beforeEach(async () => {
    session = supertest.agent(app);
  });

  describe('checkout', () => {
    it('should redirect to checkout', async () => {
      await authenticateUser();
      const checkout = await session
        .post('/checkout')
        .send({ items: mocks.items });
      expect(checkout.body).toHaveProperty('url');
      expect(checkout.status).toBe(201);
    });

    it('should not be able to checkout if not logged in', async () => {
      const checkout = await session
        .post('/checkout')
        .send({ items: mocks.items });
      expect(checkout.body.user).toBe(false);
      expect(checkout.status).toBe(401);
    });
  });
  describe('authenticate purchase', () => {
    it('should not authenticate if there is an error in the transaction', async () => {
      await authenticateUser();
      const checkout = await session
        .post('/checkout')
        .send({ items: mocks.items });

      session_id = checkout.body.url
        .split('/')
        [checkout.body.url.split('/').length - 1].split('#')[0];

      const authenticate = await session
        .post('/success/auth')
        .send({ session_id: session_id });

      expect(authenticate.body.authenticated).toBe(false);
      expect(authenticate.status).toBe(400);
    });

    it('should not be able to authenticate purchase if not logged in', async () => {
      const authenticate = await session
        .post('/success/auth')
        .send({ session_id: 'abc' });
      expect(authenticate.body.user).toBe(false);
      expect(authenticate.status).toBe(401);
    });
  });
});
