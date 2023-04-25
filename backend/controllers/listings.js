// require the model
const listings = require('../models/listings');
const Joi = require('joi');  //Load the module which is a class

// async method that uses the functions in the model.
const getListings = async (req, res) => {
  const response = await listings.findAll();
  if (response) {
    res.send(response);
  }
};

const getListingById = async (req, res) => {
  const id = parseInt(req.params.id);
  const response = await listings.findById(id);
  if (response.length === 1) {
    res.send(response[0]);
  }else{
    res.status(404).send({message:'Not Found'});
  }
};

const createListing = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    price: Joi.number().precision(2).min(0).required(),
    description: Joi.string().min(2).required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    //Sending back the error details
    res.status(400).send(error.details[0].message);
    return;
  }

  const listing = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    userId: req.userData.userId
  };

  const response = await listings.save(listing);
  if (response) {
    listing.id = response.insertId;
    res.send(listing);
  }
};

const updateListing = async (req, res) => {
  console.log("kissa");
  const schema = Joi.object({
    id: Joi.number(),
    name: Joi.string().min(2).required(),
    price: Joi.number().precision(2).greater(0).required(),
    description: Joi.string().min(2).required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    //Sending back the error details
    res.status(400).send(error.details[0].message);
    return;
  }

  const listing = {
    id: req.body.id,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description
  };
  const response = await listings.updateById(listing);
  if (response) {
    res.send(listing);
  }
};

const deleteListing = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const response = await listings.deleteById(id);
  if (response) {
    res.status(200).send({message:'Listing deleted'});
  }
};

const getListingsByUserId = async (req, res) => {
  const userId = req.userData.userId;
  const response = await listings.findByUserId(userId);
  console.log(response);
  if (response) {
    res.send(response);
  }
};

// export named functions
module.exports = {
  createListing,
  deleteListing,
  getListings,
  getListingById,
  updateListing,
  getListingsByUserId
};