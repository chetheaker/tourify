require('dotenv').config();

// IMPORTS
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const router = require('./router');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const initialisePassport = require('./passport-config');

const PORT = process.env.PORT;
const HOST = process.env.HOST;

// Initialise server
const app = express();

// MIDDLEWARE
app.use(
  cors({
    origin: process.env.ORIGIN || 'http://localhost:3000',
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    proxy: true,
    cookie: {
      secure: true,
      httpOnly: false,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 48
    }
  })
);

app.use(cookieParser(process.env.SESSION_SECRET));
app.use(passport.initialize());
app.use(passport.session());
initialisePassport(passport);

app.use(router);

// SERVER LISTENING
app.listen(PORT, console.log(`Server running at http://${HOST}:${PORT}`));
