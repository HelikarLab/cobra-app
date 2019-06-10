const express = require('express')
const formidableMiddleware = require('express-formidable')
const uploadSbmlController = require('../controllers/uploadSbml')
const router = express.Router()

// Formidable middleware for uploading files
router.use(formidableMiddleware({ uploadDir: './' }))

router.post('/', uploadSbmlController)

module.exports = router
