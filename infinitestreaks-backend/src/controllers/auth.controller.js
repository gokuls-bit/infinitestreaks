const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { jwt: jwtConfig } = require('../config/env');

/**
 * Higher-order function to catch errors in async controllers
 */
const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn,
  });
};

const register = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;

  // Check unique email (Handled by Mongoose unique index, but good to be explicit for 409)
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: 'Email already in use' });
  }

  const user = await User.create({
    name,
    email,
    passwordHash: password, // Pre-save hook will hash this
  });

  const token = generateToken(user._id);

  res.status(201).json({
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    token,
  });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = generateToken(user._id);

  res.status(200).json({
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      penaltyScore: user.penaltyScore,
    },
    token,
  });
});

module.exports = {
  catchAsync,
  register,
  login,
};
