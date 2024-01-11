// routes/index.js
const express = require('express');
const router = express.Router();

const audioController = require('../controllers/audioController');

router.use('/audio', audioController);

module.exports = router;
