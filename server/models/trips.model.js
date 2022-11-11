const client = require('./db');

const trips = client.db('tourify').collection('trips');

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

module.exports = { postTrip, findTripsByEmail, findTripById, updateName };
