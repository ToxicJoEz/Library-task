import { CustomError } from "../utils/customError.js";

export const validateRequest = (
  schema,
  options = { abortEarly: false, stripUnknown: true },
  property = "body"
) => {
  return (req, res, next) => {
    const data = req[property];

    const { error, value } = schema.validate(data, options);

    if (error) {
      return next(new CustomError("Validation failed", 400, error.details));
    }

    req[property] = value;

    next();
  };
};
