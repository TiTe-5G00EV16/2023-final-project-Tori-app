const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Call the app listen method and give the port as first arguments
// There is callsback which called when app starts listening
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});



