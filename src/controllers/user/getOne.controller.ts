import asyncHandler from '../../helpers/asyncHandler';
import { ProtectedRequest } from 'app-request';
import { BadRequestError } from '../../core/ApiError';
import UserRepo from '../../database/repository/UserRepo';
import { SuccessResponse } from '../../core/ApiResponse';

export const getUser = asyncHandler(async (req: ProtectedRequest, res) => {
  const { id } = req.params;
  const user = await UserRepo.getOneById(id);
  if (!user) throw new BadRequestError('User not found');
  return new SuccessResponse('success', user).send(res);
});
