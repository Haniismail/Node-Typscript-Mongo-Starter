import asyncHandler from '../../helpers/asyncHandler';
import { ProtectedRequest } from 'app-request';
import UserRepo from '../../database/repository/UserRepo';
import { SuccessResponsePaginate } from '../../core/ApiResponse';

export const getAllUsers = asyncHandler(async (req: ProtectedRequest, res) => {
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
  new SuccessResponsePaginate(
    'All users returned successfuly',
    docs,
    meta
  ).send(res);
});
