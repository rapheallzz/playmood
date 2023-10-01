const express = require('express');
const router = express.Router()
const {getInterview,
    postInterview,
    updateInterview,
    deleteInterview,
  } = require('../controllers/interviewController')

  router.route('/').get(getInterview).post(postInterview)
  router.route('/:id').put(updateInterview).delete(deleteInterview)


module.exports = router