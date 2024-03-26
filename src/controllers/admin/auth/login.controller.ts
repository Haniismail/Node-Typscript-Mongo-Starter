import { Response, Request } from 'express';
import bcryptjs from 'bcryptjs';
import _ from 'lodash';

import { SuccessResponse } from '../../../core/ApiResponse';
import AdminRepo from '../../../database/repository/AdminRepo';
import { BadRequestError, AuthFailureError } from '../../../core/ApiError';
import KeystoreRepo from '../../../database/repository/KeystoreRepo';
import { createTokens } from '../../../auth/authUtils';
import asyncHandler from '../../../helpers/asyncHandler';
import { generateKeys } from '../../../helpers/auth';

export const login = asyncHandler(async (req: Request, res: Response) => {
  let admin = await AdminRepo.findByEmail(req.body.email);

  if (!admin) throw new BadRequestError('Admin not registered');
  if (!admin.password) throw new BadRequestError('Credential not set');
  if (!admin.verified) throw new BadRequestError('Admin not verified');

  const match = await bcryptjs.compare(req.body.password, admin.password);
  if (!match) throw new AuthFailureError('Authentication failure');

  const { accessTokenKey, refreshTokenKey } = generateKeys();

  await KeystoreRepo.create(admin._id, accessTokenKey, refreshTokenKey);
  const [tokens, filteredadmin] = await Promise.all([
    createTokens(admin, accessTokenKey, refreshTokenKey, true),
    _.pick(admin, ['_id', 'name', 'email', 'roles', 'profilePicUrl', 'verified', 'createdAt']),
  ]);
  new SuccessResponse('Login Success', {
    user: filteredadmin,
    tokens: tokens,
  }).send(res);
});
