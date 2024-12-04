import Joi from "joi"

export const createOrganizationSchema = Joi.object({
    name: Joi.string().min(5).max(100).required(),
    comment: Joi.string().min(5).max(100).allow(""),
  });
 export const getOneOrganizationSchema = Joi.object({
    id: Joi.number().integer().required(),
  });
 export const updateOrganizationSchema = Joi.object({
    name: Joi.string().min(5).max(100).required(),
    comment: Joi.string().min(5).max(100).allow(""),
    id: Joi.number().integer().required(),
  });
  