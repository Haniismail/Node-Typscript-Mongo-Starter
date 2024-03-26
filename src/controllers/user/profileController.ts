import { SuccessResponse } from '../../core/ApiResponse';
import UserRepo from '../../database/repository/UserRepo';
import { ProtectedRequest } from 'app-request';
import { BadRequestError } from '../../core/ApiError';
import asyncHandler from '../../helpers/asyncHandler';
import _ from 'lodash';

export const getMyProfile = asyncHandler(async (req: ProtectedRequest, res) => {
  const user = await UserRepo.getOneById(req.user._id);
  if (!user) throw new BadRequestError('User not registered');
  return new SuccessResponse('success', user).send(res);
});

export const updateProfile = asyncHandler(
  async (req: ProtectedRequest, res) => {
    const user = await UserRepo.getOneById(req.user._id);
    if (!user) throw new BadRequestError('User not registered');
    if (req.file) user.profilePicUrl = req.file.path;
    await UserRepo.update(user._id, { ...user });
    return new SuccessResponse('Profile updated', user).send(res);
  }
);
