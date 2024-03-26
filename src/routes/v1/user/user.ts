import express from 'express';
import FileUploadHandler from '../../../helpers/fileUpload';
import authentication from '../../../auth/authentication';
import userController from '../../../controllers/user';
import validator, { ValidationSource } from '../../../helpers/validator';
import schema from './schema';
const fileUploadHandler = new FileUploadHandler();
const router = express.Router();

router.use(
  '/',
  authentication
  // , authorization([RoleCode.ADMIN])
);

router
  .route('/')
  .post(validator(schema.create), userController.createUser)
  .get(userController.getAllUsers);

router
  .route('/me')
  .get(userController.getMyProfile)
  .put(
    fileUploadHandler.handleSingleFileUpload('file'),
    userController.updateProfile
  );

router
  .route('/:id')
  .get(validator(schema.param, ValidationSource.PARAM), userController.getUser)
  .put(
    fileUploadHandler.handleSingleFileUpload('file'),
    validator(schema.param, ValidationSource.PARAM),
    validator(schema.update),
    userController.updateUser
  )
  .delete(
    validator(schema.param, ValidationSource.PARAM),
    userController.removeUser
  );
export default router;
