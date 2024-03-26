import asyncHandler from '../../helpers/asyncHandler';
import { ProtectedRequest } from 'app-request';
import { BadRequestError } from '../../core/ApiError';
import _ from 'lodash';

import AdminRepo from '../../database/repository/AdminRepo';
import { SuccessResponse } from '../../core/ApiResponse';
import Admin, { AdminModel } from '../../database/model/Admin';
import { RoleCode } from '../../database/model/Role';

export const createAdmin = asyncHandler(async (req: ProtectedRequest, res) => {
  const { name, email, password, verified, phoneNumber, lastname } = req.body;
  const profilePicUrl = (req.files as any)?.profilePicUrl
    ? (req.files as any).profilePicUrl[0].path
    : '';

  let user = await AdminRepo.findByEmail(email);
  if (user) throw new BadRequestError('Admin already registered');

  const createdAdmin = await AdminRepo.create(
    { name, email, password, profilePicUrl, phoneNumber, lastname } as Admin,
    RoleCode.ADMIN,
    verified,
  );

  new SuccessResponse(
    'Admin has been created successfully!',
    _.pick(createdAdmin, ['_id', 'name', 'email', 'roles', 'profilePicUrl', 'verified', 'lastname']),
  ).send(res);
});
