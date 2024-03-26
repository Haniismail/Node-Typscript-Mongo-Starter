import asyncHandler from '../../helpers/asyncHandler';
import { ProtectedRequest } from 'app-request';
import _ from 'lodash';

import UserRepo from '../../database/repository/UserRepo';
import { SuccessResponse, SuccessResponsePaginate } from '../../core/ApiResponse';

export const getAllNonAdmins = asyncHandler(async (req: ProtectedRequest, res) => {
  const { page, perPage, deleted } = req.query;
  const options = {
    page: parseInt(page as string, 10) || 1,
    limit: parseInt(perPage as string, 12) || 12,
  };

  const users = await UserRepo.getAll(options, req.query, {
    isPaging: true,
    deleted: deleted == 'true' ? true : false,
  });

  const { docs, ...meta } = users;
  new SuccessResponsePaginate('All users returned successfuly', docs, meta).send(res);
});
