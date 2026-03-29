const validate = (schema) => (req, res, next) => {
  const { value, error } = schema.validate(req.body, {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  });

  if (error) {
    const errorMessages = error.details.map((details) => ({
      message: details.message,
      path: details.path,
    }));

    return res.status(422).json({
      error: true,
      message: 'Validation failed',
      details: errorMessages,
    });
  }

  req.body = value;
  next();
};

module.exports = validate;
