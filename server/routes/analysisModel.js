const express = require('express');
// const formidableMiddleware = require('express-formidable');
const modelController = require('../controllers/analysisModel');
const router = express.Router();

// Formidable middleware for uploading files
// router.use(formidableMiddleware({ uploadDir: './' }));

router.post('/', modelController);
// router.get('/get/:id', modelController.getModel)

module.exports = router;
