import express from 'express';
import validator, { ValidationSource } from '../../../helpers/validator';
import schema from './schema';
import authentication from '../../../auth/authentication';
import auth from '../../../controllers/auth';
import { tokenSchema } from '../global.routes.schema';
import FileUploadHandler from '../../../helpers/fileUpload';
import adminAuth from '../../../controllers/admin/auth';
import userAuth from '../../../controllers/auth';

import uploadMediaFilesToThisFolder from '../../../helpers/fileUpload/uploadDestiny';

const router = express.Router();
const fileUploadHandler = new FileUploadHandler();
router.post('/signup', validator(schema.signup), userAuth.signup);
router.post('/login', validator(schema.userLogin), userAuth.login);

router.post('/signup', validator(schema.signup), auth.signup);
router.post('/login', validator(schema.userLogin), auth.login);
router.get(
  '/confirm/:token',
  validator(tokenSchema, ValidationSource.PARAM),
  userAuth.confirmEmail
);
router.post(
  '/forget-password',
  validator(schema.forgetPassword),
  userAuth.userForgotPassword
);

router.post(
  '/reset-password',
  validator(schema.resetPassword),
  userAuth.userResetPassword
);

router.post('/admins/login', validator(schema.adminLogin), adminAuth.login);

router.post(
  '/admins/forgot-password',
  validator(schema.forgotPassword),
  adminAuth.adminForgotPassword
);

router.post(
  '/admins',
  uploadMediaFilesToThisFolder('admins'),
  fileUploadHandler.handleSingleFileUpload('profilePicUrl'),
  validator(schema.adminSignup),
  adminAuth.signup
);
router.get(
  '/admins/confirm/:token',
  validator(tokenSchema, ValidationSource.PARAM),
  adminAuth.confirmEmail
);

router.post(
  '/admins/reset-password/:token',
  validator(tokenSchema, ValidationSource.PARAM),
  validator(schema.AdminresetPassword),
  adminAuth.adminResetPassword
);

router.use('/', authentication);

router.post(
  '/refresh',
  validator(schema.auth, ValidationSource.HEADER),
  validator(schema.refreshToken),
  userAuth.refreshToken
);

router.delete('/logout', userAuth.logout);

router.post(
  '/admins/refresh',
  validator(schema.auth, ValidationSource.HEADER),
  validator(schema.refreshToken),
  adminAuth.refreshToken
);

router.delete('/admins/logout', adminAuth.logout);

export default router;
