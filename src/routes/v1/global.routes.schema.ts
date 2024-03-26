import Joi from '@hapi/joi';
import { JoiObjectId } from '../../helpers/validator';

export const mediaFodlerNameSchema = Joi.object({
  mediaFolderName: Joi.string().required().min(3),
});

export const tokenSchema = Joi.object({
  token: Joi.string().required().min(36).max(36),
});

export const ObjectIdSchema = Joi.object({
  id: JoiObjectId().required(),
});

export const mediaFodlerNameSchemaAndObjectId = Joi.object({
  mediaFolderName: Joi.string().required().min(3),
  id: JoiObjectId().required(),
});
