import Joi from "joi";

const validatePostZoo = (req, res, next) => {
  const zooSchema = Joi.object({
    name: Joi.string().min(3).max(100).required().messages({
      "string.base": "Name should be a string",
      "string.empty": "Name cannot be empty",
      "string.min": "Name should have a minimum length of {#limit}",
      "string.max": "Name should have a maximum length of {#limit}",
      "any.required": "Name is required",
    }),
    city: Joi.string().min(3).max(100).required().messages({
      "string.base": "City should be a string",
      "string.empty": "City cannot be empty",
      "string.min": "City should have a minimum length of {#limit}",
      "string.max": "City should have a maximum length of {#limit}",
      "any.required": "City is required",
    }),
    country: Joi.string().min(3).max(100).required().messages({
      "string.base": "Country should be a string",
      "string.empty": "Country cannot be empty",
      "string.min": "Country should have a minimum length of {#limit}",
      "string.max": "Country should have a maximum length of {#limit}",
      "any.required": "Country is required",
    }),
    established: Joi.date().required().messages({
      "date.base": "Established should be a Date",
      "date.empty": "Established cannot be empty",
      "any.required": "Established is required",
    }),
  });

  const { error } = zooSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      msg: error.details[0].message,
    });
  }

  next();
};

const validatePostEnclosure = (req, res, next) => {
  const enclosureSchema = Joi.object({
    zooId: Joi.number().min(1).required().messages({
      "number.base": "Zoo Id needs to be a number",
      "number.empty": "Zoo Id cannot be empty",
      "any.required": "Zoo Id is required",
    }),
    name: Joi.string().min(8).max(100).required().messages({
      "string.base": "Name should be a string",
      "string.empty": "Name cannot be empty",
      "string.min": "Name should have a minimum length of {#limit}",
      "string.max": "Name should have a maximum length of {#limit}",
      "any.required": "Name is required",
    }),
    type: Joi.string().min(3).max(100).required().messages({
      "string.base": "Type should be a string",
      "string.empty": "Type cannot be empty",
      "string.min": "Type should have a minimum length of {#limit}",
      "string.max": "Type should have a maximum length of {#limit}",
      "any.required": "Type is required",
    }),
    visitorCapacity: Joi.number().min(1).max(50).messages({
      "number.base": "Visitor Capacity should be an Integer",
      "number.min": "Visitor Capacity should have a minimum length of {#limit}",
    }),
    temporary: Joi.bool().required().messages({
      "bool.base": "Temporary should be true or false",
      "bool.empty": "Temporary cannot be empty",
      "any.required": "Temporary is required",
    }),
    animals: Joi.object({
      create: Joi.array().items(Joi.object()),
    }).messages({
      "array.base": "Animal should be an Animal Object",
    }),
  });

  const { error } = enclosureSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      msg: error.details[0].message,
    });
  }

  next();
};
export { validatePostZoo, validatePostEnclosure };
