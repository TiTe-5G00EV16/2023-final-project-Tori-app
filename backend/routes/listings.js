const express = require('express');
const {
  createListing, getListings, getListingById, updateListing, deleteListing, getListingsByUserId
} = require('../controllers/listings');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

router.get('/', getListings);
router.get('/:id', getListingById);

router.use(verifyToken);

// Authenticated routes
router.post('/', createListing);
router.post('/edit', updateListing);
router.delete('/:id', deleteListing);
router.get('/userlistings/:id', getListingsByUserId);

module.exports = router;