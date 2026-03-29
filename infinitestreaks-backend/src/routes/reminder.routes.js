const express = require('express');
const router = express.Router();
const reminderController = require('../controllers/reminder.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Public or internal routes depending on security (For simplicity, keep them public or add basic trigger check)
router.get('/', reminderController.getAllReminders);
router.post('/trigger', reminderController.triggerReminders);

module.exports = router;
