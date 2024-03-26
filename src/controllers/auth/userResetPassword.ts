import { ProtectedRequest } from 'app-request';
import crypto from 'crypto';
import { SuccessMsgResponse } from '../../core/ApiResponse';
import UserRepo from '../../database/repository/UserRepo';
import { BadRequestError } from '../../core/ApiError';
import asyncHandler from '../../helpers/asyncHandler';
import { UserModel } from '../../database/model/User';

export const userResetPassword = asyncHandler(
  async (req: ProtectedRequest, res) => {
    const { resetCode, password } = req.body;

    let user = await UserRepo.getOneByObj({ resetCode });
    if (!user) throw new BadRequestError('Invalid code');

    user.password = password;
    user.resetCode = null;

    await user.save();

    return new SuccessMsgResponse('your password have been modified').send(res);
  }
);
