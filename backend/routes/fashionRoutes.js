const express = require('express');
const router = express.Router()
const {getFashion,
    postFashion,
    updateFashion,
    deleteFashion,
  } = require('../controllers/fashionController')

  router.route('/').get(getFashion).post(postFashion)
  router.route('/:id').put(updateFashion).delete(deleteFashion)


module.exports = router