const express = require('express');
const router = express.Router();

// 
const sampleController = require('../controllers/sampleController');

// Example Route
router.get('/data', sampleController.getData);

module.exports = router;