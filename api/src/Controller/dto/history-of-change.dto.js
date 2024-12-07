const Joi = require ("joi");

  const getOneHistoryOfChangeSchema = Joi.object({
    id: Joi.number().integer().required(),
  });
  module.exports = {
    getOneHistoryOfChangeSchema,
  }