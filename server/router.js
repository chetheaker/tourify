const express = require('express');
const usersController = require('./controllers/users.controller');

const router = express.Router();

// USER ROUTES
router.get('/user', usersController.get);
router.post('/login', usersController.login);
router.post('/register', usersController.register);
router.post('/logout', usersController.logout);

module.exports = router;
