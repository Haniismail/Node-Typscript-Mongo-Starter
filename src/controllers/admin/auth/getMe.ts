import { SuccessResponse } from '../../../core/ApiResponse';
import { ProtectedRequest } from 'app-request';
import { BadRequestError } from '../../../core/ApiError';
import asyncHandler from '../../../helpers/asyncHandler';
import _ from 'lodash';
import AdminRepo from '../../../database/repository/AdminRepo';

export const getMyProfile = asyncHandler(async (req: ProtectedRequest, res) => {
    const admin = await AdminRepo.findById(req.user._id);
    if (!admin) throw new BadRequestError('admin not registered');
    return new SuccessResponse('success', admin).send(res);
  });
  

  