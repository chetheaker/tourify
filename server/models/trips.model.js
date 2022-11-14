const client = require('./db');
const usersModel = require('./users.model');

const trips = client.db('tourify').collection('trips');
const users = client.db('tourify').collection('users');

const { ObjectId } = require('mongodb');

const findTripsByEmail = async (email) => {
  return await trips.find({ user: email }).toArray();
};

const postTrip = async (trip) => {
  return await trips.insertOne(trip);
};

const findTripById = async (id) => {
  try {
    const trip = await trips.findOne({ _id: ObjectId(id) });
    return trip;
  } catch (e) {
    console.log('error findTripById', e);
  }
};

const updateName = (id, name) => {
  try {
    const trip = trips.updateOne(
      {
        _id: ObjectId(id)
      },
      { $set: { trip_name: name } }
    );
    return trip;
  } catch (e) {
    console.log('error updateName', e);
  }
};

const updateRoute = (id, route) => {
  try {
    const update = trips.updateOne(
      { _id: ObjectId(id) },
      { $set: { stops: route } }
    );
    return update;
  } catch (e) {
    console.log('Error updating route in model', e);
  }
};

const updateItinerary = async (id, itinerary) => {
  const update = await trips.updateOne(
    { _id: ObjectId(id) },
    { $set: { itinerary: itinerary } }
  );
  return update;
};

const deleteOne = async (id) => {
  const deleted = await trips.deleteOne({ _id: ObjectId(id) });
  return deleted;
};

const getAllTrips = async () => {
  const exploreTrips = await trips.find({}).toArray();
  return exploreTrips;
};

const getTripUser = async (id) => {
  const trip = await trips.findOne({ _id: ObjectId(id) });
  const email = trip.user;
  console.log('email', email);
  const user = await users.findOne({ email: email });
  console.log('user', user);
  return user;
};

const inviteUser = async (id, email) => {
  const trip = await trips.findOne({ _id: ObjectId(id) });
  const inviter = await usersModel.findUserByEmail(trip.user);
  if (!inviter) return { invitee: false };
  const notification = {
    trip: {
      name: trip.trip_name,
      id: trip._id,
      start: trip.start_date,
      end: trip.end_date
    },
    inviter: { firstName: inviter.first_name, lastName: inviter.last_name }
  };
  console.log('notification', notification);

  // const updateInviteeNotifications = await users.updateOne({ email: email }, { $push: {notifications: }})
};

module.exports = {
  postTrip,
  findTripsByEmail,
  findTripById,
  updateName,
  updateRoute,
  updateItinerary,
  deleteOne,
  getAllTrips,
  getTripUser,
  inviteUser
};
