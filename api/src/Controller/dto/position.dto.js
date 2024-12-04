import Joi from "joi"

export const createPositionsSchema = Joi.object({
    name: Joi.string().min(5).max(100).required(),
  });
 export const getOnePositionsSchema = Joi.object({
    id: Joi.number().integer().required(),
  });
 export const updatePositionsSchema = Joi.object({
    name: Joi.string().min(5).max(100).required(),
    id: Joi.number().integer().required(),
  });