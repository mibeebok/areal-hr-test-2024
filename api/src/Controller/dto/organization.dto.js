const Joi = require ("joi");

const createOrganizationSchema = Joi.object({
    name: Joi.string().min(5).max(100).required(),
    comment: Joi.string().min(5).max(100).allow(""),
  });
 const getOneOrganizationSchema = Joi.object({
    id: Joi.number().integer().required(),
  });
 const updateOrganizationSchema = Joi.object({
    name: Joi.string().min(5).max(100).required(),
    comment: Joi.string().min(5).max(100).allow(""),
    id: Joi.number().integer().required(),
  });
  module.exports = {
    createOrganizationSchema,
    getOneOrganizationSchema,
    updateOrganizationSchema,
  }
  