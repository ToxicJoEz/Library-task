import Joi from "joi";

export const addBookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  publishedYear: Joi.number().required(),
  availableCopies: Joi.number().default(1),
});

export const updateBookSchema = Joi.object({
  title: Joi.string(),
  author: Joi.string(),
  publishedYear: Joi.number().integer(),
  availableCopies: Joi.number().integer().min(0),
});
