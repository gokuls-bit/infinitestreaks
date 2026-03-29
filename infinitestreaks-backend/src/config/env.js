const Joi = require('joi');
require('dotenv').config();

const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(5000),
  MONGODB_URI: Joi.string().required().description('MongoDB connection string'),
  JWT_SECRET: Joi.string().required().description('JWT Secret Key'),
  JWT_EXPIRES_IN: Joi.string().default('7d').description('JWT Expiration Time'),
}).unknown().required();

const { value: envVars, error } = envVarsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGODB_URI,
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    expiresIn: envVars.JWT_EXPIRES_IN,
  },
};
