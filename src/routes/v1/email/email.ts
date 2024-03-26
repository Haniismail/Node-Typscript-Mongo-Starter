import express from 'express';
import role from '../../../helpers/role';
import authentication from '../../../auth/authentication';
import authorization from '../../../auth/authorization';
import { RoleCode } from '../../../database/model/Role';
import validator, { ValidationSource } from '../../../helpers/validator';
import { emailTextSchema, emailHtmlSchema } from './schema';
import {
  sendTextEmail,
  sendHtmlEmail,
} from '../../../controllers/email/text.controller';

const router = express.Router();

router.use('/', authentication, authorization([RoleCode.ADMIN]));

router.post('/text', validator(emailTextSchema), sendTextEmail);
router.post('/html', validator(emailHtmlSchema), sendHtmlEmail);

export default router;
