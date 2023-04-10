
const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// the app get method will respond to GET requests
// the method takes two arguments, the route to listen respond to 
// callback function with two arguments, the request and the response
// callback function is also called the route handler

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World!' });
});

// Call the app listen method and give the port as first arguments
// There is callsback which called when app starts listening
app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});

app.get('/api/listings', (req, res) => {
    res.send(['Phone', 'Shoes', 'speakers']);
});

app.get('/api/listings/:id', (req, res) => {
  res.send(req.query);
});

