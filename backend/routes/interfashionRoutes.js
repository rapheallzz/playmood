const express = require('express');
const router = express.Router()
const {getInterfashion,
    postInterfashion,
    updateInterfashion,
    deleteInterfashion,
  } = require('../controllers/interfashionController')

  router.route('/').get(getInterfashion).post(postInterfashion)
  router.route('/:id').put(updateInterfashion).delete(deleteInterfashion)


module.exports = router