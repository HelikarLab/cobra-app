const express = require('express')
const multer = require('multer');
const uploadSbmlController = require('../controllers/uploadSbml')
const router = express.Router()

var upload = multer({ dest: 'uploads/' })
router.post('/', upload.single('file'), uploadSbmlController);

module.exports = router;