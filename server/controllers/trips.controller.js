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
    if (req.user) {
      const trips = await tripsModel.getAllTrips();
      res.send(trips);
    } else {
      res.send({ user: false });
    }
  } catch (e) {
    console.log("error getting users' trips", e);
  }
};

const getFriendTrips = async (req, res) => {
  try {
    if (req.user) {
      const trips = await tripsModel.getFriendTrips(req.user.email);
      res.send(trips);
    } else {
      res.send({ user: false });
    }
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
      else res.send(trip);
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
        checklists: [],
        attendees: []
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

const updateTripItinerary = async (req, res) => {
  try {
    if (req.user) {
      const id = req.params.id;
      const itinerary = req.body.itinerary;
      const updated = await tripsModel.updateItinerary(id, itinerary);
      res.send(updated);
    } else {
      res.send({ user: false });
    }
  } catch (e) {
    console.log('Error updateTripItinerary in controller', e);
  }
};

const deleteTrip = async (req, res) => {
  try {
    if (req.user) {
      const id = req.params.id;
      const deleted = await tripsModel.deleteOne(id);
      res.send(deleted);
    } else {
      res.send({ user: false });
    }
  } catch (e) {
    console.log('Error deleteTrip in controller', e);
  }
};

const getTripUser = async (req, res) => {
  try {
    if (req.user) {
      const { id } = req.params;
      const user = await tripsModel.getTripUser(id);
      res.send(user);
    } else {
      res.send({ user: false });
    }
  } catch (e) {
    console.log('Error in getTripUser controller', e);
  }
};

const inviteUser = async (req, res) => {
  try {
    if (req.user) {
      const { id, email } = req.params;
      const result = await tripsModel.inviteUser(id, email);
      res.send(result);
    } else {
      res.send({ user: false });
    }
  } catch (e) {
    console.log('Error inviting user', e);
  }
};

const acceptInvite = async (req, res) => {
  try {
    if (req.user) {
      const { id } = req.params;
      const { email } = req.user;
      const accepted = await tripsModel.acceptInvite(id, email);
      res.send(accepted);
    } else {
      res.send({ user: false });
    }
  } catch (e) {
    console.log('error accepting invite', e);
  }
};

const declineInvite = async (req, res) => {
  try {
    if (req.user) {
      const { id } = req.params;
      const { email } = req.user;
      const declined = await tripsModel.declineInvite(id, email);
      res.send(declined);
    } else {
      res.send({ user: false });
    }
  } catch (e) {
    console.log('error declining invite', e);
  }
};

module.exports = {
  getUserTrips,
  getExploreTrips,
  getUserTrip,
  createTrip,
  updateTripName,
  updateTripRoute,
  updateTripItinerary,
  deleteTrip,
  getTripUser,
  inviteUser,
  acceptInvite,
  declineInvite,
  getFriendTrips
};
