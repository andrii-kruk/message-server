import Joi from "joi";

const signUpSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6).max(32),
});

const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6).max(32),
});

export default {
  signUpSchema,
  signInSchema,
};
