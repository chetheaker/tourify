"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
// IMPORTS
var express = require("express");
var cors = require('cors');
var session = require('express-session');
var userRouter = require('./routes/user.router');
var tripsRouter = require('./routes/trips.router');
var paymentsRouter = require('./routes/payments.router');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var initialisePassport = require('./../passport-config');
var PORT = process.env.PORT;
var HOST = process.env.HOST;
// Initialise server
var app = express();
// MIDDLEWARE
app.use(cors({
    origin: process.env.ORIGIN || 'http://localhost:3001',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
    // proxy: true,
    // cookie: {
    //   secure: false,
    //   httpOnly: false,
    //   sameSite: 'none',
    //   maxAge: 1000 * 60 * 60 * 48
    // }
}));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(passport.initialize());
app.use(passport.session());
initialisePassport(passport);
app.use(userRouter);
app.use(tripsRouter);
app.use(paymentsRouter);
// SERVER LISTENING
app.listen(PORT, function () { return console.log("Server running at http://".concat(HOST, ":").concat(PORT)); });
module.exports = app;
