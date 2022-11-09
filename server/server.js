require('dotenv').config();

// IMPORTS
const express = require('express');
const cors = require('cors');
const router = require('./router');

const PORT = process.env.PORT;
const HOST = process.env.HOST;

// Initialise server
const app = express();

// MIDDLEWARE
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

// SERVER LISTENING
app.listen(PORT, console.log(`Server running at http://${HOST}:${PORT}`));
