const Joi = require("joi");
const logger = require("../middleware/logger");
const passwordComplexity = require("joi-password-complexity");

exports.validate = (user) => {
  const complexityOptions = {
    min: 5,
    max: 1024,
  };
  logger.info("user validation method - start");
  const schema = Joi.object({
    name: Joi.string().min(3).max(160),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: passwordComplexity(complexityOptions),
  });
  logger.info("user validation method - end");
  return schema.validate(user);
};
