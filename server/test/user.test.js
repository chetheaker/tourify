const app = require('../dist/server.js');
const supertest = require('supertest');
const request = supertest(app);
let session = supertest.agent(app);
const mocks = require('./mocks.js');
const client = require('../dist/models/db.js');

jest.setTimeout(3000);

describe('User endpoints', () => {
  beforeEach(async () => {
    session = supertest.agent(app);
  });
  afterEach(async () => {
    await client.db('tourify').collection('users').deleteMany({});
  });

  describe('register', () => {
    it('should create a new user', async () => {
      const user = mocks.user;
      const register = await request.post('/register').send(user);
      expect(register.status).toEqual(201);
      expect(register.body.acknowledged).toEqual(true);
    });

    it('should not register user if it already exists', async () => {
      const user = mocks.user;
      const register = await request.post('/register').send(user);
      const reRegister = await request.post('/register').send(user);
      expect(reRegister.status).toEqual(400);
      expect(JSON.parse(reRegister.text).existingEmail).toEqual(true);
    });
  });

  describe('login', () => {
    it('should login user', async () => {
      const user = mocks.user;
      const register = await session.post('/register').send(user);
      const registeredUser = await client
        .db('tourify')
        .collection('users')
        .findOne({ email: user.email });

      const login = await session
        .post('/login')
        .send({ email: user.email, password: user.password });
      expect(login.body.email).toEqual(registeredUser.email);
      expect(login.body.password).toEqual(registeredUser.password);
    });

    it('should not login user if email is not registered', async () => {
      const user = mocks.user;
      const login = await session
        .post('/login')
        .send({ email: user.email, password: user.password });
      expect(login.status).toEqual(401);
      expect(login.body.user).toEqual(false);
    });
  });

  describe('logout', () => {
    it('should logout user', async () => {
      const user = mocks.user;
      const register = await request.post('/register').send(user);
      const login = await session
        .post('/login')
        .send({ email: user.email, password: user.password });
      const logout = await session.post('/logout');
      expect(logout.status).toEqual(205);
      expect(logout.body).toEqual('');
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      const user = mocks.user;
      const register = await request.post('/register').send(user);
      const login = await session
        .post('/login')
        .send({ email: user.email, password: user.password });
      const deleteUser = await session.delete('/user');
      expect(deleteUser.status).toEqual(200);
      expect(deleteUser.body.acknowledged).toEqual(true);
      expect(deleteUser.body.deletedCount).toEqual(1);
    });

    it('should not delete a user if not logged in', async () => {
      const user = mocks.user;
      const register = await request.post('/register').send(user);
      const deleteUser = await session.delete('/user');
      expect(deleteUser.status).toEqual(404);
      expect(deleteUser.body.user).toEqual(false);
    });
  });

  describe('get user', () => {
    it('should get user if logged in', async () => {
      const user = mocks.user;
      const register = await request.post('/register').send(user);
      const registeredUser = await client
        .db('tourify')
        .collection('users')
        .findOne({ email: user.email });

      const login = await session
        .post('/login')
        .send({ email: user.email, password: user.password });
      const getUser = await session.get('/user');
      expect(getUser.status).toEqual(200);
      expect(getUser.body.email).toEqual(registeredUser.email);
      expect(getUser.body.password).toEqual(registeredUser.password);
    });

    it('should not get user if not logged in', async () => {
      const user = mocks.user;
      const register = await request.post('/register').send(user);
      const getUser = await session.get('/user');
      expect(getUser.status).toEqual(404);
      expect(getUser.body.id).toEqual(false);
    });
  });

  describe('get user by email', () => {
    it('should get user by email if logged in', async () => {
      const user = mocks.user;
      const register = await request.post('/register').send(user);
      const registeredUser = await client
        .db('tourify')
        .collection('users')
        .findOne({ email: user.email });

      const login = await session
        .post('/login')
        .send({ email: user.email, password: user.password });
      const getUserByEmail = await session.get(`/user/${user.email}`);
      expect(getUserByEmail.status).toEqual(200);
      expect(getUserByEmail.body.email).toEqual(registeredUser.email);
      expect(getUserByEmail.body.password).toEqual(registeredUser.password);
    });
    it('should not get user by email if not logged in', async () => {
      const user = mocks.user;
      const register = await request.post('/register').send(user);
      const getUserByEmail = await session.get(`/user/${user.email}`);
      expect(getUserByEmail.status).toEqual(404);
      expect(getUserByEmail.body.user).toEqual(false);
    });
  });
});
