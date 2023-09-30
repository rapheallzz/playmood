const express = require('express');
const router = express.Router()
const {getSocial,
    postSocial,
    updateSocial,
    deleteSocial,
  } = require('../controllers/socialController')

  router.route('/').get(getSocial).post(postSocial)
  router.route('/:id').put(updateSocial).delete(deleteSocial)


module.exports = router