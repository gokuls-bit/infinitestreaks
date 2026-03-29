const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().required().trim().min(2),
  email: Joi.string().email().required().lowercase().trim(),
  password: Joi.string().min(8).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().lowercase().trim(),
  password: Joi.string().required(),
});

module.exports = {
  registerSchema,
  loginSchema,
};
