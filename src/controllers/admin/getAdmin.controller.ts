import asyncHandler from "../../helpers/asyncHandler";
import { ProtectedRequest } from "app-request";
import { BadRequestError } from "../../core/ApiError";
import { Types } from "mongoose";
import _ from "lodash";

import AdminRepo from "../../database/repository/AdminRepo";
import { SuccessResponse } from "../../core/ApiResponse";
import { RoleCode } from "../../database/model/Role";

export const getAdmin = asyncHandler(async (req: ProtectedRequest, res) => {
  const userId = new Types.ObjectId(req.params.id);
  const user = await AdminRepo.findByObj({
    _id: userId,
    status: true,
    deletedAt: null,
  });
  if (
    req.user.roles[0].code !== RoleCode.SUPERADMIN &&
    user?.roles[0]?.code === RoleCode.SUPERADMIN
  )
    throw new BadRequestError("Super Admin cant be fetched");
  if (!user) throw new BadRequestError("Admin not registered or deleted");
  return new SuccessResponse("success", user).send(res);
});
