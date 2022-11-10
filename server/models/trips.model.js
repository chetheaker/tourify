const client = require('./db');

const trips = client.db('tourify').collection('trips');

const findTripsByUser = async (userid) => {
  return await trips.find({ userid: userid }).toArray();
};

const postTrip = async (trip) => {
  return await trips.insertOne(trip);
};

module.exports = { postTrip, findTripsByUser };
