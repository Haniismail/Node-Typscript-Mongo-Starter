import { ProtectedRequest, RoleRequest } from 'app-request';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

import { SuccessResponse } from '../../../core/ApiResponse';
import { BadRequestError } from '../../../core/ApiError';
import { createTokens } from '../../../auth/authUtils';
import asyncHandler from '../../../helpers/asyncHandler';
import { sendEmail } from '../../../helpers/emails';
import KeystoreRepo from '../../../database/repository/KeystoreRepo';
import AdminRepo from '../../../database/repository/AdminRepo';

export const confirmEmail = asyncHandler(async (req: any, res) => {
  const token = req.params.token;
  const user = await AdminRepo.findByObj({ token });
  if (!user) throw new BadRequestError('Invalid confirmation token');

  user.token = null;
  user.verified = true;
  user.status = true;

  const accessTokenKey = crypto.randomBytes(64).toString('hex');
  const refreshTokenKey = crypto.randomBytes(64).toString('hex');
  const keystore = await KeystoreRepo.create(user._id, accessTokenKey, refreshTokenKey);
  await AdminRepo.update(user, keystore?.primaryKey, keystore?.secondaryKey);
  const tokens = await createTokens(user, accessTokenKey, refreshTokenKey);

  req.user = user;

  sendEmail({
    email: user.email,
    subject: 'Confirmation of Email Address',
    message: `Your email address has been confirmed and your account is now active.`,
    template: 'accountVerified',
  });

  new SuccessResponse('Email confirmed successfully', {
    user: _.pick(user, [
      '_id',
      'name',
      'email',
      'roles',
      'profilePicUrl',
      'verified',
    ]),
    tokens,
  }).send(res);
});
