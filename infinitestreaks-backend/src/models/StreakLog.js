const mongoose = require('mongoose');

const streakLogSchema = new mongoose.Schema(
  {
    habitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Habit',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    eventType: {
      type: String,
      enum: ['streak_broken', 'streak_milestone'],
      required: true,
    },
    streakValueAtEvent: {
      type: Number,
      required: true,
    },
    penaltyApplied: {
      type: Number,
      default: 0,
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

// Index on (habitId, createdAt)
streakLogSchema.index({ habitId: 1, createdAt: -1 });

const StreakLog = mongoose.model('StreakLog', streakLogSchema);
module.exports = StreakLog;
