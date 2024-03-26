import asyncHandler from "../../helpers/asyncHandler";
import { ProtectedRequest } from "app-request";
import { BadRequestError } from "../../core/ApiError";
import { Types } from "mongoose";
import _ from "lodash";

import KeystoreRepo from "../../database/repository/KeystoreRepo";
import { SuccessResponse } from "../../core/ApiResponse";
import AdminRepo from "../../database/repository/AdminRepo";

export const deleteAdmin = asyncHandler(async (req: ProtectedRequest, res) => {
  const userId = new Types.ObjectId(req.params.id);
  const user = await AdminRepo.findByObj({
    _id: userId,
    status: true,
    deletedAt: null,
  });

  if (!user) throw new BadRequestError("Admin not registered or deleted");
  if (user?._id.toString() === req.user._id.toString())
    throw new BadRequestError("You cannot delete yourself");

  await KeystoreRepo.remove(user._id);
  let deletedUser = await AdminRepo.deleteUser(user);
  return new SuccessResponse("Admin Deleted", deletedUser).send(res);
});
