const client = require('./db');
const usersModel = require('./users.model');

const trips = client.db('tourify').collection('trips');
const users = client.db('tourify').collection('users');

import { Itinerary, Stop, Trip } from "../types/types";
const { ObjectId } = require('mongodb');

const findTripsByEmail = async (email: string) => {
  return await trips.find({ user: email }).toArray();
};

const postTrip = async (trip: Trip) => {
  return await trips.insertOne(trip);
};

const findTripById = async (id: string) => {
  try {
    const trip = await trips.findOne({ _id: ObjectId(id) });
    return trip;
  } catch (e) {
    console.log('error findTripById', e);
  }
};

const updateName = (id: string, name: string) => {
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

const updateRoute = (id: string, route: Stop[]) => {
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

const updateItinerary = async (id: string, itinerary: Itinerary) => {
  const update = await trips.updateOne(
    { _id: ObjectId(id) },
    { $set: { itinerary: itinerary } }
  );
  return update;
};

const deleteOne = async (id: string) => {
  const deleted = await trips.deleteOne({ _id: ObjectId(id) });
  return deleted;
};

const getAllTrips = async () => {
  const exploreTrips = await trips.find({}).toArray();
  return exploreTrips;
};

const getTripUser = async (id: string) => {
  const trip = await trips.findOne({ _id: ObjectId(id) });
  const email = trip.user;
  const user = await users.findOne({ email: email });
  return user;
};

const inviteUser = async (id: string, email: string) => {
  const trip = await trips.findOne({ _id: ObjectId(id) });
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

const acceptInvite = async (id: string, email: string) => {
  // remove notif
  await usersModel.removeNotification(id, email);

  // add invitee to atendees arr
  const updateTrip = await trips.updateOne(
    { _id: ObjectId(id) },
    { $push: { attendees: email } }
  );
  return updateTrip;
};

const declineInvite = async (id: string, email: string) => {
  const removedNotif = await usersModel.removeNotification(id, email);
  return removedNotif;
};

const getFriendTrips = async (email: string) => {
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
