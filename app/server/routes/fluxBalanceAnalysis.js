const express = require('express');
const modelController = require('../controllers/fluxBalanceAnalysis');
const router = express.Router();

router.post('/', modelController);

module.exports = router;
