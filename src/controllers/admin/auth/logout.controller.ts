import { ProtectedRequest } from 'app-request';

import { SuccessMsgResponse } from '../../../core/ApiResponse';
import KeystoreRepo from '../../../database/repository/KeystoreRepo';
import asyncHandler from '../../../helpers/asyncHandler';

export const logout = asyncHandler(async (req: ProtectedRequest, res) => {
  await KeystoreRepo.remove(req.keystore._id);
  new SuccessMsgResponse('Logout success').send(res);
});
