const express = require('express');
const router = express.Router()
const {getTop,
    postTop,
    updateTop,
    deleteTop,
  } = require('../controllers/topController')

  router.route('/').get(getTop).post(postTop)
  router.route('/:id').put(updateTop).delete(deleteTop)


module.exports = router