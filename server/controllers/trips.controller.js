const tripsModel = require('../models/trips.model');

const getUserTrips = async (req, res) => {
  try {
    if (req.user) {
      console.log('user to get trips', req.user);
      res.send({ trips: [] });
    } else {
      res.send({ user: false });
    }
  } catch (e) {
    console.log("error getting users' trips", e);
  }
};

const getExploreTrips = async (req, res) => {
  try {
    res.send('explore trips');
  } catch (e) {
    console.log("error getting users' trips", e);
  }
};

const getTrip = async (req, res) => {
  try {
    if (req.user) {
      res.send('user trip');
    } else {
      res.send({ user: false });
    }
  } catch (e) {
    console.log('error getting trip', e);
  }
};

const createTrip = (req, res) => {
  try {
    if (req.user) {
      res.send('trip created');
    } else {
      res.send({ user: false });
    }
  } catch (e) {
    console.log('error getting trip', e);
  }
};

const updateTrip = async (req, res) => {
  try {
    if (req.user) {
      res.send('trip updated');
    } else {
      res.send({ user: false });
    }
  } catch (e) {
    console.log('error getting trip', e);
  }
};

module.exports = {
  getUserTrips,
  getExploreTrips,
  getTrip,
  createTrip,
  updateTrip
};
