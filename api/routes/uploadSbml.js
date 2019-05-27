const express = require('express')
const uploadSbmlController = require('../controllers/uploadSbml')
const router = express.Router()

router.post('/', uploadSbmlController)

module.exports = router
