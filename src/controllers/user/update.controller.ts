import asyncHandler from '../../helpers/asyncHandler';
import { ProtectedRequest } from 'app-request';
import { BadRequestError } from '../../core/ApiError';
import UserRepo from '../../database/repository/UserRepo';
import { SuccessResponse } from '../../core/ApiResponse';

export const updateUser = asyncHandler(async (req: ProtectedRequest, res) => {
  const { body } = req;
  const { id } = req.params;
  if (req.file) body.profilePicUrl = req.file.path;
  const user = await UserRepo.update(id, body);
  if (!user) throw new BadRequestError('user not found');
  return new SuccessResponse('User updated', user).send(res);
});
