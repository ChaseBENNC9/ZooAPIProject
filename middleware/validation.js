/**
 * @file Manages the Validation for Post and Update Requests for each Route
 * @author Chase Bennett-Hill
 */

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

const validateUpdateZoo = (req, res, next) => {
  const zooSchema = Joi.object({
    name: Joi.string().min(3).max(100).messages({
      "string.base": "Name should be a string",
      "string.empty": "Name cannot be empty",
      "string.min": "Name should have a minimum length of {#limit}",
      "string.max": "Name should have a maximum length of {#limit}",
    }),
    city: Joi.string().min(3).max(100).messages({
      "string.base": "City should be a string",
      "string.empty": "City cannot be empty",
      "string.min": "City should have a minimum length of {#limit}",
      "string.max": "City should have a maximum length of {#limit}",
    }),
    country: Joi.string().min(3).max(100).messages({
      "string.base": "Country should be a string",
      "string.empty": "Country cannot be empty",
      "string.min": "Country should have a minimum length of {#limit}",
      "string.max": "Country should have a maximum length of {#limit}",
    }),
    established: Joi.date().messages({
      "date.base": "Established should be a Date",
      "date.empty": "Established cannot be empty",
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
      "number.null": "Zoo Id cannot be null",
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
    visitorCapacity: Joi.number().min(1).max(50).allow(null).messages({
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
      "number.null": "Zoo ID cannot be Null",
    }),
    name: Joi.string().min(8).max(100).messages({
      "string.base": "Name should be a string",
      "string.min": "Name should have a minimum length of {#limit}",
      "string.max": "Name should have a maximum length of {#limit}",
      "string.empty": "Name cannot be empty",
    }),
    type: Joi.string().min(3).max(100).messages({
      "string.base": "Type should be a string",
      "string.min": "Type should have a minimum length of {#limit}",
      "string.max": "Type should have a maximum length of {#limit}",
      "string.empty": "Type cannot be empty",
    }),
    visitorCapacity: Joi.number().min(1).max(50).allow(null).messages({
      "number.base": "Visitor Capacity should be an Integer",
      "number.min": "Visitor Capacity should have a minimum length of {#limit}",
    }),
    temporary: Joi.bool().messages({
      "bool.base": "Temporary should be true or false",
      "bool.empty": "Temporary cannot be empty",
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
      "number.null": "Enclosure Id cannot be null",
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
    sex: Joi.string().valid("MALE", "FEMALE").required().messages({
      //Valid is limiting the options to those inside the ENUM and returning an appropriate message if violated
      "string.base": "Sex should be a string",
      "string.empty": "Sex cannot be empty",
    }),
    birthDate: Joi.date().required().messages({
      "date.base": "Birth Date should be a Date",
      "date.empty": "Birth Date cannot be empty",
      "any.required": "Birth Date is required",
    }),
    deathDate: Joi.date().allow(null).messages({
      "date.base": "Death Date should be a Date",
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
const validateUpdateAnimal = (req, res, next) => {
  const animalSchema = Joi.object({
    enclosureId: Joi.number().min(1).messages({
      "number.base": "Enclosure Id needs to be a number",
      "number.min": "Enclosure ID must be at least {#limit}",
      "number.null": "Eclosure ID cannot be null",
    }),
    name: Joi.string().min(3).max(12).messages({
      "string.base": "Name should be a string",
      "string.min": "Name should have a minimum length of {#limit}",
      "string.max": "Name should have a maximum length of {#limit}",
      "string.empty": "Name cannot be empty",
    }),
    species: Joi.string().min(3).max(15).messages({
      "string.base": "Species should be a string",
      "string.min": "Species should have a minimum length of {#limit}",
      "string.max": "Species should have a maximum length of {#limit}",
      "string.empty": "Species cannot be empty",
    }),
    sex: Joi.string().valid("MALE", "FEMALE").messages({
      "string.base": "Sex should be a string",
      "string.empty": "Sex cannot be empty",
    }),
    birthDate: Joi.date().messages({
      "date.base": "Birth Date should be a Date",
      "date.empty": "Birth Date cannot be empty",
    }),
    deathDate: Joi.date().allow(null).messages({
      "date.base": "Death Date should be a Date",
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

const validatePostVisitor = (req, res, next) => {
  const visitorSchema = Joi.object({
    zooId: Joi.number().min(1).messages({
      "number.base": "Zoo Id needs to be a number",
      "number.null": "Zoo Id cannot be null",
      "number.min": "Zoo ID must be at least {#limit}",
      "any.required": "Zoo Id is required",
    }),
    firstName: Joi.string().min(3).max(12).required().messages({
      "string.base": "First Name should be a string",
      "string.empty": "First Name cannot be empty",
      "string.min": "First Name should have a minimum length of {#limit}",
      "string.max": "First Name should have a maximum length of {#limit}",
      "any.required": "First Name is required",
    }),
    lastName: Joi.string().min(3).max(12).required().messages({
      "string.base": "Last Name should be a string",
      "string.empty": "Last Name cannot be empty",
      "string.min": "Last Name should have a minimum length of {#limit}",
      "string.max": "Last Name should have a maximum length of {#limit}",
      "any.required": "Last Name is required",
    }),
    ticketType: Joi.string()
      .valid("ADULT", "CHILD", "SENIOR") //Valid is limiting the options to those inside the ENUM and returning an appropriate message if violated
      .required()
      .messages({
        "string.base": "Species should be a string",
        "string.empty": "Species cannot be empty",
        "string.min": "Species should have a minimum length of {#limit}",
        "string.max": "Species should have a maximum length of {#limit}",
        "any.required": "Species is required",
      }),
    ticketCost: Joi.number().min(10).max(40).required().messages({
      "number.base": "Ticket Cost should be a number",
      "number.null": "Ticket Cost cannot be null",
      "number.min": "Ticket Cost should not be below {#limit}",
      "number.max": "Ticket Cost should not be above {#limit}",
      "any.required": "Ticket Cost is required",
    }),
    visitDate: Joi.date().required().messages({
      "date.base": "Visit Date should be a Date",
      "date.empty": "Visit Date cannot be empty",
      "any.required": "Visit Date is required",
    }),
    tourGroup: Joi.object({
      create: Joi.array().items(Joi.object()),
    }).messages({
      "array.base": "Tour Group should be a Tour Group Object",
    }),
  });

  const { error } = visitorSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      msg: error.details[0].message,
    });
  }

  next();
};
const validateUpdateVisitor = (req, res, next) => {
  const visitorSchema = Joi.object({
    zooId: Joi.number().min(1).messages({
      "number.base": "Zoo Id needs to be a number",
      "number.null": "Zoo Id cannot be null",
      "number.min": "Zoo ID must be at least {#limit}",
    }),
    firstName: Joi.string().min(3).max(12).messages({
      "string.base": "First Name should be a string",
      "string.empty": "First Name cannot be empty",
      "string.min": "First Name should have a minimum length of {#limit}",
      "string.max": "First Name should have a maximum length of {#limit}",
    }),
    lastName: Joi.string().min(3).max(12).messages({
      "string.base": "Last Name should be a string",
      "string.empty": "Last Name cannot be empty",
      "string.min": "Last Name should have a minimum length of {#limit}",
      "string.max": "Last Name should have a maximum length of {#limit}",
    }),
    ticketType: Joi.string().valid("ADULT", "CHILD", "SENIOR").messages({
      "string.base": "Species should be a string",
      "string.empty": "Species cannot be empty",
      "string.min": "Species should have a minimum length of {#limit}",
      "string.max": "Species should have a maximum length of {#limit}",
    }),
    ticketCost: Joi.number().min(10).max(40).messages({
      "number.base": "Ticket Cost should be a number",
      "number.null": "Ticket Cost cannot be null",
      "number.min": "Ticket Cost should not be below {#limit}",
      "number.max": "Ticket Cost should not be above {#limit}",
    }),
    visitDate: Joi.date().messages({
      "date.base": "Visit Date should be a Date",
      "date.empty": "Visit Date cannot be empty",
    }),
    tourGroup: Joi.object({
      //when making a tour group within a visitor, it requires the create key first, this validates that the formatting is sent correctly
      create: Joi.array().items(Joi.object()),
    }).messages({
      "array.base": "Tour Group should be a Tour Group Object",
    }),
  });

  const { error } = visitorSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      msg: error.details[0].message,
    });
  }

  next();
};

const validatePostWorker = (req, res, next) => {
  const workerSchema = Joi.object({
    zooId: Joi.number().min(1).required().messages({
      "number.base": "Zoo Id needs to be a number",
      "number.null": "Zoo Id cannot be null",
      "number.min": "Zoo ID must be at least {#limit}",
      "any.required": "Zoo Id is required",
    }),
    firstName: Joi.string().min(3).max(12).required().messages({
      "string.base": "First Name should be a string",
      "string.empty": "First Name cannot be empty",
      "string.min": "First Name should have a minimum length of {#limit}",
      "string.max": "First Name should have a maximum length of {#limit}",
      "any.required": "First Name is required",
    }),
    lastName: Joi.string().min(3).max(12).required().messages({
      "string.base": "Last Name should be a string",
      "string.empty": "Last Name cannot be empty",
      "string.min": "Last Name should have a minimum length of {#limit}",
      "string.max": "Last Name should have a maximum length of {#limit}",
      "any.required": "Last Name is required",
    }),
    hireDate: Joi.date().required().messages({
      "date.base": "Hire Date should be a Date and Time",
      "date.empty": "Hire Date cannot be empty",
      "any.required": "Hire Date is required",
    }),
    terminationDate: Joi.date().allow(null).messages({
      "date.base": "Termination Date should be a Date and Time",
      "date.empty": "Termination Date cannot be empty",
    }),
    tourGroup: Joi.object({
      create: Joi.array().items(Joi.object()),
    }).messages({
      "array.base": "Tour Group should be a Tour Group Object",
    }),
  });

  const { error } = workerSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      msg: error.details[0].message,
    });
  }

  next();
};

const validateUpdateWorker = (req, res, next) => {
  const workerSchema = Joi.object({
    zooId: Joi.number().min(1).messages({
      "number.base": "Zoo Id needs to be a number",
      "number.null": "Zoo Id cannot be null",
      "number.min": "Zoo ID must be at least {#limit}",
    }),
    firstName: Joi.string().min(3).max(12).messages({
      "string.base": "First Name should be a string",
      "string.empty": "First Name cannot be empty",
      "string.min": "First Name should have a minimum length of {#limit}",
      "string.max": "First Name should have a maximum length of {#limit}",
    }),
    lastName: Joi.string().min(3).max(12).messages({
      "string.base": "Last Name should be a string",
      "string.empty": "Last Name cannot be empty",
      "string.min": "Last Name should have a minimum length of {#limit}",
      "string.max": "Last Name should have a maximum length of {#limit}",
    }),
    hireDate: Joi.date().messages({
      "date.base": "Hire Date should be a Date and Time",
      "date.empty": "Hire Date cannot be empty",
    }),
    terminationDate: Joi.date().allow(null).messages({
      "date.base": "Hire Date should be a Date and Time",
      "date.empty": "Hire Date cannot be empty",
    }),
    tourGroup: Joi.object({
      create: Joi.array().items(Joi.object()),
    }).messages({
      "array.base": "Tour Group should be a Tour Group Object",
    }),
  });

  const { error } = workerSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      msg: error.details[0].message,
    });
  }

  next();
};

const validatePostTourGroup = (req, res, next) => {
  const tourGroupSchema = Joi.object({
    workerId: Joi.number().min(1).required().messages({
      "number.base": "Worker Id needs to be a number",
      "number.null": "Worker Id cannot be null",
      "number.min": "Worker ID must be at least {#limit}",
      "any.required": "Worker Id is required",
    }),
    enclosureId: Joi.number().min(1).required().messages({
      "number.base": "Enclosure Id needs to be a number",
      "number.null": "Enclosure Id cannot be null",
      "number.min": "Enclosure ID must be at least {#limit}",
      "any.required": "Enclosure Id is required",
    }),

    visitors: Joi.object({
      create: Joi.array().items(Joi.object()),
    }).messages({
      "array.base": "Visitors should be a Visitor Object",
    }),
    startTime: Joi.date().required().messages({
      "date.base": "Start Time should be a Date and Time",
      "date.empty": "Start Time cannot be empty",
      "any.required": "Start Time is required",
    }),
    description: Joi.string().min(30).max(80).required().messages({
      "string.base": "Description should be a string",
      "string.empty": "Description cannot be empty",
      "string.min": "Description should have a minimum length of {#limit}",
      "string.max": "Description should have a maximum length of {#limit}",
      "any.required": "Description is required",
    }),
  });

  const { error } = tourGroupSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      msg: error.details[0].message,
    });
  }

  next();
};

