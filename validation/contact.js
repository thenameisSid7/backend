const Joi = require("joi");
const logger = require("../middleware/logger");

exports.validate = (contact) => {
  logger.info("contact validation method - start");
  const schema = Joi.object({
    name: Joi.string().min(3).max(160).required(),
    phone: Joi.number().min(10).required(),
  });
  logger.info("contact validation method - end");
  return schema.validate(contact);
};