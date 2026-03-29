const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habit.controller');
const authMiddleware = require('../middleware/auth.middleware');
const validate = require('../middleware/validate');
const { habitCreateSchema, habitUpdateSchema } = require('../validators/habit.validator');

// All habit routes require auth
router.use(authMiddleware);

router.get('/', habitController.getHabits);
router.post('/', validate(habitCreateSchema), habitController.createHabit);
router.put('/:id', validate(habitUpdateSchema), habitController.updateHabit);
router.delete('/:id', habitController.deleteHabit);

// Streak operations
router.post('/:id/complete', habitController.completeHabit);
router.post('/:id/check-missed', habitController.checkMissed);

module.exports = router;
