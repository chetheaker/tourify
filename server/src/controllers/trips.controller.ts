import { Request, Response } from "express";
import { MyRequest } from "../types/types";
// Require google from googleapis package.
const { google } = require('googleapis')
// Require oAuth2 from our google instance.
const { OAuth2 } = google.auth

const tripsModel = require('../models/trips.model');

const getUserTrips = async (req: MyRequest, res: Response) => {
  try {
    if (req.user) {
      const trips = await tripsModel.findTripsByEmail(req.user.email);
      res.status(200).send(trips);
    } else {
      res.status(401).send({ user: false });
    }
  } catch (e) {
    console.warn("error getting users' trips", e);
    res.status(500).send({status:500})
  }
};

const getExploreTrips = async (req: Request, res: Response) => {
  try {
    if (req.user) {
      const trips = await tripsModel.getAllTrips();
      res.status(200).send(trips);
    } else {
      res.status(401).send({ user: false });
    }
  } catch (e) {
    console.warn("error getting users' trips", e);
    res.status(500).send({status:500})
  }
};

const getFriendTrips = async (req: MyRequest, res: Response) => {
  try {
    if (req.user) {
      const trips = await tripsModel.getFriendTrips(req.user.email);
      res.status(200).send(trips);
    } else {
      res.status(401).send({ user: false });
    }
  } catch (e) {
    console.warn("error getting users' trips", e);
    res.status(500).send({status:500})
  }
};

const getUserTrip = async (req: Request, res: Response) => {
  try {
    if (req.user) {
      const id = req.params.id;
      const trip = await tripsModel.findTripById(id);
      if (!trip) res.status(404).send({ _id: false });
      else res.status(200).send(trip);
    } else {
      res.status(401).send({ user: false });
    }
  } catch (e) {
    console.warn('error getting trip', e);
    res.status(500).send({status:500})
  }
};

const createTrip = async (req: MyRequest, res: Response) => {
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
      res.status(401).send({ user: false });
    }
  } catch (e) {
    console.warn('error getting trip', e);
    res.status(500).send({status:500})
  }
};

const updateTripName = async (req: Request, res: Response) => {
  try {
    if (req.user) {
      const id = req.params.id;
      const name = req.body.name;
      const updated = await tripsModel.updateName(id, name);
      res.status(200).send(updated);
    } else {
      res.status(401).send({ user: false });
    }
  } catch (e) {
    console.warn('error getting trip', e);
    res.status(500).send({status:500})
  }
};

const updateTripRoute = async (req: Request, res: Response) => {
  try {
    if (req.user) {
      const id = req.params.id;
      const route = req.body.route;
      const updated = await tripsModel.updateRoute(id, route);
      res.status(200).send(updated);
    } else {
      res.status(401).send({ user: false });
    }
  } catch (e) {
    console.warn('error updating trip route', e);
    res.status(500).send({status:500})
  }
};

const updateTripItinerary = async (req: Request, res: Response) => {
  try {
    if (req.user) {
      const id = req.params.id;
      const itinerary = req.body.itinerary;
      const updated = await tripsModel.updateItinerary(id, itinerary);
      res.status(200).send(updated);
    } else {
      res.status(401).send({ user: false });
    }
  } catch (e) {
    console.warn('Error updateTripItinerary in controller', e);
    res.status(500).send({status:500})
  }
};

const deleteTrip = async (req: Request, res: Response) => {
  try {
    if (req.user) {
      const id = req.params.id;
      const deleted = await tripsModel.deleteOne(id);
      res.status(204).send(deleted);
    } else {
      res.status(401).send({ user: false });
    }
  } catch (e) {
    console.warn('Error deleteTrip in controller', e);
    res.status(500).send({status:500})
  }
};

const getTripUser = async (req: Request, res: Response) => {
  try {
    if (req.user) {
      const { id } = req.params;
      const user = await tripsModel.getTripUser(id);
      res.status(200).send(user);
    } else {
      res.status(401).send({ user: false });
    }
  } catch (e) {
    console.warn('Error in getTripUser controller', e);
    res.status(500).send({status:500})
  }
};

const inviteUser = async (req: Request, res: Response) => {
  try {
    if (req.user) {
      const { id, email } = req.params;
      const result = await tripsModel.inviteUser(id, email);
      res.status(200).send(result);
    } else {
      res.status(401).send({ user: false });
    }
  } catch (e) {
    console.warn('Error inviting user', e);
    res.status(500).send({status:500})
  }
};

const acceptInvite = async (req: MyRequest, res: Response) => {
  try {
    if (req.user) {
      const { id } = req.params;
      const { email } = req.user;
      const accepted = await tripsModel.acceptInvite(id, email);
      res.status(200).send(accepted);
    } else {
      res.status(401).send({ user: false });
    }
  } catch (e) {
    console.warn('error accepting invite', e);
    res.status(500).send({status:500})
  }
};

const declineInvite = async (req: MyRequest, res: Response) => {
  try {
    if (req.user) {
      const { id } = req.params;
      const { email } = req.user;
      const declined = await tripsModel.declineInvite(id, email);
      res.status(200).send(declined);
    } else {
      res.status(401).send({ user: false });
    }
  } catch (e) {
    console.warn('error declining invite', e);
    res.status(500).send({status:500})
  }
};

const exportTrip = async (req: MyRequest, res: Response) => {
  if (!req.user) {
    res.status(401).send({ status: 401 });
    return;
  }
  try {
    const events = req.body.events;
    const access_token = req.body.access_token;
    const oAuth2Client = new OAuth2(
      process.env.CALENDAR_CLIENT_ID,
      process.env.CALENDAR_SECRET
    );
    
    oAuth2Client.setCredentials({ access_token });
    const calendar = google.calendar({ version: "v3", auth: oAuth2Client });
    events.forEach((event:Event) => {
      calendar.events.insert(
        {
          calendarId: "primary",
          resource: event
        }
      );
    });
    res.status(200).send({ status: 200 });
  } catch (e) {
    console.warn("error exporting trip", e);
    res.status(500).send({ status: 500 });
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
  getFriendTrips,
  exportTrip
};
