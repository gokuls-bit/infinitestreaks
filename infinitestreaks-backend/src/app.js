const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./middleware/errorHandler');

// Route imports
const authRoutes = require('./routes/auth.routes');
const habitRoutes = require('./routes/habit.routes');
const statsRoutes = require('./routes/stats.routes');
const reminderRoutes = require('./routes/reminder.routes');

const app = express();

// Security Headers
app.use(helmet());

// Enable CORS
app.use(cors());

// Request logging
app.use(morgan('dev'));

// Rate Limiting (100 requests per 15 minutes by default)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: 'Too many requests, please try again later.' },
});
app.use('/api/', limiter);

// Parsing JSON body
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/habits', habitRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/reminders', reminderRoutes);

// Health check
app.get('/health', (req, res) => res.status(200).send('OK'));

// Global Error Handler
app.use(errorHandler);

module.exports = app;
