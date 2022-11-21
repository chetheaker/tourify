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
async function authenticateFriend() {
  const user = mocks.friend;
  const register = await session.post('/register').send(user);
  const registeredUser = await client
    .db('tourify')
    .collection('users')
    .findOne({ email: user.email });

  const login = await session
    .post('/login')
    .send({ email: user.email, password: user.password });
}

jest.setTimeout(3000);
describe('Trips endpoints', () => {
  beforeEach(async () => {
    session = supertest.agent(app);
  });

  afterEach(async () => {
    await client.db('tourify').collection('trips').deleteMany({});
  });

  describe('create trip', () => {
    it('should create a trip', async () => {
      await authenticateUser();
      const createTrip = await session.post('/trips/create').send(mocks.trip);
      expect(createTrip.status).toBe(201);
      expect(createTrip.body.acknowledged).toBe(true);
      expect(createTrip.body.insertedId).toBeTruthy();
    });
    it('should not create a trip if not logged in', async () => {
      const trip = await request.post('/trips/create').send(mocks.trip);
      expect(trip.status).toBe(401);
      expect(trip.body.user).toBe(false);
    });
  });

  describe('get user trips', () => {
    it('should return user trips', async () => {
      await authenticateUser();
      const trip = await session.post('/trips/create').send(mocks.trip);
      const userTrips = await session.get('/trips/user');
      expect(userTrips.status).toBe(200);
      expect(userTrips.body.length).toBe(1);
      expect(userTrips.body[0].trip_name).toBe(mocks.trip.trip_name);
    });
    it('should not get user trips if not logged in', async () => {
      const userTrips = await request.get('/trips/user');
      expect(userTrips.status).toBe(401);
      expect(userTrips.body.user).toBe(false);
    });
  });

  describe('get trip user', () => {
    it('should return trip users', async () => {
      await authenticateUser();
      const trip = await session.post('/trips/create').send(mocks.trip);
      const tripUsers = await session.get(`/get-user/${trip.body.insertedId}`);
      expect(tripUsers.status).toBe(200);
      expect(tripUsers.body.email).toBe(mocks.user.email);
    });
    it('should not get trip users if not logged in', async () => {
      const tripUsers = await session.get(`/get-user/123`);
      expect(tripUsers.status).toBe(401);
      expect(tripUsers.body.user).toBe(false);
    });
  });

  describe('get explore trips', () => {
    it('should return explore trips', async () => {
      await authenticateUser();
      const trip = await session.post('/trips/create').send(mocks.trip);
      const exploreTrips = await session.get('/trips/explore');
      expect(exploreTrips.status).toBe(200);
      expect(exploreTrips.body.length).toBe(1);
      expect(exploreTrips.body[0].trip_name).toBe(mocks.trip.trip_name);
    });
    it('should not get explore trips if not logged in', async () => {
      const exploreTrips = await request.get('/trips/explore');
      expect(exploreTrips.status).toBe(401);
      expect(exploreTrips.body.user).toBe(false);
    });
  });

  describe('invite user to trip', () => {
    it('should invite user to trip', async () => {
      await authenticateUser();
      const trip = await session.post('/trips/create').send(mocks.trip);
      const inviteUser = await session.post(
        `/trips/${trip.body.insertedId}/invite/${mocks.friend.email}`
      );
      expect(inviteUser.status).toBe(200);
      expect(inviteUser.body.acknowledged).toBe(true);
    });
    it('should not invite user to trip if not logged in', async () => {
      const inviteUser = await request.post(`/trips/123/invite/a@gmail.com`);
      expect(inviteUser.status).toBe(401);
      expect(inviteUser.body.user).toBe(false);
    });
  });

  describe('accept trip invitation', () => {
    it('should accept trip invitation', async () => {
      await authenticateUser();
      const trip = await session.post('/trips/create').send(mocks.trip);
      const inviteUser = await session.post(
        `/trips/${trip.body.insertedId}/invite/${mocks.friend.email}`
      );

      session = supertest.agent(app);
      await authenticateFriend();
      const acceptInvitation = await session.put(
        `/trips/${trip.body.insertedId}/accept`
      );
      expect(acceptInvitation.status).toBe(200);
      expect(acceptInvitation.body.acknowledged).toBe(true);
    });

    it('should not accept trip invitation if not logged in', async () => {
      const acceptInvitation = await request.put(`/trips/123/accept`);
      expect(acceptInvitation.status).toBe(401);
      expect(acceptInvitation.body.user).toBe(false);
    });
  });

  describe('decline trip invitation', () => {
    it('should decline trip invitation', async () => {
      await authenticateUser();
      const trip = await session.post('/trips/create').send(mocks.trip);
      const inviteUser = await session.post(
        `/trips/${trip.body.insertedId}/invite/${mocks.friend.email}`
      );

      session = supertest.agent(app);
      await authenticateFriend();
      const declineInvitation = await session.put(
        `/trips/${trip.body.insertedId}/decline`
      );
      expect(declineInvitation.status).toBe(200);
      expect(declineInvitation.body.acknowledged).toBe(true);
    });

    it('should not decline trip invitation if not logged in', async () => {
      const declineInvitation = await request.put(`/trips/123/decline`);
      expect(declineInvitation.status).toBe(401);
      expect(declineInvitation.body.user).toBe(false);
    });
  });
  describe('get friend trips', () => {
    it('should return friend trips', async () => {
      await authenticateUser();
      const trip = await session.post('/trips/create').send(mocks.trip);
      const inviteUser = await session.post(
        `/trips/${trip.body.insertedId}/invite/${mocks.friend.email}`
      );

      session = supertest.agent(app);
      await authenticateFriend();
      const acceptInvitation = await session.put(
        `/trips/${trip.body.insertedId}/accept`
      );

      const friendTrips = await session.get('/trips/friends');
      expect(friendTrips.status).toBe(200);
      expect(friendTrips.body.length).toBe(1);
      expect(friendTrips.body[0].attendees[0]).toBe(mocks.friend.email);
      expect(friendTrips.body[0].trip_name).toBe(mocks.trip.trip_name);
    });

    it('should not get friend trips if not logged in', async () => {
      const friendTrips = await request.get('/trips/friends');
      expect(friendTrips.status).toBe(401);
      expect(friendTrips.body.user).toBe(false);
    });
  });

  describe('get user trip', () => {
    it('should return user trip', async () => {
      await authenticateUser();
      const trip = await session.post('/trips/create').send(mocks.trip);
      const userTrip = await session.get(`/trips/${trip.body.insertedId}`);

      expect(userTrip.status).toBe(200);
      expect(userTrip.body.trip_name).toBe(mocks.trip.trip_name);
      expect(userTrip.body._id).toBe(trip.body.insertedId);
    });

    it('should return 404 if trip does not exist', async () => {
      await authenticateUser();
      const userTrip = await session.get(`/trips/123`);
      expect(userTrip.status).toBe(404);
      expect(userTrip.body._id).toBe(false);
    });

    it('should not get user trip if not logged in', async () => {
      const userTrip = await request.get('/trips/123');
      expect(userTrip.status).toBe(401);
      expect(userTrip.body.user).toBe(false);
    });
  });

  describe('update trip name', () => {
    it('should update trip name', async () => {
      await authenticateUser();
      const trip = await session.post('/trips/create').send(mocks.trip);
      const updateTrip = await session
        .put(`/trips/${trip.body.insertedId}/name`)
        .send({ name: 'new name' });

      expect(updateTrip.status).toBe(200);
      const changedNameTrip = await session.get(
        `/trips/${trip.body.insertedId}`
      );
      expect(changedNameTrip.status).toBe(200);
      expect(changedNameTrip.body.trip_name).toBe('new name');
    });

    it('should not update trip name if not logged in', async () => {
      const updateTrip = await request.put(`/trips/123/name`);
      expect(updateTrip.status).toBe(401);
      expect(updateTrip.body.user).toBe(false);
    });
  });

  describe('update trip route', () => {
    it('should update trip route', async () => {
      await authenticateUser();
      const trip = await session.post('/trips/create').send(mocks.trip);
      const updateTrip = await session
        .put(`/trips/${trip.body.insertedId}/route`)
        .send({ route: mocks.newRoute });
      expect(updateTrip.status).toBe(200);

      const changedRouteTrip = await session.get(
        `/trips/${trip.body.insertedId}`
      );
      expect(changedRouteTrip.status).toBe(200);
      expect(changedRouteTrip.body.stops).toStrictEqual(mocks.newRoute);
    });
    it('should not update trip route if not logged in', async () => {
      const updateTrip = await request.put(`/trips/123/route`);
      expect(updateTrip.status).toBe(401);
      expect(updateTrip.body.user).toBe(false);
    });
  });

  describe('update trip itinerary', () => {
    it('should update trip itinerary', async () => {
      await authenticateUser();
      const trip = await session.post('/trips/create').send(mocks.trip);
      const updateTrip = await session
        .put(`/trips/${trip.body.insertedId}/itinerary`)
        .send({ itinerary: mocks.newItinerary });
      expect(updateTrip.status).toBe(200);

      const changedItineraryTrip = await session.get(
        `/trips/${trip.body.insertedId}`
      );
      expect(changedItineraryTrip.status).toBe(200);
      expect(changedItineraryTrip.body.itinerary).toStrictEqual(
        mocks.newItinerary
      );
    });

    it('should not update trip itinerary if not logged in', async () => {
      const updateTrip = await request.put(`/trips/123/itinerary`);
      expect(updateTrip.status).toBe(401);
      expect(updateTrip.body.user).toBe(false);
    });
  });

  describe('delete trip', () => {
    it('should delete trip', async () => {
      await authenticateUser();
      const trip = await session.post('/trips/create').send(mocks.trip);
      const deleteTrip = await session.delete(
        `/trips/${trip.body.insertedId}/delete`
      );
      expect(deleteTrip.status).toBe(204);
      const deletedTrip = await session.get(`/trips/${trip.body.insertedId}`);
      expect(deletedTrip.status).toBe(404);
    });

    it('should not delete trip if not logged in', async () => {
      const deleteTrip = await request.delete(`/trips/123/delete`);
      expect(deleteTrip.status).toBe(401);
      expect(deleteTrip.body.user).toBe(false);
    });
  });
});
