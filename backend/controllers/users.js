const { v4 } = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const users = require('../models/users');

const signUpUser = async (req, res) => {
  const { name, email, password } = req.body;

  let hashedPassword;
  try {
    // Parameters, the string to hash, salt length to generate or salt to use
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return res.status(500).send('Could not create user, try again');
  }

  const newUser = {
    id: v4(),
    name,
    email,
    password: hashedPassword
  }

  try {
    const exist = await users.findByEmail(email);
    if (exist.length > 0) {
      return res.status(422).send('Could not create user, user exist');
    }

    const result = await users.create(newUser);
    if (!result) {
      return res.status(500).send('Something went wrong creating the user');
    }

    const token = jwt.sign(
      {
        id: newUser.id, // payload, anything that make sense and
        email: newUser.email // what you might need on the frontend
      },
      process.env.JWT_KEY, // secret key
      { expiresIn: '1h' } // options like an experation time
    );

    res.status(201).json({
      id: newUser.id,
      email: newUser.email,
      token: token
    });

  } catch (err) {
    console.log(err);
    return res.status(500).send('Signup failed, please try again');
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body
  let identifiedUser;
  try {
    const result = await users.findByEmail(email);
    if (!result[0]) {
      return res.status(401).send('Could not identify user, credetials might be wrong');
    }

    identifiedUser = result[0];
  } catch (err) {
    console.log(err);
    return res.status(500).send('Something went wrong with login in the user');
  }
  console.log(identifiedUser);
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, identifiedUser.password);
  } catch (err) {
    console.log(err);
    return res.status(500).send('Could not log you in , check your credetials');
  }
  if (!isValidPassword) {
    return es.status(401).send('Could not identify user, credetials might be wrong');
  }
  let token
  try {
    token = jwt.sign(
      {
        id: identifiedUser.id, // payload, anything that make sense and
        email: identifiedUser.email // what you might need on the frontend
      },
      process.env.JWT_KEY, // secret key
      { expiresIn: '1h' } // options like an experation time
    )
  } catch (err) {
    console.log(err);
    return res.status(500).send('Something went wrong with login in the user');
  }
  res.status(201).json({
    id: identifiedUser.id,
    email: identifiedUser.email,
    token: token
  })
};

module.exports = {
  signUpUser,
  loginUser
};