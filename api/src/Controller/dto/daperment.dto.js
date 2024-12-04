import Joi from "joi"

export const createDepartmentSchema = Joi.object({
  id_organization: Joi.number().integer().required(),
  parent: Joi.number().integer().required(),
  name: Joi.string().min(3).max(30).required(),
  comment: Joi.string().min(5).max(1000).allow(""),
});
export const getOneDepartmentsSchema = Joi.object({
  id: Joi.number().integer().required(),
});
export const updateDepartmentSchema = Joi.object({
  id_organization: Joi.number().integer().required(),
  parent: Joi.number().integer().required(),
  name: Joi.string().min(3).max(30).required(),
  comment: Joi.string().min(5).max(1000).allow(""),
  id: Joi.number().integer().required(),
});