const validateUpdateTourGroup = (req, res, next) => {
  const tourGroupSchema = Joi.object({
    WorkerId: Joi.number().min(1).messages({
      "number.base": "Worker Id needs to be a number",
      "number.null": "Worker Id cannot be null",
      "number.min": "Worker ID must be at least {#limit}",
    }),
    enclosureId: Joi.number().min(1).messages({
      "number.base": "Enclosure Id needs to be a number",
      "number.null": "Enclosure Id cannot be null",
      "number.min": "Enclosure ID must be at least {#limit}",
    }),

    visitors: Joi.object({
      create: Joi.array().items(Joi.object()),
    }).messages({
      "array.base": "Visitors should be a Visitor Object",
    }),
    startTime: Joi.date().messages({
      "date.base": "Start Time should be a Date and Time",
      "date.empty": "Start Time cannot be empty",
    }),
    description: Joi.string().min(30).max(80).messages({
      "string.base": "Description should be a string",
      "string.empty": "Description cannot be empty",
      "string.min": "Description should have a minimum length of {#limit}",
      "string.max": "Description should have a maximum length of {#limit}",
    }),
  });

  const { error } = tourGroupSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      msg: error.details[0].message,
    });
  }

  next();
};

export {
  validatePostZoo,
  validatePostEnclosure,
  validatePostAnimal,
  validateUpdateVisitor,
  validatePostWorker,
  validatePostTourGroup,
  validateUpdateEnclosure,
  validateUpdateZoo,
  validateUpdateAnimal,
  validatePostVisitor,
  validateUpdateWorker,
  validateUpdateTourGroup,
};
