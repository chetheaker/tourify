const tripsModel = require('../models/trips.model');

const getUserTrips = async (req, res) => {
  try {
    if (req.user) {
      const trips = await tripsModel.findTripsByEmail(req.user.email);
      res.send(trips);
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

const getUserTrip = async (req, res) => {
  try {
    if (req.user) {
      const id = req.params.id;
      const trip = await tripsModel.findTripById(id);
      if (trip === null) res.send({ _id: false });
      else if (trip.user === req.user.email) res.send(trip);
      else res.send({ user: false });
    } else {
      res.send({ user: false });
    }
  } catch (e) {
    console.log('error getting trip', e);
  }
};

const createTrip = async (req, res) => {
  try {
    if (req.user) {
      const trip = {
        ...req.body,
        user: req.user.email,
        itinerary: [],
        checklists: []
      };
      const result = await tripsModel.postTrip(trip);
      res.status(201);
      res.send(result);
    } else {
      res.send({ user: false });
    }
  } catch (e) {
    console.log('error getting trip', e);
  }
};

const updateTripName = async (req, res) => {
  try {
    if (req.user) {
      const id = req.params.id;
      const name = req.body.name;
      const updated = await tripsModel.updateName(id, name);
      res.send(updated);
    } else {
      res.send({ user: false });
    }
  } catch (e) {
    console.log('error getting trip', e);
  }
};

const updateTripRoute = async (req, res) => {
  try {
    if (req.user) {
      const id = req.params.id;
      const route = req.body.route;
      const updated = await tripsModel.updateRoute(id, route);
      res.send(updated);
    } else {
      res.send({ user: false });
    }
  } catch (e) {
    console.log('error updating trip route', e);
  }
};

module.exports = {
  getUserTrips,
  getExploreTrips,
  getUserTrip,
  createTrip,
  updateTripName,
  updateTripRoute
};
