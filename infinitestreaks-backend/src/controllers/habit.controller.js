const Habit = require('../models/Habit');
const streakService = require('../services/streak.service');
const { catchAsync } = require('./auth.controller');

/**
 * Get all habits for authenticated user
 */
const getHabits = catchAsync(async (req, res) => {
  const habits = await Habit.find({ userId: req.user._id, isActive: true });
  res.status(200).json({ habits });
});

/**
 * Create new habit
 */
const createHabit = catchAsync(async (req, res) => {
  const habitData = { ...req.body, userId: req.user._id };
  const habit = await Habit.create(habitData);
  res.status(201).json({ habit });
});

/**
 * Update habit
 */
const updateHabit = catchAsync(async (req, res) => {
  const habit = await Habit.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    req.body,
    { new: true, runValidators: true }
  );

  if (!habit) return res.status(404).json({ message: 'Habit not found' });
  res.status(200).json({ habit });
});

/**
 * Archive habit (soft delete)
 */
const deleteHabit = catchAsync(async (req, res) => {
  const habit = await Habit.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    { isActive: false },
    { new: true }
  );

  if (!habit) return res.status(404).json({ message: 'Habit not found' });
  res.status(200).json({ message: 'Habit archived' });
});

/**
 * Complete habit for today
 */
const completeHabit = catchAsync(async (req, res) => {
  const habit = await Habit.findOne({ _id: req.params.id, userId: req.user._id, isActive: true });
  if (!habit) return res.status(404).json({ message: 'Habit not found or inactive' });

  const result = await streakService.processCompletion(habit);
  
  res.status(200).json({
    habit: result.habit,
    message: result.message,
    streakBroken: result.streakBroken,
    penaltyApplied: result.penaltyApplied,
    newStreak: result.habit.currentStreak
  });
});

/**
 * Manual check-missed trigger
 */
const checkMissed = catchAsync(async (req, res) => {
  await streakService.checkAndResetMissedHabit(req.params.id);
  const habit = await Habit.findById(req.params.id);
  res.status(200).json({ habit, message: "Streak verification completed" });
});

module.exports = {
  getHabits,
  createHabit,
  updateHabit,
  deleteHabit,
  completeHabit,
  checkMissed,
};
