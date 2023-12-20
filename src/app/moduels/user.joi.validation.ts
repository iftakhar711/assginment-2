import Joi from 'joi';

const userValidationSchema = Joi.object({
  userId: Joi.number().required().messages({
    'any.required': 'User ID is required',
  }),
  username: Joi.string().required().trim().messages({
    'any.required': 'Username is required',
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required',
  }),
  fullName: Joi.object({
    firstName: Joi.string().required().messages({
      'any.required': 'First name is required',
    }),
    lastName: Joi.string().required().messages({
      'any.required': 'Last name is required',
    }),
  }).required(),
  age: Joi.number().required().messages({
    'any.required': 'Age is required',
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required',
    'string.email': 'Invalid email format',
  }),
  isActive: Joi.boolean().default(true),
  hobbies: Joi.array().items(Joi.string()).default([]),
  address: Joi.object({
    street: Joi.string().required().messages({
      'any.required': 'Street is required',
    }),
    city: Joi.string().required().messages({
      'any.required': 'City is required',
    }),
    country: Joi.string().required().messages({
      'any.required': 'Country is required',
    }),
  }).required(),
  orders: Joi.array().items(
    Joi.object({
      productName: Joi.string().required(),
      price: Joi.number().required(),
      quantity: Joi.number().required(),
    }),
  ),
});

export default userValidationSchema;
