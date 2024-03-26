import { Response, Request } from 'express';
import bcryptjs from 'bcryptjs';
import _ from 'lodash';

import { SuccessResponse } from '../../core/ApiResponse';
import UserRepo from '../../database/repository/UserRepo';
import { BadRequestError, AuthFailureError } from '../../core/ApiError';
import KeystoreRepo from '../../database/repository/KeystoreRepo';
import { createTokens } from '../../auth/authUtils';
import asyncHandler from '../../helpers/asyncHandler';
import { generateKeys } from '../../helpers/auth';

export const login = asyncHandler(async (req: Request, res: Response) => {
  let user = await UserRepo.getOneByObj({ email: req.body.email });
  if (!user) throw new BadRequestError('User not registered');
  if (!user.password) throw new BadRequestError('Credential not set');
  if (!user.verified) throw new BadRequestError('User not verified');

  const match = await bcryptjs.compare(req.body.password, user.password);
  if (!match) throw new AuthFailureError('Authentication failure');

  const { accessTokenKey, refreshTokenKey } = generateKeys();
  await KeystoreRepo.create(user._id, accessTokenKey, refreshTokenKey);
  const [tokens, filteredUser] = await Promise.all([
    createTokens(user, accessTokenKey, refreshTokenKey),
    user,
  ]);

  new SuccessResponse('Login Success', {
    user: filteredUser,
    tokens: tokens,
  }).send(res);
});
