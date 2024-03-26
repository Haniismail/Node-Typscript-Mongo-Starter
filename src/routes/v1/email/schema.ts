import Joi from '@hapi/joi';

export const emailTextSchema = Joi.object({
  to: Joi.string().required().email(),
  subject: Joi.string().required(),
  text: Joi.string().required(),
});

export const emailHtmlSchema = Joi.object({
  to: Joi.string().required().email(),
  subject: Joi.string().required(),
  template: Joi.string().required(),
});
