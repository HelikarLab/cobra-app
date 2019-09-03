const express = require('express')
//const formidableMiddleware = require('express-formidable')
const modelController = require('../controllers/model')
const router = express.Router()

// Formidable middleware for uploading files
// router.use(formidableMiddleware({ uploadDir: './' }))


router.post('/add', modelController.addModel)
router.get('/get/all', modelController.getAllModels)
router.get('/get/:id', modelController.getModel)

// router.get('/get/:id', modelController.getModel)

module.exports = router

