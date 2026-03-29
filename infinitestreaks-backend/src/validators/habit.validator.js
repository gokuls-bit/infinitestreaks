const Joi = require('joi');

const habitCreateSchema = Joi.object({
  name: Joi.string().required().max(100).trim(),
  description: Joi.string().allow('', null),
  frequency: Joi.string().valid('daily', 'weekly').default('daily'),
  reminderTime: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).allow('', null),
  penaltyOnBreak: Joi.number().min(0).max(100).default(5),
});

const habitUpdateSchema = Joi.object({
  name: Joi.string().max(100).trim(),
  description: Joi.string().allow('', null),
  frequency: Joi.string().valid('daily', 'weekly'),
  reminderTime: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).allow('', null),
  penaltyOnBreak: Joi.number().min(0).max(100),
  isActive: Joi.boolean(),
});

module.exports = {
  habitCreateSchema,
  habitUpdateSchema,
};
