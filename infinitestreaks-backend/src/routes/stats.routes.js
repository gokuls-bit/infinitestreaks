const express = require('express');
const router = express.Router();
const statsController = require('../controllers/stats.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/', authMiddleware, statsController.getStats);

module.exports = router;
