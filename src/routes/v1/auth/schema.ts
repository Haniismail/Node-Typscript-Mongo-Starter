import Joi from '@hapi/joi';
import { JoiAuthBearer } from '../../../helpers/validator';
import { JoiObjectId } from '../../../helpers/validator';

export default {
  userLogin: Joi.object().keys({
    email: Joi.string().email(),
    userName: Joi.string().email(),
  }),
  adminLogin: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),

  refreshToken: Joi.object().keys({
    refreshToken: Joi.string().required().min(1),
  }),

  auth: Joi.object()
    .keys({
      authorization: JoiAuthBearer().required(),
    })
    .unknown(true),

  signup: Joi.object().keys({
    firstName: Joi.string().required().min(3),
    lastName: Joi.string().required().min(3),
    userName: Joi.string().required().min(3),
    email: Joi.string().required().email().required(),
    phoneNumber: Joi.string().required().min(8).required(),
    userType: JoiObjectId().required(),
  }),

  adminSignup: Joi.object().keys({
    name: Joi.string().required().min(3),
    email: Joi.string().required().email(),
    phoneNumber: Joi.string().optional().min(8),
    password: Joi.string()
      .required()
      .regex(/^[a-zA-Z0-9]{8,30}$/)
      .required(),
  }),

  forgetPassword: Joi.object().keys({
    email: Joi.string().required().email(),
  }),

  resetPassword: Joi.object().keys({
    resetCode: Joi.string().required().min(6).max(6),
    password: Joi.string()
      .required()
      .regex(/^[a-zA-Z0-9]{8,30}$/),
    profilePicUrl: Joi.string().optional().uri(),
  }),

  forgotPassword: Joi.object().keys({
    email: Joi.string().required().email(),
  }),

  AdminresetPassword: Joi.object().keys({
    newPassword: Joi.string()
      .required()
      .regex(/^[a-zA-Z0-9]{8,30}$/),
  }),
};
