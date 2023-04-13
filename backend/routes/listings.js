const express = require('express');
const {
  createListing, getListings, getListingById, updateListing, deleteListing
} = require('../controllers/listings');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

router.get('/', getListings);
router.get('/:id', getListingById);

router.use(verifyToken);

// Authenticated routes
router.post('/', createListing);
router.put('/', updateListing);
router.delete('/:id', deleteListing);

module.exports = router;