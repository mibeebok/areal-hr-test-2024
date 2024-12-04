import Joi from "joi"

export const createEmployeesSchema = Joi.object({
    first_name: Joi.string().alphanum().min(5).max(100).required(),
    name: Joi.string().alphanum().min(3).max(100).required(),
    patronymic: Joi.string().alphanum().min(5).max(100).required(),
    date_of_birth: Joi.date().required(),
    id_passport_data: Joi.number().integer().required(),
    id_registration_address: Joi.number().integer().required(),
  });
export  const getOneEmployeesSchema = Joi.object({
    id: Joi.number().integer().required(),
  });
export  const updateEmployeesSchema = Joi.object({
    first_name: Joi.string().alphanum().min(5).max(100).required(),
    name: Joi.string().alphanum().min(3).max(100).required(),
    patronymic: Joi.string().alphanum().min(5).max(100).required(),
    date_of_birth: Joi.date().required(),
    id_passport_data: Joi.number().integer().required(),
    id_registration_address: Joi.number().integer().required(),
    id: Joi.number().integer().required(),
  });
  