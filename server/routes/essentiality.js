const express = require('express');
const modelController = require('../controllers/essentiality');
const router = express.Router();

router.post('/', modelController);

module.exports = router;
