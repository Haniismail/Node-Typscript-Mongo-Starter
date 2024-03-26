import asyncHandler from "../../helpers/asyncHandler";
import { ProtectedRequest } from "app-request";

import { SuccessResponse } from "../../core/ApiResponse";
import AdminRepo from "../../database/repository/AdminRepo";

const countAllAdmins = asyncHandler(async (req: ProtectedRequest, res) => {
  const count = await AdminRepo.countAll();
  return new SuccessResponse("success", {
    admins: count - 1,
  }).send(res);
});

export default countAllAdmins;
