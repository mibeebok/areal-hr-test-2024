const Joi = require ("joi");

const createPersonnelOperationsSchema = Joi.object({
    id_employee: Joi.number().integer().required(),
    id_department: Joi.number().integer().required(),
    id_position: Joi.number().integer().required(),
    setting_the_salary: Joi.number().integer().allow(""),
    salary_change: Joi.number().integer().allow(""),
    dismissal_from_work: Joi.boolean().required(),
  });
 const getOnePersonnelOperationsSchema = Joi.object({
    id: Joi.number().integer().required(),
  });
 const updatePersonnelOperationsSchema = Joi.object({
    id_employee: Joi.number().integer().required(),
    id_department: Joi.number().integer().required(),
    id_position: Joi.number().integer().required(),
    setting_the_salary: Joi.number().integer().allow(""),
    salary_change: Joi.number().integer().allow(""),
    dismissal_from_work: Joi.boolean().required(),
    id: Joi.number().integer().required(),
  });
  module.exports = {
    createPersonnelOperationsSchema,
    getOnePersonnelOperationsSchema,
    updatePersonnelOperationsSchema,
  }
  