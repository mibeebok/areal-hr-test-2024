const Joi = require ("joi");

const createPositionsSchema = Joi.object({
    name: Joi.string().min(5).max(100).required(),
  });
 const getOnePositionsSchema = Joi.object({
    id: Joi.number().integer().required(),
  });
 const updatePositionsSchema = Joi.object({
    name: Joi.string().min(5).max(100).required(),
    id: Joi.number().integer().required(),
  });
  module.exports = {
    createPositionsSchema,
    getOnePositionsSchema,
    updatePositionsSchema,
  }