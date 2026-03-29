const ActivityLog = require('../models/ActivityLog');
const StreakLog = require('../models/StreakLog');
const User = require('../models/User');
const Habit = require('../models/Habit');

/**
 * Normalize date to UTC midnight YYYY-MM-DD
 */
const getNormalizedDayKey = (date = new Date()) => {
  return date.toISOString().split('T')[0];
};

/**
 * Handle a streak break event
 */
const handleStreakBreak = async (habit) => {
  const penaltyApplied = habit.penaltyOnBreak || 5;

  // Create StreakLog
  await StreakLog.create({
    habitId: habit._id,
    userId: habit.userId,
    eventType: 'streak_broken',
    streakValueAtEvent: habit.currentStreak,
    penaltyApplied,
    message: `You broke your streak on ${habit.name}. Penalty: +${penaltyApplied}`,
  });

  // Increment User Penalty Score
  await User.findByIdAndUpdate(habit.userId, {
    $inc: { penaltyScore: penaltyApplied },
  });

  // Reset habit current streak
  habit.currentStreak = 0;
  // Note: habit will be saved in the caller or after this call
  
  return {
    message: `You broke your streak on ${habit.name}. Penalty: +${penaltyApplied}`,
    penaltyApplied,
  };
};

/**
 * Process a habit completion
 */
const processCompletion = async (habit) => {
  const now = new Date();
  const todayKey = getNormalizedDayKey(now);

  // 1. Check if already completed today using ActivityLog
  const existingLog = await ActivityLog.findOne({
    habitId: habit._id,
    dayKey: todayKey,
  });

  if (existingLog) {
    const error = new Error('Already completed today');
    error.status = 409;
    throw error;
  }

  // 2. Compute yesterday's key
  const yesterdayDate = new Date(now);
  yesterdayDate.setUTCDate(yesterdayDate.getUTCDate() - 1);
  const yesterdayKey = getNormalizedDayKey(yesterdayDate);

  let streakBroken = false;
  let penaltyDetails = null;

  // 3. Update Current Streak
  if (habit.lastCompletedDate) {
    const lastKey = getNormalizedDayKey(habit.lastCompletedDate);

    if (lastKey === yesterdayKey) {
      // Completed yesterday, continue streak
      habit.currentStreak += 1;
    } else if (lastKey !== todayKey) {
      // Missed yesterday(s)
      streakBroken = true;
      penaltyDetails = await handleStreakBreak(habit);
      habit.currentStreak = 1; // Start new
    }
    // If lastKey === todayKey, it was already handled by ActivityLog check
  } else {
    // First completion
    habit.currentStreak = 1;
  }

  // 4. Update longest streak
  habit.longestStreak = Math.max(habit.longestStreak, habit.currentStreak);
  habit.lastCompletedDate = now;

  // 5. Save Habit and create ActivityLog
  await habit.save();
  await ActivityLog.create({
    habitId: habit._id,
    userId: habit.userId,
    completedAt: now,
    dayKey: todayKey,
  });

  return { 
    habit, 
    alreadyCompleted: false, 
    streakBroken, 
    penaltyApplied: penaltyDetails?.penaltyApplied || 0,
    message: streakBroken 
      ? penaltyDetails.message 
      : `Great job! Day ${habit.currentStreak} on ${habit.name} 🔥`
  };
};

/**
 * Periodically scan and reset missed streaks (Cron-ready)
 */
const checkAndResetMissedHabit = async (habitId) => {
  const habit = await Habit.findById(habitId);
  if (!habit || !habit.isActive || !habit.lastCompletedDate) return;

  const now = new Date();
  const yesterdayDate = new Date(now);
  yesterdayDate.setUTCDate(yesterdayDate.getUTCDate() - 1);
  const yesterdayKey = getNormalizedDayKey(yesterdayDate);
  const todayKey = getNormalizedDayKey(now);

  const lastKey = getNormalizedDayKey(habit.lastCompletedDate);

  // If last completion was before yesterday, and not today
  if (lastKey < yesterdayKey && lastKey !== todayKey) {
    await handleStreakBreak(habit);
    await habit.save();
  }
};

module.exports = {
  processCompletion,
  handleStreakBreak,
  checkAndResetMissedHabit,
  getNormalizedDayKey
};
