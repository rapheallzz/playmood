const express = require('express');
const router = express.Router()
const {getDocumentaries,
    postDocumentaries,
    updateDocumentaries,
    deleteDocumentaries,
  } = require('../controllers/documentariesController')

  router.route('/').get(getDocumentaries).post(postDocumentaries)
  router.route('/:id').put(updateDocumentaries).delete(deleteDocumentaries)


module.exports = router