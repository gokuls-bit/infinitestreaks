const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
      maxLength: 100,
    },
    description: {
      type: String,
    },
    frequency: {
      type: String,
      enum: ['daily', 'weekly'],
      default: 'daily',
    },
    reminderTime: {
      type: String, // e.g., "08:30"
    },
    currentStreak: {
      type: Number,
      default: 0,
    },
    longestStreak: {
      type: Number,
      default: 0,
    },
    lastCompletedDate: {
      type: Date,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    penaltyOnBreak: {
      type: Number,
      default: 5,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index on (userId, isActive)
habitSchema.index({ userId: 1, isActive: 1 });

const Habit = mongoose.model('Habit', habitSchema);
module.exports = Habit;
