import asyncHandler from "../../helpers/asyncHandler";
import { ProtectedRequest } from "app-request";
import { BadRequestError } from "../../core/ApiError";
import { Types } from "mongoose";
import _ from "lodash";

import AdminRepo from "../../database/repository/AdminRepo";
import { SuccessResponse } from "../../core/ApiResponse";
import Admin from "../../database/model/Admin";
import { RoleCode } from "../../database/model/Role";

export const updateAdmin = asyncHandler(async (req: ProtectedRequest, res) => {
  const userId = new Types.ObjectId(req.params.id);

  const user = await AdminRepo.findByObj({
    _id: userId,
    status: true,
    deletedAt: null,
  });
  if (!user) throw new BadRequestError("Admin not registered or deleted");
  if (user._id.toString() !== req.user._id.toString()) {
    if (req.user.roles[0].code === RoleCode.ADMIN) {
      throw new BadRequestError("Admins can only update their own profile");
    }
  }

  if (req.body.name) user.name = req.body.name;
  if (req.body.roles) user.roles = req.body.roles;
  if (req.body.email) user.email = req.body.email;
  if (req.body.phoneNumber) user.phoneNumber = req.body.phoneNumber;
  if (req.body.lastname) user.lastname = req.body.lastname;

  const profilePicUrl = (req.files as any)?.profilePicUrl
    ? (req.files as any).profilePicUrl[0].path
    : "";

  if (profilePicUrl) user.profilePicUrl = profilePicUrl;

  const { updatedAt, createdAt, status, roles, ...userToUpdate } = user;

  await AdminRepo.updateInfo(userToUpdate as Admin);
  return new SuccessResponse("Profile updated", user).send(res);
});
