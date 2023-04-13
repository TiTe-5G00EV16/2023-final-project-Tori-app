const express = require('express');

const listingsRouter = require('./routes/listings');
const users = require('./routes/users');

const app = express();

app.use(express.json());
app.use('/api/listings', listingsRouter);
app.use('/api/users', users);

module.exports = app;