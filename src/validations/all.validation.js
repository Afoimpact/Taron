const Joi = require('joi');
// import { join } from 'path/posix';

const createUser = {
  body: Joi.object().keys({
    companyName: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    //phone: Joi.string().required(),
  }),
};

const createProperty = {
  body: Joi.object().keys({
    name: Joi.string().optional(),
    address: Joi.string().optional(),
    type: Joi.string().optional(),
    description: Joi.string().optional(),
    total_rooms: Joi.string().optional(),
    occupancy_type: Joi.string().optional(),
    rent_amount: Joi.string().optional(),
    currency: Joi.string().optional(),
    rent_frequency: Joi.string().optional(),
    is_published: Joi.boolean().optional(),
  }),
  file: Joi.object().keys({
    image: Joi.string().optional(),
  }),
};

const updateProperty = {
  body: Joi.object().keys({
    name: Joi.string().optional(),
    address: Joi.string().optional(),
    type: Joi.string().optional(),
    description: Joi.string().optional(),
    total_rooms: Joi.string().optional(),
    occupancy_type: Joi.string().optional(),
    rent_amount: Joi.string().optional(),
    currency: Joi.string().optional(),
    rent_frequency: Joi.string().optional(),
    is_published: Joi.boolean().optional(),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const requestSignUpOtp = {
  body: Joi.object().keys({
    fullName: Joi.string().required(),
    email: Joi.string().required(),
    DOB: Joi.string().required(),
  }),
};

module.exports = { createUser, login, createProperty, requestSignUpOtp };
