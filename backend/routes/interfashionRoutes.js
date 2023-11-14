const express = require('express');
const router = express.Router();
const {
  getInterfashion,
  postInterfashion,
  updateInterfashion,
  deleteInterfashion,
} = require('../controllers/interfashionController');

// GET all and POST routes
router.route('/').get(getInterfashion).post(postInterfashion);

// PUT and DELETE routes
router.route('/:id').put(updateInterfashion).delete(deleteInterfashion);

module.exports = router;
