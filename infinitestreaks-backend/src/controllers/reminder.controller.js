const Habit = require('../models/Habit');
const { catchAsync } = require('./auth.controller');

/**
 * Get all habits with reminders across users (Internal use or admin)
 */
const getAllReminders = catchAsync(async (req, res) => {
  const habits = await Habit.find({ reminderTime: { $exists: true, $ne: "" }, isActive: true })
    .populate('userId', 'name email');
  res.status(200).json({ habits });
});

/**
 * Trigger notifications for a specific time slot
 * Body: { time: "08:30" }
 */
const triggerReminders = catchAsync(async (req, res) => {
  const { time } = req.body;
  if (!time) {
    return res.status(400).json({ message: "Time parameter required (e.g., '08:30')" });
  }

  const habits = await Habit.find({ reminderTime: time, isActive: true })
    .populate('userId', 'name email');

  // Logic for sending actual push notifications (triggered from mobile or external worker)
  // For now, return the list of habits that need a reminder
  res.status(200).json({ 
    count: habits.length,
    habits: habits.map(h => ({
      habitId: h._id,
      habitName: h.name,
      userName: h.userId?.name,
      userEmail: h.userId?.email
    }))
  });
});

module.exports = {
  getAllReminders,
  triggerReminders,
};
