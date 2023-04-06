const listings = require('./listings');

// create an async function that we can call when the app starts
const getListings = async () => {
  // use try catch to handle the resolve or rejected state of the promise
  try {
    const response = await listings.findAll();
    if (response) {
      console.log(response);
    }
  } catch (e) {
    console.log(e);
  }
};

// create an async function that we can call when the app stops
const closeConnection = async () => {
  try {
    const response = await listings.close();
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

const addListing = async () => {
    let listing = {
        'name':'Pants',
        'price':'10e'
    };
    try {
        const response = await listings.create(listing);
        if (response) {
            console.log(response);
        }
    } catch (e) {
        console.log(e);
      }
};

// Call the async functions
getListings();
addListing();
closeConnection();
