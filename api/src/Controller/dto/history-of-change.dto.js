import Joi from "joi"

  export const getOneHistoryOfChangeSchema = Joi.object({
    id: Joi.number().integer().required(),
  });