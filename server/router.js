const express = require('express');
const usersController = require('./controllers/users.controller');
const tripsController = require('./controllers/trips.controller');

const router = express.Router();

// USER ROUTES
router.get('/user', usersController.get);
router.post('/login', usersController.login);
router.post('/register', usersController.register);
router.post('/logout', usersController.logout);
// router.delete('/user', usersController.deleteUser); ==> not made yet

// TRIP ROUTES
router.get('/trips/user', tripsController.getUserTrips);
router.get('/trips/explore', tripsController.getExploreTrips);
router.get('/trips/:id', tripsController.getUserTrip);
router.post('/trips/create', tripsController.createTrip);
router.put('/trips/:id/name', tripsController.updateTripName);
router.put('/trips/:id/route', tripsController.updateTripRoute);
router.put('/trips/:id/itinerary', tripsController.updateTripItinerary);
router.delete('/trips/:id/delete', tripsController.deleteTrip);

module.exports = router;
