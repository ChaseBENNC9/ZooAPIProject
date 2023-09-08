/**
 * @file Manages the Validation for Post and Update Requests for each Route
 * @author Chase Bennett-Hill
 */

import Joi from "joi";
/**
 * @description This function is for validating the Post Request of a Zoo
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {} next - Next
 * @returns {object} - Validation message
 */
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
    enclosures: Joi.object({
      create: Joi.array().items(Joi.object()),
    }).messages({
      "array.base": "Enclosures should be an Enclosure Object",
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
/**
 * @description This function is for validating the Update Request of a Zoo, the full object is not required when updating
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {} next - Next
 * @returns {object} - Validation message
 */
 
const validateUpdateZoo = (req, res, next) => {
  const zooSchema = Joi.object({
    name: Joi.string().min(3).max(100).messages({
      "string.base": "Name should be a string",
      "string.empty": "Name cannot be empty",
      "string.min": "Name should have a minimum length of {#limit}",
      "string.max": "Name should have a maximum length of {#limit}",
      "any.required": "Name is required",
    }),
    city: Joi.string().min(3).max(100).messages({
      "string.base": "City should be a string",
      "string.empty": "City cannot be empty",
      "string.min": "City should have a minimum length of {#limit}",
      "string.max": "City should have a maximum length of {#limit}",
      "any.required": "City is required",
    }),
    country: Joi.string().min(3).max(100).messages({
      "string.base": "Country should be a string",
      "string.empty": "Country cannot be empty",
      "string.min": "Country should have a minimum length of {#limit}",
      "string.max": "Country should have a maximum length of {#limit}",
      "any.required": "Country is required",
    }),
    established: Joi.date().messages({
      "date.base": "Established should be a Date",
    }),
    enclosures: Joi.object({
      create: Joi.array().items(Joi.object()),
    }).messages({
      "array.base": "Enclosures should be an Enclosure Object",
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
      "number.min": "Zoo ID must be at least {#limit}",

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
const validateUpdateEnclosure = (req, res, next) => {
  const enclosureSchema = Joi.object({
    zooId: Joi.number().min(1).messages({
      "number.base": "Zoo Id needs to be a number",
      "number.min": "Zoo ID must be at least {#limit}",

    }),
    name: Joi.string().min(8).max(100).messages({
      "string.base": "Name should be a string",
      "string.min": "Name should have a minimum length of {#limit}",
      "string.max": "Name should have a maximum length of {#limit}",

    }),
    type: Joi.string().min(3).max(100).messages({
      "string.base": "Type should be a string",
      "string.min": "Type should have a minimum length of {#limit}",
      "string.max": "Type should have a maximum length of {#limit}",

    }),
    visitorCapacity: Joi.number().min(1).max(50).messages({
      "number.base": "Visitor Capacity should be an Integer",
      "number.min": "Visitor Capacity should have a minimum length of {#limit}",
    }),
    temporary: Joi.bool().messages({
      "bool.base": "Temporary should be true or false",

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
const validatePostAnimal = (req, res, next) => {
  const animalSchema = Joi.object({
    enclosureId: Joi.number().min(1).messages({
      "number.base": "Enclosure Id needs to be a number",
      "number.empty": "Enclosure Id cannot be empty",
      "number.min": "Enclosure ID must be at least {#limit}",
      "any.required": "Enclosure Id is required",

    }),
    name: Joi.string().min(3).max(12).required().messages({
      "string.base": "Name should be a string",
      "string.empty": "Name cannot be empty",
      "string.min": "Name should have a minimum length of {#limit}",
      "string.max": "Name should have a maximum length of {#limit}",
      "any.required": "Name is required",
    }),
    species: Joi.string().min(3).max(15).required().messages({
      "string.base": "Species should be a string",
      "string.empty": "Species cannot be empty",
      "string.min": "Species should have a minimum length of {#limit}",
      "string.max": "Species should have a maximum length of {#limit}",
      "any.required": "Species is required",
    }),
    sex: Joi.string().valid("MALE","FEMALE").required().messages({
      "string.base": "Sex should be a string",
      "string.empty": "Sex cannot be empty",
    }),
    birthDate: Joi.date().required().messages({
      "date.base": "Birth Date should be a Date",
      "date.empty": "Birth Date cannot be empty",
      "any.required": "Birth Date is required",
    }),
    deathDate: Joi.date().allow(null).messages({
      "date.base": "Death Date should be a Date"
    }),
    
  });

  const { error } = animalSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      msg: error.details[0].message,
    });
  }

  next();
};
export { validatePostZoo, validatePostEnclosure,validatePostAnimal,validateUpdateEnclosure,validateUpdateZoo };
