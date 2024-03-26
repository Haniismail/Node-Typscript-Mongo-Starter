import asyncHandler from '../../helpers/asyncHandler';
import { ProtectedRequest } from 'app-request';
import UserRepo from '../../database/repository/UserRepo';
import { SuccessResponse } from '../../core/ApiResponse';

export const createUser = asyncHandler(async (req: ProtectedRequest, res) => {
  const { body } = req;
  const user = await UserRepo.create(body);
  new SuccessResponse('User has been created successfully!', user).send(res);
});
