const express = require('express');
const router = express.Router();

const { loginUser, signUpUser, getOwner } = require('../controllers/users');

router.post('/signup', signUpUser);
router.post('/login', loginUser);
router.get('/getowner/:id', getOwner)

module.exports = router;