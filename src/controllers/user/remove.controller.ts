import asyncHandler from '../../helpers/asyncHandler';
import { ProtectedRequest } from 'app-request';
import { BadRequestError } from '../../core/ApiError';
import { SuccessMsgResponse } from '../../core/ApiResponse';
import UserRepo from '../../database/repository/UserRepo';

export const removeUser = asyncHandler(async (req: ProtectedRequest, res) => {
  const { id } = req.params;
  const user = await UserRepo.remove(id);
  if (!user) throw new BadRequestError('User not found');
  return new SuccessMsgResponse('User Deleted').send(res);
});
