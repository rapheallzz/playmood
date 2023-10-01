const express = require('express');
const router = express.Router()
const {getFilm,
    postFilm,
    updateFilm,
    deleteFilm,
  } = require('../controllers/filmController')

  router.route('/').get(getFilm).post(postFilm)
  router.route('/:id').put(updateFilm).delete(deleteFilm)


module.exports = router