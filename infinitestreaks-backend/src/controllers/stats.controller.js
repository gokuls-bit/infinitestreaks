const ActivityLog = require('../models/ActivityLog');
const Habit = require('../models/Habit');
const { catchAsync } = require('./auth.controller');

/**
 * Get habit stats for authenticated user
 */
const getStats = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const now = new Date();
  const last7DaysStart = new Date(now);
  last7DaysStart.setUTCDate(last7DaysStart.getUTCDate() - 6);
  last7DaysStart.setUTCHours(0, 0, 0, 0);

  // 1. Weekly completion %
  const activeHabitsCount = await Habit.countDocuments({ userId, isActive: true });
  
  const weeklyRecords = await ActivityLog.aggregate([
    {
      $match: {
        userId,
        completedAt: { $gte: last7DaysStart },
      },
    },
    {
      $group: {
        _id: "$dayKey",
        completions: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const totalPossibleCompletions = activeHabitsCount * 7;
  const actualCompletionsCount = weeklyRecords.reduce((total, record) => total + record.completions, 0);
  const completionPercent = totalPossibleCompletions > 0 
    ? (actualCompletionsCount / totalPossibleCompletions) * 100 
    : 0;

  // 2. Monthly analytics (Last 30 days, grouped by week)
  const last30DaysStart = new Date(now);
  last30DaysStart.setUTCDate(last30DaysStart.getUTCDate() - 29);
  last30DaysStart.setUTCHours(0, 0, 0, 0);

  const monthlyRecords = await ActivityLog.aggregate([
    {
      $match: {
        userId,
        completedAt: { $gte: last30DaysStart },
      },
    },
    {
      $project: {
        dayKey: "$dayKey",
        week: { $week: "$completedAt" },
      },
    },
    {
      $group: {
        _id: "$week",
        completions: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  // 3. Longest Streak All-Time
  const maxStreakResult = await Habit.aggregate([
    { $match: { userId } },
    { $group: { _id: null, longestStreak: { $max: "$longestStreak" } } },
  ]);

  const longestStreakAllTime = maxStreakResult[0]?.longestStreak || 0;

  res.status(200).json({
    weekly: {
      completionPercent: parseFloat(completionPercent.toFixed(1)),
      daysCompleted: weeklyRecords.map((record) => ({ 
        day: record._id, 
        completions: record.completions 
      })),
    },
    monthly: monthlyRecords.map((record) => ({
      week: record._id,
      completions: record.completions,
    })),
    longestStreak: longestStreakAllTime,
  });
});

module.exports = {
  getStats,
};
