import { ProtectedRequest } from 'app-request';
import crypto from 'crypto';
import { Types } from 'mongoose';
import _ from 'lodash';

import JWT from '../../../core/JWT';
import AdminRepo from '../../../database/repository/AdminRepo';
import { AuthFailureError } from '../../../core/ApiError';
import KeystoreRepo from '../../../database/repository/KeystoreRepo';
import { validateTokenData, createTokens, getAccessToken } from '../../../auth/authUtils';
import asyncHandler from '../../../helpers/asyncHandler';
import { TokenRefreshResponse } from '../../../core/ApiResponse';

export const refreshToken = asyncHandler(async (req: ProtectedRequest, res) => {
  req.accessToken = getAccessToken(req.headers.authorization); // Express headers are auto converted to lowercase

  const accessTokenPayload = await JWT.decode(req.accessToken);

  validateTokenData(accessTokenPayload);

  const user = await AdminRepo.findById(new Types.ObjectId(accessTokenPayload.sub));
  if (!user) throw new AuthFailureError('Admin not registered');
  req.user = user;

  const refreshTokenPayload = await JWT.validate(req.body.refreshToken);
  validateTokenData(refreshTokenPayload);

  if (accessTokenPayload.sub !== refreshTokenPayload.sub)
    throw new AuthFailureError('Invalid access token');

  const keystore = await KeystoreRepo.find(
    req.user._id,
    accessTokenPayload.prm,
    refreshTokenPayload.prm
  );

  if (!keystore) throw new AuthFailureError('Invalid access token');
  await KeystoreRepo.remove(keystore._id);

  const accessTokenKey = crypto.randomBytes(64).toString('hex');
  const refreshTokenKey = crypto.randomBytes(64).toString('hex');

  await KeystoreRepo.create(req.user._id, accessTokenKey, refreshTokenKey);
  const tokens = await createTokens(req.user, accessTokenKey, refreshTokenKey);

  new TokenRefreshResponse(
    'Token Issued',
    tokens.accessToken,
    tokens.refreshToken
  ).send(res);
});
