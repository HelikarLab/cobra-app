const express = require('express')
const uploadSbmlController = require('../controllers/uploadSbml')
const router = express.Router()
const fileUpload = require('express-fileupload');


router.post('/', fileUpload(),uploadSbmlController)

module.exports = router
