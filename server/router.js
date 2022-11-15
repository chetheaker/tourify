const express = require('express');
const usersController = require('./controllers/users.controller');
const tripsController = require('./controllers/trips.controller');
const paymentsController = require('./controllers/payments.controller');

const router = express.Router();

// USER ROUTES
router.get('/user', usersController.get);
router.get('/user/:email', usersController.getUserByEmail);
router.post('/login', usersController.login);
router.post('/register', usersController.register);
router.post('/logout', usersController.logout);
router.delete('/user', usersController.deleteUser);

// TRIP ROUTES
router.get('/trips/user', tripsController.getUserTrips);
router.get('/get-user/:id', tripsController.getTripUser);
router.get('/trips/explore', tripsController.getExploreTrips);
router.get('/trips/friends', tripsController.getFriendTrips);
router.get('/trips/:id', tripsController.getUserTrip);
router.post('/trips/create', tripsController.createTrip);
router.put('/trips/:id/name', tripsController.updateTripName);
router.put('/trips/:id/route', tripsController.updateTripRoute);
router.put('/trips/:id/itinerary', tripsController.updateTripItinerary);
router.delete('/trips/:id/delete', tripsController.deleteTrip);

// INVITES
router.post('/trips/:id/invite/:email', tripsController.inviteUser);
router.put('/trips/:id/accept', tripsController.acceptInvite);
router.put('/trips/:id/decline', tripsController.declineInvite);

// PAYMENTS
router.post('/checkout', paymentsController.checkout);
router.post('/success/auth', paymentsController.authenticatePurchase);

module.exports = router;
