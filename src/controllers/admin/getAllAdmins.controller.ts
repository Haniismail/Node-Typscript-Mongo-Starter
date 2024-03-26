import asyncHandler from "../../helpers/asyncHandler";
import { ProtectedRequest } from "app-request";
import _ from "lodash";
import {
  SuccessResponse,
  SuccessResponsePaginate,
} from "../../core/ApiResponse";
import AdminRepo from "../../database/repository/AdminRepo";

export const getAllAdmins = asyncHandler(async (req: ProtectedRequest, res) => {
  const { page, perPage, deleted } = req.query;
  const options = {
    page: parseInt(page as string, 10) || 1,
    limit: parseInt(perPage as string, 12) || 12,
  };

  const users = await AdminRepo.findAll(options, req.query, {
    isPaging: true,
    deleted: deleted == "true" ? true : false,
  });
  const { docs, ...meta } = users;

  const filteredDocs =  users.docs.filter((el: any) => el.token);
  new SuccessResponsePaginate(
    "All admins returned successfuly",
    filteredDocs,
    meta
  ).send(res);
});
