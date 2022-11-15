const client = require('./db');
const usersModel = require('./users.model');

const trips = client.db('tourify').collection('trips');
const users = client.db('tourify').collection('users');

const findTripsByEmail = async (email) => {
  return await trips.find({ user: email }).toArray();
};

const postTrip = async (trip) => {
  return await trips.insertOne(trip);
};

const findTripById = async (id) => {
  try {
    const trip = await trips.findOne({ _id: id });
    return trip;
  } catch (e) {
    console.log('error findTripById', e);
  }
};

const updateName = (id, name) => {
  try {
    const trip = trips.updateOne(
      {
        _id: id
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
    const update = trips.updateOne({ _id: id }, { $set: { stops: route } });
    return update;
  } catch (e) {
    console.log('Error updating route in model', e);
  }
};

const updateItinerary = async (id, itinerary) => {
  const update = await trips.updateOne(
    { _id: id },
    { $set: { itinerary: itinerary } }
  );
  return update;
};

const deleteOne = async (id) => {
  const deleted = await trips.deleteOne({ _id: id });
  return deleted;
};

const getAllTrips = async () => {
  const exploreTrips = await trips.find({}).toArray();
  return exploreTrips;
};

const getTripUser = async (id) => {
  const trip = await trips.findOne({ _id: id });
  console.log(id);
  console.log(trip);
  const email = trip.user;
  const user = await users.findOne({ email: email });
  return user;
};

const inviteUser = async (id, email) => {
  const trip = await trips.findOne({ _id: id });
  const inviter = await usersModel.findUserByEmail(trip.user);
  const notification = {
    trip: {
      name: trip.trip_name,
      id: trip._id,
      start: trip.start_date,
      end: trip.end_date
    },
    inviter: { firstName: inviter.first_name, lastName: inviter.last_name }
  };
  const updateInviteeNotifications = await users.updateOne(
    { email: email },
    { $push: { notifications: notification } }
  );
  return updateInviteeNotifications;
};

const acceptInvite = async (id, email) => {
  // remove notif
  await usersModel.removeNotification(id, email);

  // add invitee to atendees arr
  const updateTrip = await trips.updateOne(
    { _id: id },
    { $push: { attendees: email } }
  );
  return updateTrip;
};

const declineInvite = async (id, email) => {
  const removedNotif = await usersModel.removeNotification(id, email);
  return removedNotif;
};

const getFriendTrips = async (email) => {
  const friendTrips = await trips.find({ attendees: [email] }).toArray();
  return friendTrips;
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
  inviteUser,
  acceptInvite,
  declineInvite,
  getFriendTrips
};
